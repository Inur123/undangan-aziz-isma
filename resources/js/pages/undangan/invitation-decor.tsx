import type { CSSProperties } from 'react';

type DecorVariant = 'cover' | 'hero' | 'section' | 'celebration';

export function CelebrationMarks({ opening = false }: { opening?: boolean }) {
    return (
        <div
            className={opening ? 'opening-marks' : 'decor-marks'}
            aria-hidden="true"
        >
            {[
                'spark',
                'heart',
                'ring',
                'spark',
                'heart',
                'spark',
                'ring',
                'heart',
            ].map((kind, index) => (
                <svg
                    key={index}
                    className={`celebration-mark celebration-mark--${kind}`}
                    data-ambient={opening ? undefined : true}
                    viewBox="0 0 80 80"
                    style={{ '--mark': index } as CSSProperties}
                >
                    {kind === 'ring' ? (
                        <>
                            <circle cx="29" cy="40" r="20" />
                            <circle cx="51" cy="40" r="20" />
                        </>
                    ) : (
                        <use
                            href={kind === 'heart' ? '#i-heart' : '#d-spark'}
                        />
                    )}
                </svg>
            ))}
        </div>
    );
}

export function InvitationDecor({
    variant = 'section',
}: {
    variant?: DecorVariant;
}) {
    return (
        <div
            className={`studio-decor studio-decor--${variant}`}
            data-motion
            aria-hidden="true"
        >
            <svg
                className="decor-orbit motion-spin"
                data-ambient
                viewBox="0 0 160 160"
            >
                <ellipse
                    cx="80"
                    cy="80"
                    rx="74"
                    ry="30"
                    transform="rotate(-35 80 80)"
                />
                <ellipse
                    cx="80"
                    cy="80"
                    rx="74"
                    ry="30"
                    transform="rotate(35 80 80)"
                />
                <circle cx="124" cy="32" r="7" />
            </svg>
            <svg
                className="decor-spark decor-spark--large motion-float"
                data-ambient
                viewBox="0 0 80 80"
            >
                <use href="#d-spark" />
            </svg>
            <svg
                className="decor-spark decor-spark--small motion-twinkle"
                data-ambient
                viewBox="0 0 80 80"
            >
                <use href="#d-spark" />
            </svg>
            <svg
                className="decor-ribbon motion-ribbon"
                data-ambient
                viewBox="0 0 180 140"
            >
                <path d="M-10 120C20 5 143-4 128 56S32 71 78 33s98 4 75 56-42 53-64 18" />
            </svg>
            <span
                className="decor-dot decor-dot--one motion-twinkle"
                data-ambient
            />
            <span
                className="decor-dot decor-dot--two motion-float"
                data-ambient
            />
            <span className="decor-dash motion-ribbon" data-ambient />
            <CelebrationMarks />
        </div>
    );
}

export function CelebrationBand() {
    return (
        <div className="celebration-band" data-motion aria-hidden="true">
            <div className="celebration-track motion-marquee" data-ambient>
                {[0, 1].map((copy) => (
                    <div className="celebration-repeat" key={copy}>
                        {[0, 1].map((phrase) => (
                            <span className="celebration-phrase" key={phrase}>
                                <span>YOU &amp; ME</span>
                                <svg viewBox="0 0 80 80">
                                    <use href="#d-spark" />
                                </svg>
                                <span>ALWAYS &amp; FOREVER</span>
                                <svg viewBox="0 0 80 80">
                                    <use href="#d-spark" />
                                </svg>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
