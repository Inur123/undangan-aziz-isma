import { useHttp } from '@inertiajs/react';
import {
    type FormEvent,
    type MouseEvent,
    type TouchEvent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { store as storeRsvp } from '@/routes/api/rsvp';
import {
    type Attendance,
    type Wish,
    invitation,
    photos,
    weddingDate,
} from './invitation-data';
import { useInvitationMusic } from './use-invitation-music';

type CoverPhase = 'closed' | 'exiting' | 'open';
type WishForm = { name: string; attendance: Attendance | ''; message: string };
type RsvpResponse = { rsvp: Wish };

const sectionIds = [
    'beranda',
    'mempelai',
    'acara',
    'galeri',
    'ucapan',
] as const;

function getCountdown() {
    const seconds = Math.max(
        0,
        Math.floor((weddingDate.getTime() - Date.now()) / 1000),
    );
    return {
        days: String(Math.floor(seconds / 86400)).padStart(2, '0'),
        hours: String(Math.floor(seconds / 3600) % 24).padStart(2, '0'),
        minutes: String(Math.floor(seconds / 60) % 60).padStart(2, '0'),
        seconds: String(seconds % 60).padStart(2, '0'),
        finished: seconds === 0,
    };
}

function calendarDate(value: string | Date): string {
    return new Date(value)
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '');
}

function escapeCalendar(value: string): string {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
}

function foldCalendarLine(line: string): string {
    const encoder = new TextEncoder();
    let folded = '';
    let width = 0;
    for (const character of line) {
        const bytes = encoder.encode(character).length;
        if (width + bytes > 75) {
            folded += '\r\n ';
            width = 1;
        }
        folded += character;
        width += bytes;
    }
    return folded;
}

