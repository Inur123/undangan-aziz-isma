import {
    type ReactNode,
    type SyntheticEvent,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import {
    attendanceLabels,
    formatAccountNumber,
    formatWeddingDate,
    invitation,
    photos,
    type Wish,
} from './invitation-data';
import { InvitationCover } from './invitation-cover';
import type { useInvitation } from './use-invitation';

function useJpegFallback(event: SyntheticEvent<HTMLImageElement>): void {
    const image = event.currentTarget;
    const source = image.getAttribute('src');

    if (source?.endsWith('.webp')) {
        image.src = `${source.slice(0, -5)}.jpg`;
    }
}

function WishCard({ wish }: { wish: Wish }) {
    const messageId = useId();
    const messageRef = useRef<HTMLParagraphElement>(null);
    const [showMore, setShowMore] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useLayoutEffect(() => {
        const message = messageRef.current;
        if (!message) return;
        const measure = () => {
            if (!isExpanded) {
                setShowMore(message.scrollHeight > message.clientHeight + 1);
            }
        };
        measure();
        const observer =
            'ResizeObserver' in window ? new ResizeObserver(measure) : null;
        observer?.observe(message);
        window.addEventListener('resize', measure, { passive: true });
        void document.fonts.ready.then(measure);
        return () => {
            observer?.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [isExpanded, wish.message]);

    return (
        <article className="wish">
            <div className="wish-head">
                <span className="wish-avatar" aria-hidden="true">
                    {Array.from(wish.name)[0]?.toUpperCase() || 'T'}
                </span>
                <div className="wish-name">
                    <span className="wish-author" title={wish.name}>
                        {wish.name}
                    </span>
                    <span className="wish-badge">
                        {attendanceLabels[wish.attendance]}
                    </span>
                </div>
            </div>
            <p
                className={`wish-message${isExpanded ? ' is-expanded' : ''}`}
                id={messageId}
                ref={messageRef}
            >
                {wish.message}
            </p>
            <button
                className="wish-more"
                type="button"
                hidden={!showMore}
                aria-label={
                    isExpanded
                        ? `Tutup ucapan lengkap dari ${wish.name}`
                        : `Baca ucapan lengkap dari ${wish.name}`
                }
                aria-expanded={isExpanded}
                aria-controls={messageId}
                onClick={() => setIsExpanded((expanded) => !expanded)}
            >
                {isExpanded ? 'Tutup' : 'Baca lengkap'}
            </button>
        </article>
    );
}

export function InvitationMarkup({
    guestName,
    model,
}: {
    guestName: string;
    model: ReturnType<typeof useInvitation>;
}): ReactNode {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.mapsQuery)}`;
    const selectedPhoto =
        model.selectedPhotoIndex === null
            ? null
            : photos[model.selectedPhotoIndex];
    return (
        <>
            <svg
                className="symbols"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    <symbol
                        id="jawa-batik-strip"
                        viewBox="0 0 440 30"
                        fill="none"
                    >
                        <g
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M20 1  40 15 20 29 0 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="15"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 15 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="25"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 25 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="15"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 15 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="25"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 25 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M60 1  80 15 60 29 40 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="55"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 55 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="65"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 65 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="55"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 55 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="65"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 65 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M100 1  120 15 100 29 80 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="95"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 95 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="105"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 105 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="95"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 95 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="105"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 105 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M140 1  160 15 140 29 120 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="135"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 135 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="145"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 145 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="135"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 135 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="145"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 145 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M180 1  200 15 180 29 160 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="175"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 175 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="185"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 185 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="175"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 175 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="185"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 185 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M220 1  240 15 220 29 200 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="215"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 215 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="225"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 225 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="215"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 215 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="225"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 225 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M260 1  280 15 260 29 240 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="255"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 255 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="265"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 265 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="255"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 255 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="265"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 265 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M300 1  320 15 300 29 280 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="295"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 295 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="305"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 305 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="295"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 295 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="305"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 305 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M340 1  360 15 340 29 320 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="335"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 335 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="345"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 345 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="335"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 335 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="345"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 345 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M380 1  400 15 380 29 360 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="375"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 375 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="385"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 385 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="375"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 375 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="385"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 385 20)"
                                strokeWidth=".65"
                            />
                            <path
                                d="M420 1  440 15 420 29 400 15Z"
                                strokeWidth=".5"
                                opacity=".4"
                            />
                            <ellipse
                                cx="415"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 415 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="425"
                                cy="10"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 425 10)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="415"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(45 415 20)"
                                strokeWidth=".65"
                            />
                            <ellipse
                                cx="425"
                                cy="20"
                                rx="2.7"
                                ry="5.4"
                                transform="rotate(-45 425 20)"
                                strokeWidth=".65"
                            />
                        </g>
                        <g fill="currentColor">
                            <circle cx="20" cy="15" r=".8" />
                            <circle cx="20" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="20" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="60" cy="15" r=".8" />
                            <circle cx="60" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="60" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="100" cy="15" r=".8" />
                            <circle cx="100" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="100" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="140" cy="15" r=".8" />
                            <circle cx="140" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="140" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="180" cy="15" r=".8" />
                            <circle cx="180" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="180" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="220" cy="15" r=".8" />
                            <circle cx="220" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="220" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="260" cy="15" r=".8" />
                            <circle cx="260" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="260" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="300" cy="15" r=".8" />
                            <circle cx="300" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="300" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="340" cy="15" r=".8" />
                            <circle cx="340" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="340" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="380" cy="15" r=".8" />
                            <circle cx="380" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="380" cy="27.5" r=".65" opacity=".6" />
                            <circle cx="420" cy="15" r=".8" />
                            <circle cx="420" cy="2.5" r=".65" opacity=".6" />
                            <circle cx="420" cy="27.5" r=".65" opacity=".6" />
                            <path d="M40 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M80 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M120 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M160 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M200 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M240 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M280 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M320 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M360 13l2 2-2 2-2-2Z" opacity=".65" />
                            <path d="M400 13l2 2-2 2-2-2Z" opacity=".65" />
                        </g>
                    </symbol>
                    <symbol
                        id="jawa-gift-corner"
                        viewBox="0 0 80 80"
                        fill="none"
                    >
                        <g
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M16 4H66C72 4 76 8 76 14V64"
                                strokeWidth=".7"
                                opacity=".6"
                            />
                            <path
                                d="M29 8H65C69 8 72 11 72 15V51"
                                strokeWidth=".45"
                                opacity=".4"
                            />
                            <path
                                d="M10 70C18 61 17 49 29 41C40 34 53 39 59 27C63 19 65 15 69 13"
                                strokeWidth="1"
                            />
                            <path
                                d="M17 59C23 47 31 44 39 43M39 36C53 35 57 32 60 24"
                                strokeWidth=".5"
                                opacity=".6"
                            />
                            <path
                                d="M21 49C12 44 9 36 13 31C15 39 26 34 28 42"
                                strokeWidth=".8"
                            />
                            <path
                                d="M21 49C14 43 14 39 14 37"
                                strokeWidth=".45"
                            />
                            <path
                                d="M26 44C32 48 44 47 42 57C49 51 45 42 38 40"
                                strokeWidth=".8"
                            />
                            <path
                                d="M28 44C36 45 39 48 39 51"
                                strokeWidth=".45"
                            />
                            <path
                                d="M42 36C33 33 28 26 33 21C39 16 45 23 41 26C39 28 37 26 38 25"
                                strokeWidth=".8"
                            />
                            <path
                                d="M42 36C46 32 40 30 36 28M45 34C45 29 50 23 47 17"
                                strokeWidth=".5"
                            />
                            <path
                                d="M57 31C62 35 67 31 66 25C64 30 60 25 59 27"
                                strokeWidth=".8"
                            />
                            <path
                                d="M61 24C54 21 54 15 57 12C56 18 64 17 61 24Z"
                                strokeWidth=".8"
                            />
                            <path
                                d="M13 65C22 67 31 62 28 57C29 63 20 58 16 62"
                                strokeWidth=".8"
                            />
                            <path
                                d="M17 58C9 57 6 52 8 48C10 53 16 51 19 55"
                                strokeWidth=".7"
                            />
                            <path
                                d="M69 13C69 10 67 9 65 9M69 13C72 13 72 15 71 17"
                                strokeWidth=".65"
                            />
                            <path d="M5 73l3-3m40-57 1-3" strokeWidth=".5" />
                        </g>
                        <g fill="currentColor" opacity=".75">
                            <circle cx="10" cy="70" r=".85" />
                            <circle cx="24" cy="25" r=".75" />
                            <circle cx="54" cy="45" r=".75" />
                            <circle cx="65" cy="41" r=".6" />
                        </g>
                    </symbol>
                    <symbol id="i-gift" viewBox="0 0 24 24">
                        <rect x="3" y="8" width="18" height="4" rx="1" />
                        <path d="M5 12v9h14v-9M12 8v13m0-13C4 8 5 2 8 3c3 0 4 5 4 5Zm0 0c8 0 7-6 4-5-3 0-4 5-4 5Z" />
                    </symbol>
                    <symbol id="i-copy" viewBox="0 0 24 24">
                        <rect x="8" y="8" width="12" height="13" rx="1" />
                        <path d="M16 8V3H4v13h4" />
                    </symbol>
                    <symbol id="jawa-sulur" viewBox="0 0 70 170" fill="none">
                        <g
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M35 158C43 148 46 136 40 125C34 115 23 109 24 95C25 82 41 77 44 64C47 51 34 40 34 24"
                                strokeWidth="1.25"
                            />
                            <path
                                d="M37 151C42 140 41 132 36 124M29 110C20 97 29 86 38 78M44 58C41 48 32 39 31 30"
                                strokeWidth=".65"
                                opacity=".55"
                            />

                            <path
                                d="M34 36C17 35 12 25 16 16C19 25 26 22 30 27C34 30 34 33 34 36Z"
                                strokeWidth="1"
                            />
                            <path
                                d="M34 36C23 34 20 29 20 25"
                                strokeWidth=".65"
                            />
                            <path
                                d="M38 45C43 38 57 39 55 29C61 34 58 48 48 51C44 52 42 51 41 50"
                                strokeWidth="1"
                            />
                            <path
                                d="M41 49C50 48 53 43 52 39"
                                strokeWidth=".65"
                            />
                            <path
                                d="M44 64C38 54 25 48 19 56C13 63 20 73 27 69C31 67 29 62 26 63"
                                strokeWidth="1"
                            />
                            <path
                                d="M43 64C36 66 31 54 23 57M42 69C29 78 13 74 13 63"
                                strokeWidth=".65"
                                opacity=".8"
                            />
                            <path
                                d="M37 79C46 72 59 80 55 91C52 84 45 91 40 88C36 87 35 83 37 79Z"
                                strokeWidth="1"
                            />
                            <path
                                d="M37 81C45 81 49 80 52 83"
                                strokeWidth=".65"
                            />
                            <path
                                d="M24 96C16 92 11 83 15 76C7 79 6 91 13 98C16 101 20 102 24 102"
                                strokeWidth="1"
                            />
                            <path
                                d="M23 100C16 97 13 92 13 87"
                                strokeWidth=".65"
                            />
                            <path
                                d="M27 108C35 99 49 98 51 108C53 117 41 121 38 114C36 110 40 107 43 110"
                                strokeWidth="1"
                            />
                            <path
                                d="M28 109C35 105 44 102 47 108M31 115C36 122 48 125 55 115"
                                strokeWidth=".65"
                                opacity=".8"
                            />
                            <path
                                d="M39 127C27 129 15 121 17 112C9 117 14 132 25 135C31 137 38 133 41 133"
                                strokeWidth="1"
                            />
                            <path
                                d="M39 131C29 135 21 129 20 125"
                                strokeWidth=".65"
                            />
                            <path
                                d="M42 143C53 143 59 135 57 128C64 137 58 150 45 150"
                                strokeWidth="1"
                            />
                            <path
                                d="M44 147C51 148 55 143 55 140"
                                strokeWidth=".65"
                            />

                            <path
                                d="M34 24C25 20 25 15 29 12C30 17 34 18 34 24ZM34 24C30 16 32 9 35 6C39 12 39 19 34 24ZM34 24C43 20 44 15 41 12C39 17 36 18 34 24Z"
                                strokeWidth=".95"
                            />
                            <path
                                d="M35 158C28 155 26 150 28 146C30 151 34 151 35 158ZM35 158C40 155 44 156 47 153C48 160 40 163 35 158ZM35 158L32 164"
                                strokeWidth=".9"
                            />
                        </g>
                        <g fill="currentColor" opacity=".8">
                            <circle cx="57" cy="62" r="1" />
                            <circle cx="10" cy="110" r="1" />
                            <circle cx="51" cy="23" r=".8" />
                        </g>
                    </symbol>
                    <symbol id="jawa-divider" viewBox="0 0 300 36" fill="none">
                        <g
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M8 16H93M8 20H78M207 16H292M222 20H292"
                                strokeWidth=".65"
                                opacity=".55"
                            />
                            <path
                                d="M79 20H110C120 20 128 18 135 18M165 18C172 18 180 20 190 20H221"
                                strokeWidth=".85"
                            />

                            <path
                                d="M112 20C107 14 102 11 98 14C96 18 104 21 112 20ZM112 20C118 13 125 11 128 14C131 18 125 20 121 18"
                                strokeWidth=".8"
                            />
                            <path
                                d="M188 20C193 14 198 11 202 14C204 18 196 21 188 20ZM188 20C182 13 175 11 172 14C169 18 175 20 179 18"
                                strokeWidth=".8"
                            />

                            <ellipse
                                cx="144.5"
                                cy="12.5"
                                rx="3.9"
                                ry="6.8"
                                transform="rotate(-45 144.5 12.5)"
                                strokeWidth=".9"
                            />
                            <ellipse
                                cx="155.5"
                                cy="12.5"
                                rx="3.9"
                                ry="6.8"
                                transform="rotate(45 155.5 12.5)"
                                strokeWidth=".9"
                            />
                            <ellipse
                                cx="144.5"
                                cy="23.5"
                                rx="3.9"
                                ry="6.8"
                                transform="rotate(45 144.5 23.5)"
                                strokeWidth=".9"
                            />
                            <ellipse
                                cx="155.5"
                                cy="23.5"
                                rx="3.9"
                                ry="6.8"
                                transform="rotate(-45 155.5 23.5)"
                                strokeWidth=".9"
                            />
                            <path d="M150 2V4M150 32V34" strokeWidth=".7" />
                        </g>
                        <g fill="currentColor">
                            <circle cx="150" cy="18" r="1.25" />
                            <circle cx="144.5" cy="12.5" r=".7" />
                            <circle cx="155.5" cy="12.5" r=".7" />
                            <circle cx="144.5" cy="23.5" r=".7" />
                            <circle cx="155.5" cy="23.5" r=".7" />
                            <circle cx="88" cy="25" r=".7" opacity=".7" />
                            <circle cx="212" cy="25" r=".7" opacity=".7" />
                        </g>
                    </symbol>
                    <symbol id="i-gallery" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="16" rx="1" />
                        <circle cx="8" cy="9" r="1.5" />
                        <path d="m3 17 5-5 4 4 4-6 5 7" />
                    </symbol>
                    <symbol id="i-zoom" viewBox="0 0 24 24">
                        <circle cx="10" cy="10" r="6" />
                        <path d="m15 15 5 5M10 7v6m-3-3h6" />
                    </symbol>
                    <symbol id="i-close" viewBox="0 0 24 24">
                        <path d="m6 6 12 12M6 18 18 6" />
                    </symbol>
                    <symbol id="i-chevron" viewBox="0 0 24 24">
                        <path d="m9 5 7 7-7 7" />
                    </symbol>
                    <symbol id="i-envelope" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="1" />
                        <path d="m3 6 9 7 9-7m-18 13 6-7m12 7-6-7" />
                    </symbol>
                    <symbol id="i-arrow" viewBox="0 0 24 24">
                        <path d="M12 4v16m-6-6 6 6 6-6" />
                    </symbol>
                    <symbol id="i-calendar" viewBox="0 0 24 24">
                        <rect x="4" y="5" width="16" height="16" rx="1" />
                        <path d="M8 3v4m8-4v4M4 10h16m-11 4h2m3 0h2m-7 3h2" />
                    </symbol>
                    <symbol id="i-location" viewBox="0 0 24 24">
                        <path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1 1 14 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                    </symbol>
                    <symbol id="i-home" viewBox="0 0 24 24">
                        <path d="m3 10 9-7 9 7M5 9v12h14V9m-10 12v-7h6v7" />
                    </symbol>
                    <symbol id="i-heart" viewBox="0 0 24 24">
                        <path d="M20 5c-3-3-7-1-8 2-1-3-5-5-8-2-4 4 1 10 8 15 7-5 12-11 8-15Z" />
                    </symbol>
                    <symbol id="i-message" viewBox="0 0 24 24">
                        <path d="M4 4h16v13H9l-5 4V4Z" />
                        <path d="M8 8h8m-8 4h5" />
                    </symbol>
                    <symbol id="i-music" viewBox="0 0 24 24">
                        <path d="M9 17V5l11-2v12M9 8l11-2" />
                        <ellipse cx="6" cy="18" rx="3" ry="2.5" />
                        <ellipse cx="17" cy="16" rx="3" ry="2.5" />
                    </symbol>
                    <symbol id="i-rings" viewBox="0 0 32 32">
                        <circle cx="12" cy="18" r="8" />
                        <circle cx="21" cy="18" r="8" />
                        <path d="m17 7 3-4 3 4-3 3-3-3Zm-10 0 3-4 3 4-3 3-3-3Z" />
                    </symbol>
                    <symbol id="i-flower" viewBox="0 0 32 32">
                        <path d="M16 25V14m0 7c-8 0-11-5-11-8 5-1 9 1 11 5m0 1c8 0 11-5 11-8-5-1-9 1-11 5M16 3c-7 6-7 10 0 12 7-2 7-6 0-12Z" />
                        <path d="M10 27h12" />
                    </symbol>
                    <symbol id="pendopo" viewBox="0 0 440 360" fill="none">
                        <defs>
                            <linearGradient
                                id="roof"
                                x1="220"
                                y1="100"
                                x2="220"
                                y2="250"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#a28b55" stopOpacity=".15" />
                                <stop
                                    offset="1"
                                    stopColor="#493d2c"
                                    stopOpacity=".11"
                                />
                            </linearGradient>
                            <linearGradient
                                id="stone"
                                x1="0"
                                y1="260"
                                x2="0"
                                y2="320"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#a28b55" stopOpacity=".16" />
                                <stop
                                    offset="1"
                                    stopColor="#a28b55"
                                    stopOpacity=".03"
                                />
                            </linearGradient>
                            <g id="leaf">
                                <path
                                    d="M0 0C-12-4-13-16-8-23C2-21 7-12 0 0Z"
                                    fill="#747660"
                                    fillOpacity=".64"
                                />
                                <path
                                    d="M0 0-7-20"
                                    stroke="#493d2c"
                                    strokeWidth=".55"
                                    strokeOpacity=".6"
                                />
                            </g>
                            <g id="smallleaf">
                                <path
                                    d="M0 0C-7-2-9-10-5-15C2-14 5-7 0 0Z"
                                    fill="#747660"
                                    fillOpacity=".6"
                                />
                                <path
                                    d="M0 0-4-12"
                                    stroke="#493d2c"
                                    strokeWidth=".45"
                                    strokeOpacity=".5"
                                />
                            </g>
                            <g id="flower">
                                <path
                                    d="M0 0C-11-3-10-12-5-12C-1-12 0-5 0 0C-3-11 3-17 7-12C10-8 4-3 0 0C8-10 16-6 13-1C11 3 4 2 0 0C11 2 12 9 7 10C2 10 1 4 0 0C2 11-5 14-8 9C-10 5-4 2 0 0Z"
                                    fill="#a28b55"
                                    fillOpacity=".2"
                                    stroke="#a28b55"
                                    strokeWidth=".65"
                                />
                                <circle r="1.5" fill="#a28b55" />
                            </g>
                            <g id="finial">
                                <path
                                    d="M0 0C-2-4-2-7 0-10C2-7 2-4 0 0M0 0C-6-4-8-9-6-12C-2-9-1-4 0 0M0 0C6-4 8-9 6-12C2-9 1-4 0 0"
                                    stroke="#a28b55"
                                    strokeWidth=".8"
                                    strokeLinecap="round"
                                />
                            </g>
                        </defs>

                        <g
                            stroke="#a28b55"
                            strokeWidth=".7"
                            strokeOpacity=".45"
                        >
                            <path d="M10 311C77 302 113 313 148 308M292 308C343 313 372 301 430 312M36 320C99 313 120 319 142 318M302 318C329 315 375 316 405 321" />
                            <path d="M52 329C88 327 108 333 128 328M313 329C346 329 363 326 391 330" />
                        </g>

                        <g
                            stroke="#747660"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M68 304C60 279 60 251 56 224C52 196 40 174 38 145C38 123 46 100 54 81"
                                strokeWidth="2.2"
                            />
                            <path
                                d="M67 301C57 273 60 247 57 221C54 195 45 172 42 148"
                                strokeWidth=".7"
                            />
                            <path
                                d="M56 224C35 209 23 189 21 170M52 199C69 185 79 164 80 143M44 174C28 161 19 142 16 124M42 148C55 134 65 120 65 101M45 119C34 107 34 90 36 78M57 273C38 261 24 246 19 229M59 251C77 237 88 219 88 203"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M20 229C22 221 21 214 17 205M28 243C38 235 42 226 40 218M37 260C30 263 20 260 14 255M80 143C74 133 77 118 83 108M75 163C88 157 95 146 96 133M65 101C60 92 61 79 68 71M21 170C9 162 8 150 10 139M16 124C11 114 12 103 17 97M88 203C82 194 84 182 92 174"
                                strokeWidth=".7"
                            />
                        </g>

                        <use
                            href="#leaf"
                            transform="translate(54 83) rotate(18) scale(1)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(51 89) rotate(-46) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(37 84) rotate(8) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(35 101) rotate(-72) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(44 111) rotate(61) scale(0.82)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(66 106) rotate(29) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(65 97) rotate(-24) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(66 83) rotate(49) scale(0.7)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(81 141) rotate(50) scale(1)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(83 125) rotate(-8) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(80 119) rotate(72) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(96 137) rotate(36) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(88 153) rotate(71) scale(0.78)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(72 172) rotate(-15) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(66 184) rotate(51) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(42 164) rotate(-65) scale(0.87)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(30 157) rotate(-46) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(19 133) rotate(5) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(16 119) rotate(-48) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(16 107) rotate(59) scale(0.7)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(21 175) rotate(-57) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(15 162) rotate(-30) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(10 147) rotate(28) scale(0.7)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(34 202) rotate(-48) scale(1)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(27 191) rotate(39) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(56 217) rotate(73) scale(1)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(42 219) rotate(20) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(37 234) rotate(68) scale(0.88)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(23 233) rotate(-50) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(17 215) rotate(-10) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(22 250) rotate(-69) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(42 265) rotate(75) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(58 246) rotate(58) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(77 226) rotate(57) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(88 207) rotate(46) scale(0.95)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(88 193) rotate(27) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(91 185) rotate(66) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(58 266) rotate(-28) scale(0.84)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(64 287) rotate(85) scale(0.9)"
                        />

                        <g
                            stroke="#747660"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M374 306C381 279 373 253 379 226C386 193 404 165 399 137C394 112 378 93 377 72"
                                strokeWidth="2"
                            />
                            <path
                                d="M373 304C377 275 372 251 376 231C382 203 396 184 397 159"
                                strokeWidth=".7"
                            />
                            <path
                                d="M378 253C357 237 350 215 350 195M377 275C396 267 411 253 415 236M385 207C413 192 425 171 425 151M397 171C380 157 372 139 370 118M399 142C416 126 421 105 417 88M388 109C373 109 359 96 354 81M399 184C405 176 407 165 405 154M371 124C358 120 350 108 349 99"
                                strokeWidth="1"
                            />
                            <path
                                d="M350 195C344 187 344 176 350 166M357 226C343 223 334 214 331 203M415 236C421 229 421 218 419 209M408 251C400 242 399 233 402 224M425 151C431 143 432 131 428 121M417 101C411 96 409 86 412 77M370 145C357 141 350 135 347 123"
                                strokeWidth=".7"
                            />
                        </g>

                        <use
                            href="#leaf"
                            transform="translate(378 78) rotate(11) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(381 94) rotate(-66) scale(0.82)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(387 105) rotate(25) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(366 104) rotate(-50) scale(0.78)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(355 88) rotate(-17) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(417 93) rotate(53) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(418 111) rotate(63) scale(0.88)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(412 83) rotate(19) scale(0.74)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(401 136) rotate(80) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(370 124) rotate(5) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(362 139) rotate(-39) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(350 128) rotate(-27) scale(0.7)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(350 107) rotate(12) scale(0.75)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(385 164) rotate(-36) scale(0.95)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(396 186) rotate(-24) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(406 159) rotate(31) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(416 174) rotate(74) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(426 154) rotate(38) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(431 135) rotate(16) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(423 175) rotate(64) scale(0.75)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(391 205) rotate(53) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(354 217) rotate(-31) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(350 203) rotate(26) scale(0.95)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(349 180) rotate(3) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(337 214) rotate(-30) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(373 242) rotate(-25) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(415 241) rotate(36) scale(0.9)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(419 222) rotate(47) scale(0.85)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(404 232) rotate(20) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(397 263) rotate(73) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(375 275) rotate(-48) scale(0.8)"
                        />
                        <use
                            href="#leaf"
                            transform="translate(380 291) rotate(54) scale(0.8)"
                        />

                        <g
                            stroke="#747660"
                            strokeWidth=".7"
                            strokeLinecap="round"
                        >
                            <path d="M81 305C88 290 87 275 82 264M81 305C79 292 70 283 67 280M88 303C94 291 105 284 114 282M356 306C351 290 351 280 359 266M356 306C364 291 371 290 375 284M349 305C345 291 335 286 328 285M39 305C43 297 41 288 35 282M403 307C397 297 399 285 405 280" />
                        </g>
                        <use
                            href="#flower"
                            transform="translate(82 261) scale(.7)"
                        />
                        <use
                            href="#flower"
                            transform="translate(113 279) scale(.6)"
                        />
                        <use
                            href="#flower"
                            transform="translate(359 264) scale(.72) rotate(20)"
                        />
                        <use
                            href="#flower"
                            transform="translate(327 282) scale(.56) rotate(15)"
                        />

                        <use
                            href="#smallleaf"
                            transform="translate(82 285) rotate(-43)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(87 289) rotate(75)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(73 289) rotate(-65)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(97 293) rotate(72)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(357 289) rotate(38)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(351 292) rotate(-45)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(367 296) rotate(72)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(344 297) rotate(-44)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(38 299) rotate(50)"
                        />
                        <use
                            href="#smallleaf"
                            transform="translate(401 299) rotate(-30)"
                        />

                        <path
                            d="M97 228C121 216 143 204 163 190C181 174 199 146 210 121L220 111L230 121C241 146 259 174 277 190C297 204 319 216 343 228L341 237H99L97 228Z"
                            fill="url(#roof)"
                        />
                        <g
                            stroke="#493d2c"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        >
                            <path
                                d="M209 122L219 111H221L231 122M210 122C208 139 201 154 190 168H250C239 154 232 139 230 122Z"
                                strokeWidth="1.2"
                                fill="#e7dfc8"
                            />
                            <path
                                d="M215 123C214 140 211 154 207 166M220 122V165M225 123C226 140 229 154 233 166"
                                strokeWidth=".55"
                                opacity=".6"
                            />
                            <path
                                d="M188 166C195 170 207 171 220 171C233 171 245 170 252 166L256 172H184L188 166Z"
                                fill="#b29b6b"
                                fillOpacity=".55"
                                strokeWidth=".9"
                            />
                            <path
                                d="M187 173C178 185 166 196 151 204C130 216 111 224 95 228L96 233C123 233 150 232 173 231H267C290 232 317 233 344 233L345 228C329 224 310 216 289 204C274 196 262 185 253 173"
                                strokeWidth="1.35"
                            />
                            <path
                                d="M187 178C170 197 146 213 115 225M196 177C183 196 166 213 145 225M207 177C200 195 190 212 180 225M220 177V225M233 177C240 195 250 212 260 225M244 177C257 196 274 213 295 225M253 178C270 197 294 213 325 225"
                                strokeWidth=".62"
                                opacity=".65"
                            />

                            <g strokeWidth=".55" opacity=".57">
                                <path d="M182 181H258M175 188H265M166 196H274M154 204H286M140 212H300M123 220H317M99 228H341" />
                                <path d="M210 132H230M206 141H234M202 150H238M196 159H244" />
                            </g>

                            <path
                                d="M183.0 183l-0.33 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M190.4 183l-0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M197.8 183l-0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M205.2 183l-0.13 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M212.6 183l-0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M220.0 183l0.00 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M227.4 183l0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M234.8 183l0.13 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M242.2 183l0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M249.6 183l0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M257.0 183l0.33 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M175.0 191l-0.40 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M182.5 191l-0.34 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M190.0 191l-0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M197.5 191l-0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M205.0 191l-0.13 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M212.5 191l-0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M220.0 191l0.00 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M227.5 191l0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M235.0 191l0.13 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M242.5 191l0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M250.0 191l0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M257.5 191l0.34 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M265.0 191l0.40 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M165.0 199l-0.49 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M172.9 199l-0.42 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M180.7 199l-0.35 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M188.6 199l-0.28 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M196.4 199l-0.21 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M204.3 199l-0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M212.1 199l-0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M220.0 199l0.00 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M227.9 199l0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M235.7 199l0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M243.6 199l0.21 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M251.4 199l0.28 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M259.3 199l0.35 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M267.1 199l0.42 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M275.0 199l0.49 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M152.0 207l-0.61 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M159.6 207l-0.54 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M167.1 207l-0.48 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M174.7 207l-0.41 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M182.2 207l-0.34 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M189.8 207l-0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M197.3 207l-0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M204.9 207l-0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M212.4 207l-0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M220.0 207l0.00 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M227.6 207l0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M235.1 207l0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M242.7 207l0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M250.2 207l0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M257.8 207l0.34 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M265.3 207l0.41 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M272.9 207l0.48 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M280.4 207l0.54 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M288.0 207l0.61 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M137.0 215l-0.75 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M144.5 215l-0.68 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M152.1 215l-0.61 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M159.6 215l-0.54 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M167.2 215l-0.48 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M174.7 215l-0.41 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M182.3 215l-0.34 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M189.8 215l-0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M197.4 215l-0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M204.9 215l-0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M212.5 215l-0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M220.0 215l0.00 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M227.5 215l0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M235.1 215l0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M242.6 215l0.20 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M250.2 215l0.27 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M257.7 215l0.34 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M265.3 215l0.41 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M272.8 215l0.48 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M280.4 215l0.54 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M287.9 215l0.61 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M295.5 215l0.68 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M303.0 215l0.75 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M119.0 223l-0.91 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M126.8 223l-0.84 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M134.5 223l-0.77 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M142.3 223l-0.70 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M150.1 223l-0.63 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M157.8 223l-0.56 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M165.6 223l-0.49 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M173.4 223l-0.42 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M181.2 223l-0.35 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M188.9 223l-0.28 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M196.7 223l-0.21 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M204.5 223l-0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M212.2 223l-0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M220.0 223l0.00 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M227.8 223l0.07 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M235.5 223l0.14 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M243.3 223l0.21 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M251.1 223l0.28 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M258.8 223l0.35 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M266.6 223l0.42 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M274.4 223l0.49 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M282.2 223l0.56 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M289.9 223l0.63 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M297.7 223l0.70 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M305.5 223l0.77 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M313.2 223l0.84 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M321.0 223l0.91 3"
                                strokeWidth=".48"
                                opacity=".45"
                            />
                            <path
                                d="M96 235C134 235 155 233 175 233H265C285 233 306 235 344 235M101 239H339"
                                strokeWidth="1"
                            />
                            <path
                                d="M101 235L104 242H336L339 235"
                                strokeWidth=".75"
                            />

                            <path
                                d="M115 243H325V251H115Z"
                                fill="#a28b55"
                                fillOpacity=".17"
                                strokeWidth=".7"
                            />
                            <path
                                d="M119 251H127V291H119ZM163 251H171V291H163ZM269 251H277V291H269ZM313 251H321V291H313Z"
                                fill="#b29b6b"
                                fillOpacity=".23"
                                strokeWidth=".8"
                            />
                            <path
                                d="M122 254V287M166 254V287M272 254V287M316 254V287"
                                strokeWidth=".45"
                                opacity=".6"
                            />
                            <path
                                d="M116 287H130V293H116ZM160 287H174V293H160ZM266 287H280V293H266ZM310 287H324V293H310Z"
                                fill="#e5ddc7"
                                strokeWidth=".7"
                            />
                            <path
                                d="M127 251C127 258 132 260 138 260M163 251C163 258 158 260 152 260M171 251C171 258 176 260 182 260M269 251C269 258 264 260 258 260M277 251C277 258 282 260 288 260M313 251C313 258 308 260 302 260"
                                strokeWidth=".75"
                            />

                            <path
                                d="M182 258H258V290H182ZM185 261H255M200 261V289M240 261V289M212 267H228V289H212ZM212 267C212 259 228 259 228 267"
                                strokeWidth=".65"
                                opacity=".52"
                            />
                            <path
                                d="M130 277H160M280 277H310M130 280H160M280 280H310M136 280V290M145 280V290M154 280V290M286 280V290M295 280V290M304 280V290"
                                strokeWidth=".65"
                                opacity=".75"
                            />

                            <path
                                d="M106 293H334L344 299H96L106 293Z"
                                fill="url(#stone)"
                                strokeWidth=".8"
                            />
                            <path
                                d="M96 299H344V304H96Z"
                                fill="#a28b55"
                                fillOpacity=".13"
                                strokeWidth=".8"
                            />
                            <path
                                d="M179 304H261L269 310H171L179 304ZM171 310H269V314H171ZM163 319L171 314H269L277 319H163Z"
                                fill="#eee7d5"
                                strokeWidth=".7"
                            />
                            <path
                                d="M99 302H170M270 302H341M180 307H260M176 312H264M171 317H269"
                                strokeWidth=".45"
                                opacity=".45"
                            />
                        </g>
                        <use href="#finial" transform="translate(220 112)" />
                        <use
                            href="#finial"
                            transform="translate(97 228) rotate(-30) scale(.7)"
                        />
                        <use
                            href="#finial"
                            transform="translate(343 228) rotate(30) scale(.7)"
                        />

                        <g stroke="#a28b55" strokeWidth=".6">
                            <path d="M187 247H208M232 247H253M214 247C207 240 219 240 220 246C221 240 233 240 226 247C233 254 221 254 220 248C219 254 207 254 214 247Z" />
                            <circle cx="220" cy="247" r="1.3" fill="#a28b55" />
                        </g>

                        <g
                            stroke="#747660"
                            strokeWidth="1"
                            strokeLinecap="round"
                            opacity=".8"
                        >
                            <path d="M126 130C129 126 133 127 136 131C139 125 142 123 145 126M296 101C299 97 302 98 304 101C307 96 310 96 312 98M302 118C304 116 307 116 309 119C311 115 314 114 316 116" />
                        </g>
                        <g fill="#a28b55" opacity=".65">
                            <circle cx="127" cy="164" r="1" />
                            <circle cx="320" cy="143" r="1" />
                            <circle cx="156" cy="105" r=".7" />
                            <circle cx="282" cy="152" r=".7" />
                        </g>
                    </symbol>
                    <symbol id="gunungan" viewBox="0 0 100 132" fill="none">
                        <g
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M50 4C46 19 29 36 19 53C6 74 6 90 13 104C23 112 37 115 50 118C63 115 77 112 87 104C94 90 94 74 81 53C71 36 54 19 50 4Z"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M50 13C44 29 32 40 23 55C11 75 11 89 17 101C26 107 38 110 50 113C62 110 74 107 83 101C89 89 89 75 77 55C68 40 56 29 50 13Z"
                                strokeWidth=".55"
                            />
                            <path
                                d="M50 29V108M50 46C39 45 34 37 39 34C45 34 48 41 50 46C52 41 55 34 61 34C66 37 61 45 50 46ZM50 63C31 62 25 50 31 47C41 45 48 55 50 63C52 55 59 45 69 47C75 50 69 62 50 63Z"
                                strokeWidth=".7"
                            />
                            <path
                                d="M50 78C31 77 19 66 24 61C31 55 43 66 50 78C57 66 69 55 76 61C81 66 69 77 50 78Z"
                                strokeWidth=".7"
                            />
                            <path
                                d="M50 90C31 94 18 86 21 80C28 73 40 82 50 90C60 82 72 73 79 80C82 86 69 94 50 90Z"
                                strokeWidth=".7"
                            />
                            <path
                                d="M33 105V93L50 81L67 93V105M36 103V95L50 85L64 95V103M43 108V97C43 88 57 88 57 97V108"
                                strokeWidth=".9"
                            />
                            <path
                                d="M43 102H57M47 94V109M53 94V109M27 99C19 99 15 94 17 91M73 99C81 99 85 94 83 91M21 71C15 76 14 80 16 85M79 71C85 76 86 80 84 85"
                                strokeWidth=".6"
                            />
                            <path
                                d="M50 118V128M44 129H56M48 120H52"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M27 57L24 54M73 57L76 54M19 89L15 90M81 89L85 90M38 28L40 30M62 28L60 30"
                                strokeWidth=".6"
                            />
                        </g>
                        <g fill="currentColor">
                            <circle cx="50" cy="24" r="1.5" />
                            <circle cx="25" cy="76" r="1" />
                            <circle cx="75" cy="76" r="1" />
                            <circle cx="29" cy="99" r="1" />
                            <circle cx="71" cy="99" r="1" />
                        </g>
                    </symbol>
                </defs>
            </svg>

            <InvitationCover
                guestName={guestName}
                model={model}
                onImageError={useJpegFallback}
            />

            <main
                className={`page${model.coverPhase === 'open' ? ' is-open' : ''}`}
                id="invitation"
                hidden={model.coverPhase === 'closed'}
                inert={model.coverPhase !== 'open'}
                aria-hidden={model.coverPhase !== 'open'}
            >
                <section
                    className="hero"
                    id="beranda"
                    aria-labelledby="main-title"
                >
                    <div className="hero-top">
                        <span
                            className="monogram"
                            aria-hidden="true"
                        >{`${invitation.bride.short[0]} & ${invitation.groom.short[0]}`}</span>
                        <span className="eyebrow">
                            Magetan ·{' '}
                            <span data-year="">
                                {formatWeddingDate({ year: 'numeric' })}
                            </span>
                        </span>
                    </div>
                    <p className="hero-label eyebrow">Undangan pernikahan</p>
                    <h1 id="main-title" tabIndex={-1} ref={model.mainTitleRef}>
                        <span data-bride-short="">
                            {invitation.bride.short}
                        </span>
                        <em>&amp;</em>
                        <span data-groom-short="">
                            {invitation.groom.short}
                        </span>
                    </h1>
                    <p className="hero-caption">
                        Dua hati, satu janji.
                        <br />
                        Seiring langkah, sepanjang hayat.
                    </p>
                    <div className="hero-art" aria-hidden="true">
                        <svg viewBox="0 0 440 360">
                            <use href="#pendopo" />
                        </svg>
                    </div>
                    <div className="hero-date">
                        <span data-weekday="">
                            {formatWeddingDate({
                                weekday: 'long',
                            }).toUpperCase()}
                        </span>
                        <strong data-day="">
                            {formatWeddingDate({ day: '2-digit' })}
                        </strong>
                        <span data-month-year="">
                            {formatWeddingDate({
                                month: 'long',
                                year: 'numeric',
                            }).toUpperCase()}
                        </span>
                    </div>
                    <a className="scroll-cue" href="#salam">
                        GULIR UNTUK MEMBACA
                        <svg className="icon" aria-hidden="true">
                            <use href="#i-arrow" />
                        </svg>
                    </a>
                    <svg
                        className="batik-strip"
                        viewBox="0 0 440 30"
                        aria-hidden="true"
                    >
                        <use href="#jawa-batik-strip" />
                    </svg>
                </section>

                <section className="section intro" id="salam">
                    <div className="reveal">
                        <svg className="ornament-logo" aria-hidden="true">
                            <use href="#gunungan" />
                        </svg>
                        <p className="eyebrow">Dengan segenap rasa syukur</p>
                        <h2 className="greeting" style={{ marginTop: '17px' }}>
                            Assalamu’alaikum
                            <br />
                            warahmatullahi wabarakatuh
                        </h2>
                        <p className="body-copy">
                            Atas rahmat dan rida Allah SWT, dengan penuh
                            kebahagiaan kami bermaksud menyelenggarakan
                            pernikahan kami. Menjadi kehormatan bagi kami
                            apabila Anda berkenan hadir dan memberikan doa
                            restu.
                        </p>
                    </div>
                </section>

                <section className="quote">
                    <svg
                        className="javanese-sulur quote-sulur-left"
                        viewBox="0 0 70 170"
                        aria-hidden="true"
                    >
                        <use href="#jawa-sulur" />
                    </svg>
                    <svg
                        className="javanese-sulur quote-sulur-right"
                        viewBox="0 0 70 170"
                        aria-hidden="true"
                    >
                        <use href="#jawa-sulur" />
                    </svg>
                    <div className="reveal">
                        <span className="quote-flower" aria-hidden="true">
                            ✳&#xFE0E;
                        </span>
                        <p className="eyebrow">Tentang cinta dan perjalanan</p>
                        <blockquote>
                            “Bukan sekadar menemukan,
                            <br />
                            melainkan saling menjaga.”
                        </blockquote>
                        <p>
                            Semoga setiap langkah menjadi ibadah,
                            <br />
                            setiap pulang menjadi rumah.
                        </p>
                    </div>
                </section>

                <section
                    className="section couple"
                    id="mempelai"
                    aria-labelledby="couple-title"
                >
                    <div className="reveal">
                        <p className="eyebrow">Yang berbahagia</p>
                        <h2 className="section-title" id="couple-title">
                            Sepasang <em>mempelai</em>
                        </h2>
                        <p className="body-copy">
                            Dengan restu kedua orang tua,
                            <br />
                            kami memulai kisah baru bersama.
                        </p>
                    </div>
                    <figure className="reveal reveal-photo">
                        <div className="couple-photo">
                            <img
                                id="couple-image"
                                alt="Ilustrasi pasangan pengantin mengenakan kebaya dan beskap adat Jawa"
                                width="768"
                                height="1024"
                                loading="lazy"
                                src="/images/foto-mempelai/1.webp"
                                onError={useJpegFallback}
                            />
                        </div>
                        <figcaption className="photo-caption">
                            ILUSTRASI PASANGAN · GAMBAR CONTOH
                        </figcaption>
                    </figure>
                    <div className="reveal">
                        <div className="person">
                            <p className="small-name" data-bride-short="">
                                {invitation.bride.short}
                            </p>
                            <h3 data-bride-full="">{invitation.bride.full}</h3>
                            <p>
                                Putri dari
                                <br />
                                <span data-bride-parents="">
                                    {invitation.bride.parents}
                                </span>
                            </p>
                        </div>
                        <div className="couple-amp" aria-hidden="true">
                            &amp;
                        </div>
                        <div className="person">
                            <p className="small-name" data-groom-short="">
                                {invitation.groom.short}
                            </p>
                            <h3 data-groom-full="">{invitation.groom.full}</h3>
                            <p>
                                Putra dari
                                <br />
                                <span data-groom-parents="">
                                    {invitation.groom.parents}
                                </span>
                            </p>
                        </div>
                        <div className="divider" aria-hidden="true">
                            <span>❧</span>
                        </div>
                    </div>
                </section>

                <section
                    className="section events"
                    id="acara"
                    aria-labelledby="events-title"
                >
                    <div className="reveal">
                        <p className="eyebrow">Sebuah hari yang dinanti</p>
                        <h2 className="section-title" id="events-title">
                            Waktu &amp; <em>tempat</em>
                        </h2>
                        <p className="body-copy">
                            Simpan tanggalnya.
                            <br />
                            Kehadiran Anda melengkapi kebahagiaan kami.
                        </p>
                        <p className="event-date" data-date-long="">
                            {formatWeddingDate({
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                        <div
                            className="countdown"
                            aria-label="Hitung mundur menuju akad nikah"
                        >
                            <div>
                                <strong id="days">
                                    {model.countdown.days}
                                </strong>
                                <span>Hari</span>
                            </div>
                            <div>
                                <strong id="hours">
                                    {model.countdown.hours}
                                </strong>
                                <span>Jam</span>
                            </div>
                            <div>
                                <strong id="minutes">
                                    {model.countdown.minutes}
                                </strong>
                                <span>Menit</span>
                            </div>
                            <div>
                                <strong id="seconds">
                                    {model.countdown.seconds}
                                </strong>
                                <span>Detik</span>
                            </div>
                        </div>
                        <p
                            className="countdown-note"
                            id="countdown-note"
                            hidden={!model.countdown.finished}
                        >
                            Hari bahagia telah tiba. Terima kasih untuk setiap
                            doa.
                        </p>
                    </div>
                    <button
                        className="btn secondary"
                        id="save-date"
                        type="button"
                        onClick={model.saveDate}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use href="#i-calendar" />
                        </svg>
                        Simpan tanggal
                    </button>
                    <article className="event-card reveal">
                        <div className="event-icon">
                            <svg className="icon" aria-hidden="true">
                                <use href="#i-rings" />
                            </svg>
                        </div>
                        <p
                            className="eyebrow"
                            style={{ fontSize: '8px', marginBottom: '8px' }}
                        >
                            Janji untuk selamanya
                        </p>
                        <h3>Akad nikah</h3>
                        <p className="time" data-akad-time="">
                            {invitation.akadTime}
                        </p>
                        <div className="rule"></div>
                        <p className="venue" data-venue="">
                            {invitation.venue}
                        </p>
                        <p className="address" data-address="">
                            {invitation.address}
                        </p>
                        <a
                            className="btn secondary map-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={mapUrl}
                        >
                            <svg className="icon" aria-hidden="true">
                                <use href="#i-location" />
                            </svg>
                            Lihat lokasi
                        </a>
                    </article>
                    <article className="event-card reveal">
                        <div className="event-icon">
                            <svg className="icon" aria-hidden="true">
                                <use href="#i-flower" />
                            </svg>
                        </div>
                        <p
                            className="eyebrow"
                            style={{ fontSize: '8px', marginBottom: '8px' }}
                        >
                            Merayakan kebersamaan
                        </p>
                        <h3>Resepsi</h3>
                        <p className="time" data-reception-time="">
                            {invitation.receptionTime}
                        </p>
                        <div className="rule"></div>
                        <p className="venue" data-venue="">
                            {invitation.venue}
                        </p>
                        <p className="address" data-address="">
                            {invitation.address}
                        </p>
                        <a
                            className="btn secondary map-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={mapUrl}
                        >
                            <svg className="icon" aria-hidden="true">
                                <use href="#i-location" />
                            </svg>
                            Lihat lokasi
                        </a>
                    </article>
                </section>

                <section
                    className="section story"
                    id="cerita"
                    aria-labelledby="story-title"
                >
                    <div className="reveal">
                        <p className="eyebrow">Sepenggal perjalanan</p>
                        <h2 className="section-title" id="story-title">
                            Cerita <em>kita</em>
                        </h2>
                        <p className="body-copy">
                            Hal-hal sederhana yang membawa
                            <br />
                            kami sampai pada hari istimewa.
                        </p>
                    </div>
                    <div className="timeline">
                        <article className="story-item reveal">
                            <span className="story-year">
                                2022 · AWAL CERITA
                            </span>
                            <h3>Perjumpaan sederhana</h3>
                            <p>
                                Berawal dari pertemuan yang tak direncanakan,
                                percakapan kecil tumbuh menjadi alasan untuk
                                kembali saling menyapa.
                            </p>
                        </article>
                        <article className="story-item reveal">
                            <span className="story-year">
                                2025 · SATU TUJUAN
                            </span>
                            <h3>Memilih untuk bersama</h3>
                            <p>
                                Dalam banyak cerita dan perjalanan, kami belajar
                                bahwa rumah adalah seseorang yang bersedia
                                saling mendengarkan.
                            </p>
                        </article>
                        <article className="story-item reveal">
                            <span className="story-year">
                                2026 · LEMBARAN BARU
                            </span>
                            <h3>Melangkah selamanya</h3>
                            <p>
                                Dengan restu keluarga dan niat yang baik, kami
                                mengikat janji untuk merawat cinta sepanjang
                                kehidupan.
                            </p>
                        </article>
                    </div>
                </section>

                <section
                    className="section gallery"
                    id="galeri"
                    aria-labelledby="gallery-title"
                >
                    <div className="reveal">
                        <svg
                            className="ceremonial-divider"
                            viewBox="0 0 300 36"
                            aria-hidden="true"
                        >
                            <use href="#jawa-divider" />
                        </svg>
                        <p className="eyebrow">Yang ingin selalu dikenang</p>
                        <h2 className="section-title" id="gallery-title">
                            Bingkai <em>bahagia</em>
                        </h2>
                        <p className="body-copy">
                            Beberapa momen sederhana,
                            <br />
                            yang menjadi bagian indah dari cerita kita.
                        </p>
                    </div>
                    <div className="gallery-grid">
                        {photos.map((photo, index) => (
                            <button
                                key={photo.src}
                                className={`gallery-tile${index === 0 || index === 3 ? ' wide' : ''} reveal reveal-photo`}
                                type="button"
                                data-gallery-index={index}
                                aria-label={`Lihat foto: ${photo.caption}`}
                                aria-haspopup="dialog"
                                onClick={(event) =>
                                    model.openPhoto(index, event.currentTarget)
                                }
                            >
                                <span className="gallery-image-wrap">
                                    <img
                                        data-gallery-photo={index}
                                        width={
                                            index === 0 || index === 3
                                                ? 1000
                                                : 900
                                        }
                                        height={
                                            index === 0 || index === 3
                                                ? 750
                                                : 1200
                                        }
                                        loading="lazy"
                                        src={photo.src}
                                        onError={useJpegFallback}
                                        alt={photo.alt}
                                    />
                                    <span className="gallery-caption">
                                        {photo.caption}
                                    </span>
                                </span>
                                <span
                                    className="gallery-zoom"
                                    aria-hidden="true"
                                >
                                    <svg className="icon">
                                        <use href="#i-zoom" />
                                    </svg>
                                </span>
                            </button>
                        ))}
                    </div>
                    <p className="gallery-hint">
                        <svg className="icon" aria-hidden="true">
                            <use href="#i-zoom" />
                        </svg>
                        Ketuk foto untuk melihat lebih dekat.
                    </p>
                    <p className="gallery-sample-note">
                        FOTO ILUSTRASI · CONTOH GALERI
                    </p>
                    <svg
                        className="ceremonial-divider bottom"
                        viewBox="0 0 300 36"
                        aria-hidden="true"
                    >
                        <use href="#jawa-divider" />
                    </svg>
                </section>

                <section
                    className="section gift"
                    id="hadiah"
                    aria-labelledby="gift-title"
                >
                    <svg
                        className="batik-strip"
                        viewBox="0 0 440 30"
                        aria-hidden="true"
                    >
                        <use href="#jawa-batik-strip" />
                    </svg>
                    <div className="reveal">
                        <p className="eyebrow">Tanda kasih untuk mempelai</p>
                        <h2 className="section-title" id="gift-title">
                            Titip <em>kasih</em>
                        </h2>
                        <p className="body-copy gift-intro">
                            Doa restu Anda adalah hadiah terindah bagi kami.
                            Apabila ingin berbagi tanda kasih, Anda dapat
                            mengirimkannya melalui rekening berikut.
                        </p>
                    </div>
                    <div className="gift-cards">
                        {invitation.gifts.map((account, index) => (
                            <article
                                key={account.bank}
                                className="gift-card reveal"
                                data-gift-card={index}
                                aria-label={`Rekening hadiah ${index === 0 ? 'pertama' : 'kedua'}`}
                            >
                                <svg
                                    className="engraved-corner"
                                    viewBox="0 0 80 80"
                                    aria-hidden="true"
                                >
                                    <use href="#jawa-gift-corner" />
                                </svg>
                                <svg
                                    className="engraved-corner lower"
                                    viewBox="0 0 80 80"
                                    aria-hidden="true"
                                >
                                    <use href="#jawa-gift-corner" />
                                </svg>
                                <div className="gift-card-header">
                                    <h3 className="gift-bank" data-gift-bank="">
                                        {account.bank}
                                    </h3>
                                    <span
                                        className="gift-example"
                                        data-gift-example=""
                                        hidden={!account.isExample}
                                    >
                                        CONTOH
                                    </span>
                                </div>
                                <p className="gift-account-label">
                                    Nomor rekening
                                </p>
                                <p className="gift-number" data-gift-number="">
                                    {formatAccountNumber(account.number)}
                                </p>
                                <p className="gift-holder">
                                    Atas nama
                                    <strong data-gift-holder="">
                                        {account.holder}
                                    </strong>
                                </p>
                                <button
                                    className="btn"
                                    type="button"
                                    data-copy-gift={index}
                                    aria-label={`Salin nomor rekening ${account.bank}`}
                                    onClick={() => void model.copyGift(index)}
                                >
                                    <svg className="icon" aria-hidden="true">
                                        <use href="#i-copy" />
                                    </svg>
                                    Salin nomor rekening
                                </button>
                            </article>
                        ))}
                    </div>
                    <p
                        className="gift-sample-note"
                        id="gift-sample-note"
                        hidden={
                            !invitation.gifts.some(
                                (account) => account.isExample,
                            )
                        }
                    >
                        Rekening di atas masih berupa contoh.
                        <br />
                        Ganti dengan rekening pengantin sebelum undangan
                        digunakan.
                    </p>
                    <p className="gift-end">
                        Terima kasih atas setiap bentuk kasih.
                    </p>
                </section>

                <section
                    className="section wishes"
                    id="ucapan"
                    aria-labelledby="wishes-title"
                >
                    <div className="reveal">
                        <p className="eyebrow">Titipkan doa baik</p>
                        <h2 className="section-title" id="wishes-title">
                            Ucapan &amp; <em>doa</em>
                        </h2>
                        <p className="body-copy">
                            Satu kalimat hangat dari Anda,
                            <br />
                            kenangan yang indah untuk kami.
                        </p>
                    </div>
                    <form
                        className="wish-form reveal"
                        id="wish-form"
                        onSubmit={model.submitWish}
                    >
                        <div className="field">
                            <label htmlFor="wish-name">Nama Anda</label>
                            <input
                                id="wish-name"
                                name="name"
                                autoComplete="name"
                                maxLength={100}
                                placeholder="Tuliskan nama Anda"
                                required
                                value={model.form.data.name}
                                onChange={(event) =>
                                    model.form.setData(
                                        'name',
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="attendance">
                                Konfirmasi kehadiran
                            </label>
                            <select
                                id="attendance"
                                name="attendance"
                                required
                                value={model.form.data.attendance}
                                onChange={(event) =>
                                    model.form.setData(
                                        'attendance',
                                        event.target
                                            .value as typeof model.form.data.attendance,
                                    )
                                }
                            >
                                <option value="">Pilih kehadiran</option>
                                <option value="hadir">
                                    Dengan senang hati hadir
                                </option>
                                <option value="tidak">
                                    Maaf, belum bisa hadir
                                </option>
                                <option value="belum">
                                    Masih menyesuaikan jadwal
                                </option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="wish-message">Ucapan dan doa</label>
                            <textarea
                                id="wish-message"
                                name="message"
                                maxLength={700}
                                rows={4}
                                placeholder="Semoga menjadi keluarga yang selalu dilimpahi cinta…"
                                required
                                value={model.form.data.message}
                                onChange={(event) =>
                                    model.form.setData(
                                        'message',
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                        <button
                            className="btn"
                            type="submit"
                            disabled={model.form.processing}
                        >
                            <svg className="icon" aria-hidden="true">
                                <use href="#i-message" />
                            </svg>
                            {model.form.processing
                                ? 'Menyimpan...'
                                : 'Simpan ucapan'}
                        </button>
                        <p
                            className="form-status"
                            id="form-status"
                            role="status"
                            hidden={!model.formStatus}
                        >
                            {model.formStatus}
                        </p>
                    </form>
                    <p className="form-hint">
                        Ucapan dan kehadiran Anda dikirim kepada pengantin dan
                        tersimpan di server.
                    </p>
                    <div className="wishes-summary">
                        <h3 id="wish-list-title">Doa dari yang terkasih</h3>
                        <span className="wish-total" id="wish-total">
                            {model.wishTotal} ucapan
                        </span>
                    </div>
                    <div
                        className="wish-list"
                        id="wish-list"
                        role="region"
                        aria-labelledby="wish-list-title"
                        tabIndex={0}
                        ref={model.wishListRef}
                        style={{ maxHeight: model.wishListMaxHeight }}
                    >
                        {model.wishes.length ? (
                            model.wishes.map((wish) => (
                                <WishCard key={wish.id} wish={wish} />
                            ))
                        ) : (
                            <p className="empty-wishes">
                                Jadilah yang pertama menitipkan doa baik.
                            </p>
                        )}
                    </div>
                    <p
                        className="wish-scroll-hint"
                        id="wish-scroll-hint"
                        hidden={model.wishes.length <= 3}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use href="#i-arrow" />
                        </svg>
                        Tiga ucapan ditampilkan. Gulir di dalam kotak untuk
                        lainnya.
                    </p>
                </section>

                <footer className="section closing reveal">
                    <svg className="ornament-logo" aria-hidden="true">
                        <use href="#gunungan" />
                    </svg>
                    <p className="body-copy">
                        Merupakan kebahagiaan bagi kami apabila Anda berkenan
                        hadir dan memberikan doa restu.
                    </p>
                    <p className="body-copy">
                        Wassalamu’alaikum warahmatullahi wabarakatuh
                    </p>
                    <p
                        className="eyebrow"
                        style={{ fontSize: '8px', marginTop: '28px' }}
                    >
                        Kami yang berbahagia
                    </p>
                    <h2>
                        <span data-bride-short="">
                            {invitation.bride.short}
                        </span>{' '}
                        <em>&amp;</em>{' '}
                        <span data-groom-short="">
                            {invitation.groom.short}
                        </span>
                    </h2>
                    <p className="families">Beserta kedua keluarga besar</p>
                    <p className="thank-you">Matur nuwun.</p>
                    <button
                        type="button"
                        className="back-cover"
                        id="back-cover"
                        onClick={model.backToCover}
                    >
                        Kembali ke sampul
                    </button>
                    <p className="closing-footer">
                        DIBUAT DENGAN CINTA ·{' '}
                        <span data-year="">
                            {formatWeddingDate({ year: 'numeric' })}
                        </span>
                    </p>
                </footer>
            </main>

            <nav
                className="bottom-nav has-gallery"
                id="bottom-nav"
                aria-label="Navigasi undangan"
                hidden={model.coverPhase !== 'open'}
            >
                <a
                    className={
                        model.activeSection === 'beranda' ? 'active' : undefined
                    }
                    href="#beranda"
                    aria-current={
                        model.activeSection === 'beranda'
                            ? 'location'
                            : undefined
                    }
                >
                    <svg className="icon" aria-hidden="true">
                        <use href="#i-home" />
                    </svg>
                    Beranda
                </a>
                <a
                    href="#mempelai"
                    className={
                        model.activeSection === 'mempelai'
                            ? 'active'
                            : undefined
                    }
                    aria-current={
                        model.activeSection === 'mempelai'
                            ? 'location'
                            : undefined
                    }
                >
                    <svg className="icon" aria-hidden="true">
                        <use href="#i-heart" />
                    </svg>
                    Mempelai
                </a>
                <a
                    href="#acara"
                    className={
                        model.activeSection === 'acara' ? 'active' : undefined
                    }
                    aria-current={
                        model.activeSection === 'acara' ? 'location' : undefined
                    }
                >
                    <svg className="icon" aria-hidden="true">
                        <use href="#i-calendar" />
                    </svg>
                    Acara
                </a>
                <a
                    href="#galeri"
                    className={
                        model.activeSection === 'galeri' ? 'active' : undefined
                    }
                    aria-current={
                        model.activeSection === 'galeri'
                            ? 'location'
                            : undefined
                    }
                >
                    <svg className="icon" aria-hidden="true">
                        <use href="#i-gallery" />
                    </svg>
                    Galeri
                </a>
                <a
                    href="#ucapan"
                    className={
                        model.activeSection === 'ucapan' ? 'active' : undefined
                    }
                    aria-current={
                        model.activeSection === 'ucapan'
                            ? 'location'
                            : undefined
                    }
                >
                    <svg className="icon" aria-hidden="true">
                        <use href="#i-message" />
                    </svg>
                    Ucapan
                </a>
            </nav>
            <button
                type="button"
                className="music-button"
                id="music-button"
                aria-label={
                    model.music.playing
                        ? 'Jeda musik instrumental'
                        : 'Putar musik instrumental'
                }
                aria-pressed={model.music.playing}
                title={
                    model.music.playing
                        ? 'Jeda musik instrumental'
                        : 'Putar musik instrumental'
                }
                hidden={model.coverPhase !== 'open'}
                disabled={model.music.starting}
                onClick={() => model.music.toggle()}
            >
                <svg className="icon" aria-hidden="true">
                    <use href="#i-music" />
                </svg>
            </button>
            <div
                className="toast"
                id="toast"
                role="status"
                hidden={!model.toast}
            >
                {model.toast}
            </div>
            <dialog
                className="photo-viewer"
                id="photo-viewer"
                role="dialog"
                aria-modal="true"
                aria-labelledby="photo-viewer-title"
                ref={model.photoDialogRef}
                onClose={model.onPhotoClose}
                onKeyDown={model.onPhotoKeyDown}
                onClick={model.onPhotoBackdropClick}
            >
                <div className="viewer-layout">
                    <div className="viewer-toolbar">
                        <div>
                            <h2 className="eyebrow" id="photo-viewer-title">
                                Bingkai bahagia
                            </h2>
                            <p className="viewer-count">
                                {invitation.bride.short} &amp;{' '}
                                {invitation.groom.short}
                            </p>
                        </div>
                        <button
                            className="viewer-control"
                            id="viewer-close"
                            type="button"
                            aria-label="Tutup galeri"
                            autoFocus
                            onClick={model.closePhoto}
                        >
                            <svg className="icon" aria-hidden="true">
                                <use href="#i-close" />
                            </svg>
                        </button>
                    </div>
                    <div
                        className="viewer-stage"
                        id="viewer-stage"
                        onTouchStart={model.onPhotoTouchStart}
                        onTouchEnd={model.onPhotoTouchEnd}
                    >
                        <img
                            id="viewer-image"
                            src={selectedPhoto?.src}
                            onError={useJpegFallback}
                            alt={selectedPhoto?.alt || ''}
                            decoding="async"
                        />
                    </div>
                    <p
                        className="viewer-caption"
                        id="viewer-caption"
                        aria-live="polite"
                    >
                        {selectedPhoto?.caption}
                    </p>
                    <div className="viewer-pagination">
                        <button
                            className="viewer-control"
                            id="viewer-prev"
                            type="button"
                            aria-label="Foto sebelumnya"
                            onClick={() => model.shiftPhoto(-1)}
                        >
                            <svg
                                className="icon"
                                aria-hidden="true"
                                style={{ transform: 'rotate(180deg)' }}
                            >
                                <use href="#i-chevron" />
                            </svg>
                        </button>
                        <span
                            className="viewer-position"
                            id="viewer-position"
                            aria-live="polite"
                        >
                            {String(
                                (model.selectedPhotoIndex ?? 0) + 1,
                            ).padStart(2, '0')}{' '}
                            / {String(photos.length).padStart(2, '0')}
                        </span>
                        <button
                            className="viewer-control"
                            id="viewer-next"
                            type="button"
                            aria-label="Foto berikutnya"
                            onClick={() => model.shiftPhoto(1)}
                        >
                            <svg className="icon" aria-hidden="true">
                                <use href="#i-chevron" />
                            </svg>
                        </button>
                    </div>
                    <p className="viewer-note">
                        Geser foto atau gunakan tombol panah untuk melihat momen
                        lainnya.
                    </p>
                </div>
            </dialog>
            <noscript>
                <p className="noscript-note">
                    Aktifkan JavaScript di browser untuk membuka undangan.
                </p>
            </noscript>
        </>
    );
}
