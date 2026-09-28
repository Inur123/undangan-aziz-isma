type DecorVariant = 'cover' | 'hero' | 'section' | 'celebration';

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
            <svg className="decor-orbit motion-spin" viewBox="0 0 160 160">
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
                viewBox="0 0 80 80"
            >
                <use href="#d-spark" />
            </svg>
            <svg
                className="decor-spark decor-spark--small motion-twinkle"
                viewBox="0 0 80 80"
            >
                <use href="#d-spark" />
            </svg>
            <svg className="decor-ribbon" viewBox="0 0 180 140">
                <path d="M-10 120C20 5 143-4 128 56S32 71 78 33s98 4 75 56-42 53-64 18" />
            </svg>
            <span className="decor-dot decor-dot--one" />
            <span className="decor-dot decor-dot--two motion-float" />
            <span className="decor-dash" />
        </div>
    );
}

export function CelebrationBand() {
    return (
        <div className="celebration-band" aria-hidden="true">
            <span>YOU &amp; ME</span>
            <svg viewBox="0 0 80 80">
                <use href="#d-spark" />
            </svg>
            <span>ALWAYS &amp; FOREVER</span>
            <svg viewBox="0 0 80 80">
                <use href="#d-spark" />
            </svg>
        </div>
    );
}