export function useInvitation(
    guestName: string,
    initialWishes: Wish[],
    initialTotal: number,
) {
    const rootRef = useRef<HTMLDivElement>(null);
    const mainTitleRef = useRef<HTMLHeadingElement>(null);
    const openButtonRef = useRef<HTMLButtonElement>(null);
    const wishListRef = useRef<HTMLDivElement>(null);
    const wishDialogRef = useRef<HTMLDialogElement>(null);
    const photoDialogRef = useRef<HTMLDialogElement>(null);
    const wishTriggerRef = useRef<HTMLButtonElement | null>(null);
    const photoTriggerRef = useRef<HTMLButtonElement | null>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const coverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [coverPhase, setCoverPhase] = useState<CoverPhase>('closed');
    const [activeSection, setActiveSection] =
        useState<(typeof sectionIds)[number]>('beranda');
    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        finished: false,
    });
    const [wishes, setWishes] = useState(initialWishes);
    const [wishTotal, setWishTotal] = useState(initialTotal);
    const [wishListMaxHeight, setWishListMaxHeight] = useState<string>();
    const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
        null,
    );
    const [formStatus, setFormStatus] = useState('');
    const [toast, setToast] = useState('');
    const form = useHttp<WishForm, RsvpResponse>({
        name: guestName,
        attendance: '',
        message: '',
    });

    const showToast = useCallback((message: string) => {
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }
        setToast(message);
        toastTimerRef.current = setTimeout(() => setToast(''), 3500);
    }, []);
    const music = useInvitationMusic(showToast);

    useEffect(() => {
        form.setData('name', guestName);
    }, [guestName]);

    useEffect(() => {
        document.body.classList.toggle('cover-open', coverPhase === 'closed');
        return () => document.body.classList.remove('cover-open');
    }, [coverPhase]);

    useEffect(() => {
        setCountdown(getCountdown());
        const interval = setInterval(() => setCountdown(getCountdown()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const root = rootRef.current;
        if (!root || !('IntersectionObserver' in window)) {
            return;
        }
        document.documentElement.classList.add('js-ready');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.07 },
        );
        root.querySelectorAll('.reveal').forEach((element) =>
            observer.observe(element),
        );
        return () => {
            observer.disconnect();
            document.documentElement.classList.remove('js-ready');
        };
    }, []);

    useEffect(() => {
        if (coverPhase === 'closed') {
            return;
        }
        let frame = 0;
        const updateNav = () => {
            let active: (typeof sectionIds)[number] = sectionIds[0];
            sectionIds.forEach((id) => {
                const section = rootRef.current?.querySelector(`#${id}`);
                if (
                    section &&
                    section.getBoundingClientRect().top <
                        window.innerHeight * 0.48
                ) {
                    active = id;
                }
            });
            setActiveSection(active);
            frame = 0;
        };
        const onScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(updateNav);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frame);
        };
    }, [coverPhase]);

    useLayoutEffect(() => {
        const list = wishListRef.current;
        if (!list) {
            return;
        }
        let frame = 0;
        const measure = () => {
            const cards = Array.from(list.querySelectorAll('.wish'));
            const height = cards
                .slice(0, 3)
                .reduce(
                    (total, card) =>
                        total + card.getBoundingClientRect().height,
                    0,
                );
            setWishListMaxHeight(
                cards.length ? `${Math.ceil(height + 1)}px` : undefined,
            );
        };
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(measure);
        };
        schedule();
        const observer =
            'ResizeObserver' in window ? new ResizeObserver(schedule) : null;
        observer?.observe(list);
        window.addEventListener('resize', schedule, { passive: true });
        void document.fonts.ready.then(schedule);
        return () => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
            window.removeEventListener('resize', schedule);
        };
    }, [wishes]);

    useEffect(() => {
        if (
            selectedWish &&
            wishDialogRef.current &&
            !wishDialogRef.current.open
        ) {
            wishDialogRef.current.showModal();
            document.body.classList.add('wish-open');
            wishDialogRef.current.scrollTop = 0;
        }
    }, [selectedWish]);

    useEffect(() => {
        if (
            selectedPhotoIndex !== null &&
            photoDialogRef.current &&
            !photoDialogRef.current.open
        ) {
            photoDialogRef.current.showModal();
            document.body.classList.add('gallery-open');
        }
    }, [selectedPhotoIndex]);

    useEffect(
        () => () => {
            if (coverTimerRef.current) clearTimeout(coverTimerRef.current);
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
            document.body.classList.remove(
                'cover-open',
                'wish-open',
                'gallery-open',
            );
        },
        [],
    );

    const openInvitation = () => {
        if (coverPhase !== 'closed') return;
        setCoverPhase('exiting');
        window.scrollTo({ top: 0, behavior: 'instant' });
        void music.start();
        requestAnimationFrame(() =>
            mainTitleRef.current?.focus({ preventScroll: true }),
        );
        const duration = matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 0
            : 850;
        coverTimerRef.current = setTimeout(
            () => setCoverPhase('open'),
            duration,
        );
    };

    const backToCover = () => {
        if (coverTimerRef.current) clearTimeout(coverTimerRef.current);
        music.stop();
        setCoverPhase('closed');
        setActiveSection('beranda');
        window.scrollTo({ top: 0, behavior: 'instant' });
        requestAnimationFrame(() =>
            openButtonRef.current?.focus({ preventScroll: true }),
        );
    };

    const saveDate = () => {
        const lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Undangan Jawa//ID',
            'CALSCALE:GREGORIAN',
            'BEGIN:VEVENT',
            `UID:${weddingDate.getTime()}@undangan.local`,
            `DTSTAMP:${calendarDate(new Date())}`,
            `DTSTART:${calendarDate(invitation.date)}`,
            `DTEND:${calendarDate(invitation.end)}`,
            `SUMMARY:${escapeCalendar(`Pernikahan ${invitation.bride.short} & ${invitation.groom.short}`)}`,
            `LOCATION:${escapeCalendar(`${invitation.venue}, ${invitation.address}`)}`,
            `DESCRIPTION:${escapeCalendar(`Akad: ${invitation.akadTime}. Resepsi: ${invitation.receptionTime}. Kami menantikan kehadiran Anda.`)}`,
            'END:VEVENT',
            'END:VCALENDAR',
            '',
        ];
        const url = URL.createObjectURL(
            new Blob([lines.map(foldCalendarLine).join('\r\n')], {
                type: 'text/calendar;charset=utf-8',
            }),
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = 'pernikahan-sekar-bima.ics';
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        showToast('Buka file kalender yang diunduh untuk menyimpan tanggal.');
    };

    const submitWish = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.processing) return;
        const name = form.data.name.trim();
        const message = form.data.message.trim();
        if (!name || !message || !form.data.attendance) {
            showToast('Lengkapi nama, kehadiran, dan ucapan Anda.');
            return;
        }
        form.transform((data) => ({ ...data, name, message }));
        void form.post(storeRsvp.url(), {
            onSuccess: ({ rsvp }) => {
                setWishes((current) => [rsvp, ...current].slice(0, 100));
                setWishTotal((current) => current + 1);
                form.setData('message', '');
                setFormStatus('Terima kasih. Ucapan Anda telah tersimpan.');
                wishListRef.current?.scrollTo({ top: 0 });
                showToast('Ucapan berhasil tersimpan!');
            },
            onError: (errors) => {
                const message = Object.values(errors)[0];
                setFormStatus(
                    typeof message === 'string'
                        ? message
                        : 'Gagal menyimpan ucapan. Coba lagi.',
                );
                showToast('Gagal menyimpan ucapan. Coba lagi.');
            },
            onHttpException: (response) => {
                const message =
                    response.status === 429
                        ? 'Terlalu banyak ucapan. Coba lagi sebentar.'
                        : response.status === 419
                          ? 'Sesi berakhir. Muat ulang halaman lalu coba lagi.'
                          : 'Gagal menyimpan ucapan. Coba lagi.';
                setFormStatus(message);
                showToast(message);
                return false;
            },
            onNetworkError: () => {
                setFormStatus('Tidak dapat terhubung ke server.');
                showToast('Tidak dapat terhubung ke server.');
                return false;
            },
        });
    };

    const openWish = (wish: Wish, trigger: HTMLButtonElement) => {
        wishTriggerRef.current = trigger;
        setSelectedWish(wish);
    };
    const closeWish = () => wishDialogRef.current?.close();
    const onWishClose = () => {
        document.body.classList.remove('wish-open');
        setSelectedWish(null);
        wishTriggerRef.current?.focus({ preventScroll: true });
    };

    const openPhoto = (index: number, trigger: HTMLButtonElement) => {
        photoTriggerRef.current = trigger;
        setSelectedPhotoIndex(index);
    };
    const closePhoto = () => photoDialogRef.current?.close();
    const onPhotoClose = () => {
        document.body.classList.remove('gallery-open');
        setSelectedPhotoIndex(null);
        photoTriggerRef.current?.focus({ preventScroll: true });
        touchStartRef.current = null;
    };
    const shiftPhoto = (direction: number) =>
        setSelectedPhotoIndex((current) =>
            current === null
                ? null
                : (current + direction + photos.length) % photos.length,
        );
    const onPhotoKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            shiftPhoto(event.key === 'ArrowRight' ? 1 : -1);
        }
    };
    const onPhotoBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
        )
            closePhoto();
    };
    const onPhotoTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        touchStartRef.current =
            event.touches.length === 1
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                : null;
    };
    const onPhotoTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
        const start = touchStartRef.current;
        if (!start || !event.changedTouches.length) return;
        const deltaX = event.changedTouches[0].clientX - start.x;
        const deltaY = event.changedTouches[0].clientY - start.y;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5)
            shiftPhoto(deltaX < 0 ? 1 : -1);
        touchStartRef.current = null;
    };

    const copyGift = async (index: number) => {
        const account = invitation.gifts[index];
        const number = account.number.replace(/\D/g, '');
        if (!number) {
            showToast('Nomor rekening belum diisi.');
            return;
        }
        try {
            await navigator.clipboard.writeText(number);
            showToast(`Nomor rekening ${account.bank} berhasil disalin.`);
        } catch {
            const focused = document.activeElement as HTMLElement | null;
            const input = document.createElement('textarea');
            input.value = number;
            input.readOnly = true;
            input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
            document.body.append(input);
            input.select();
            let copied = false;
            try {
                copied = document.execCommand('copy');
            } catch {
                copied = false;
            } finally {
                input.remove();
                focused?.focus({ preventScroll: true });
            }
            showToast(
                copied
                    ? `Nomor rekening ${account.bank} berhasil disalin.`
                    : 'Belum bisa menyalin. Tekan lama nomor rekening untuk menyalinnya.',
            );
        }
    };

    return {
        rootRef,
        mainTitleRef,
        openButtonRef,
        wishListRef,
        wishDialogRef,
        photoDialogRef,
        coverPhase,
        activeSection,
        countdown,
        wishes,
        wishTotal,
        wishListMaxHeight,
        selectedWish,
        selectedPhotoIndex,
        formStatus,
        toast,
        form,
        music,
        openInvitation,
        backToCover,
        saveDate,
        submitWish,
        openWish,
        closeWish,
        onWishClose,
        openPhoto,
        closePhoto,
        onPhotoClose,
        shiftPhoto,
        onPhotoKeyDown,
        onPhotoBackdropClick,
        onPhotoTouchStart,
        onPhotoTouchEnd,
        copyGift,
    };
}
