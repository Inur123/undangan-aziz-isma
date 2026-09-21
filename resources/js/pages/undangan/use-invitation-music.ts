import { useCallback, useEffect, useRef, useState } from 'react';

const melody = [0, 2, 4, 2, 1, 0, 3, 2, 0, 1, 2, 4, 3, 2, 1, 0];
const frequencies = [261.63, 293.66, 329.63, 392, 440];

interface MusicEngine {
    context: AudioContext;
    master: GainNode;
    timer: ReturnType<typeof setInterval> | null;
    generation: number;
    nextNote: number;
    noteIndex: number;
}

export function useInvitationMusic(onError: (message: string) => void) {
    const engine = useRef<MusicEngine | null>(null);
    const [playing, setPlaying] = useState(false);
    const [starting, setStarting] = useState(false);
    const playingRef = useRef(false);
    const startingRef = useRef(false);

    const stop = useCallback(() => {
        const current = engine.current;
        if (current) {
            current.generation += 1;
            if (current.timer) {
                clearInterval(current.timer);
                current.timer = null;
            }
            current.master.gain.cancelScheduledValues(
                current.context.currentTime,
            );
            current.master.gain.setValueAtTime(
                current.master.gain.value,
                current.context.currentTime,
            );
            current.master.gain.linearRampToValueAtTime(
                0,
                current.context.currentTime + 0.12,
            );
        }
        playingRef.current = false;
        startingRef.current = false;
        setPlaying(false);
        setStarting(false);
    }, []);

    const start = useCallback(async () => {
        if (startingRef.current || playingRef.current) {
            return;
        }
        startingRef.current = true;
        setStarting(true);

        try {
            if (!engine.current) {
                const AudioEngine =
                    window.AudioContext ||
                    (
                        window as Window & {
                            webkitAudioContext?: typeof AudioContext;
                        }
                    ).webkitAudioContext;
                if (!AudioEngine) {
                    onError('Browser ini belum mendukung musik instrumental.');
                    return;
                }
                const context = new AudioEngine();
                const master = context.createGain();
                master.gain.value = 0;
                master.connect(context.destination);
                engine.current = {
                    context,
                    master,
                    timer: null,
                    generation: 0,
                    nextNote: 0,
                    noteIndex: 0,
                };
            }

            const current = engine.current;
            const generation = ++current.generation;
            await current.context.resume();
            if (generation !== current.generation || document.hidden) {
                return;
            }

            current.master.gain.cancelScheduledValues(
                current.context.currentTime,
            );
            current.master.gain.setValueAtTime(0, current.context.currentTime);
            current.master.gain.linearRampToValueAtTime(
                0.27,
                current.context.currentTime + 0.3,
            );
            current.nextNote = current.context.currentTime + 0.1;
            current.noteIndex = 0;

            const chime = (frequency: number, time: number, volume: number) => {
                [1, 2.01, 3.96].forEach((harmonic, index) => {
                    const oscillator = current.context.createOscillator();
                    const gain = current.context.createGain();
                    oscillator.type = 'sine';
                    oscillator.frequency.value = frequency * harmonic;
                    gain.gain.setValueAtTime(0, time);
                    gain.gain.linearRampToValueAtTime(
                        volume / (index * 3 + 1),
                        time + 0.015,
                    );
                    gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.5);
                    oscillator.connect(gain);
                    gain.connect(current.master);
                    oscillator.start(time);
                    oscillator.stop(time + 2.6);
                    oscillator.onended = () => {
                        oscillator.disconnect();
                        gain.disconnect();
                    };
                });
            };

            const schedule = () => {
                while (current.nextNote < current.context.currentTime + 0.5) {
                    chime(
                        frequencies[melody[current.noteIndex % melody.length]],
                        current.nextNote,
                        0.22,
                    );
                    if (current.noteIndex % 4 === 0) {
                        chime(130.81, current.nextNote, 0.15);
                    }
                    current.nextNote += 0.68;
                    current.noteIndex += 1;
                }
            };

            schedule();
            current.timer = setInterval(schedule, 200);
            playingRef.current = true;
            setPlaying(true);
        } catch {
            stop();
            onError('Musik belum bisa diputar di browser ini.');
        } finally {
            startingRef.current = false;
            setStarting(false);
        }
    }, [onError, stop]);

    useEffect(() => {
        const stopWhenHidden = () => {
            if (document.hidden) {
                stop();
            }
        };
        document.addEventListener('visibilitychange', stopWhenHidden);
        window.addEventListener('pagehide', stop);
        return () => {
            document.removeEventListener('visibilitychange', stopWhenHidden);
            window.removeEventListener('pagehide', stop);
            const current = engine.current;
            if (current) {
                current.generation += 1;
                if (current.timer) {
                    clearInterval(current.timer);
                }
                void current.context.close();
                engine.current = null;
            }
        };
    }, [stop]);

    return {
        playing,
        starting,
        start,
        stop,
        toggle: playing ? stop : start,
    };
}
