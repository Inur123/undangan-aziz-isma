import type { CSSProperties, SyntheticEvent } from 'react';
import { formatWeddingDate, invitation } from './invitation-data';
import { dismissInvitationLoader } from './invitation-loader';
import type { useInvitation } from './use-invitation';

type CoverProps = {
    guestName: string;
    model: ReturnType<typeof useInvitation>;
    onImageError: (event: SyntheticEvent<HTMLImageElement>) => void;
};

function CoverPaper({
    guestName,
    model,
    onImageError,
    decorative = false,
}: CoverProps & { decorative?: boolean }) {
    return (
        <div className="cover-paper">
            <div className="cover-portrait">
                <img
                    id={decorative ? undefined : 'cover-portrait'}
                    alt="Pasangan pengantin dengan busana adat Jawa"
                    width="900"
                    height="1200"
                    fetchPriority="high"
                    src={
                        decorative
                            ? model.coverSnapshot.portraitSrc
                            : '/images/foto-mempelai/1.webp'
                    }
                    onLoad={decorative ? undefined : dismissInvitationLoader}
                    onError={onImageError}
                />
            </div>
            <div className="cover-frame" aria-hidden="true"></div>
            <svg
                className="javanese-sulur cover-sulur-left"
                viewBox="0 0 70 170"
                aria-hidden="true"
            >
                <use href="#jawa-sulur" />
            </svg>
            <svg
                className="javanese-sulur cover-sulur-right"
                viewBox="0 0 70 170"
                aria-hidden="true"
            >
                <use href="#jawa-sulur" />
            </svg>
            <svg className="ornament-logo" aria-hidden="true">
                <use href="#gunungan" />
            </svg>
            <p className="eyebrow">The wedding of</p>
            <h1
                className="cover-title"
                id={decorative ? undefined : 'cover-title'}
            >
                <span data-bride-short="">{invitation.bride.short}</span>
                <em>&amp;</em>
                <span data-groom-short="">{invitation.groom.short}</span>
            </h1>
            <p className="cover-date" data-date-numeric="">
                {formatWeddingDate({
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).replaceAll('/', ' . ')}
            </p>
            <div className="cover-art" aria-hidden="true">
                <svg viewBox="0 0 440 360">
                    <use href="#pendopo" />
                </svg>
            </div>
            <div className="guest">
                <p className="guest-label">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <p
                    className="guest-name"
                    id={decorative ? undefined : 'guest-name'}
                >
                    {guestName}
                </p>
                <button
                    className="btn"
                    id={decorative ? undefined : 'open-invitation'}
                    type="button"
                    ref={decorative ? undefined : model.openButtonRef}
                    tabIndex={decorative ? -1 : undefined}
                    disabled={!decorative && model.coverPhase !== 'closed'}
                    onClick={decorative ? undefined : model.openInvitation}
                >
                    <svg className="icon" aria-hidden="true">
                        <use href="#i-envelope" />
                    </svg>
                    Buka undangan
                </button>
            </div>
            <p className="cover-footnote">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir
                di hari bahagia kami.
            </p>
            <p className="cover-bottom">
                ꧁ &nbsp; SEBUAH JANJI, SEPANJANG HAYAT &nbsp; ꧂
            </p>
        </div>
    );
}

export function InvitationCover(props: CoverProps) {
    const { model } = props;

    return (
        <section
            className={`cover${model.coverPhase === 'exiting' ? ' exiting' : ''}`}
            id="cover"
            ref={model.coverRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cover-title"
            aria-busy={model.coverPhase === 'exiting'}
            hidden={model.coverPhase === 'open'}
        >
            <CoverPaper {...props} />
            {model.coverPhase === 'exiting' && (
                <div
                    className="cover-opening"
                    style={
                        {
                            top: model.coverSnapshot.scrollTop,
                            height: model.coverSnapshot.height,
                            '--cover-scroll-offset': `${-model.coverSnapshot.scrollTop}px`,
                            '--cover-duration': `${model.coverOpeningDuration}ms`,
                        } as CSSProperties
                    }
                >
                    <div
                        className="cover-journey"
                        aria-hidden="true"
                        onAnimationEnd={(event) => {
                            if (
                                event.target === event.currentTarget &&
                                event.animationName === 'invitation-journey-end'
                            ) {
                                model.finishOpening();
                            }
                        }}
                    >
                        <div className="journey-frame" />
                        <svg className="journey-gunungan" viewBox="0 0 100 132">
                            <use href="#gunungan" />
                        </svg>
                        <svg className="journey-pendopo" viewBox="0 0 440 360">
                            <use href="#pendopo" />
                        </svg>
                        <div className="journey-foliage journey-foliage-left">
                            <svg viewBox="0 0 70 170">
                                <use href="#jawa-sulur" />
                            </svg>
                        </div>
                        <div className="journey-foliage journey-foliage-right">
                            <svg viewBox="0 0 70 170">
                                <use href="#jawa-sulur" />
                            </svg>
                        </div>
                    </div>
                    <div className="cover-leaves" aria-hidden="true" inert>
                        <div className="cover-leaf cover-leaf-left">
                            <CoverPaper {...props} decorative />
                        </div>
                        <div className="cover-leaf cover-leaf-right">
                            <CoverPaper {...props} decorative />
                        </div>
                    </div>
                    <button
                        className="cover-skip"
                        type="button"
                        onClick={model.finishOpening}
                    >
                        Lewati animasi
                    </button>
                </div>
            )}
        </section>
    );
}
