import type { CSSProperties, SyntheticEvent } from 'react';
import {
    featuredPhotos,
    formatWeddingDate,
    invitation,
} from './invitation-data';
import { InvitationDecor } from './invitation-decor';
import { dismissInvitationLoader } from './invitation-loader';
import type { useInvitation } from './use-invitation';

type CoverProps = {
    guestName: string;
    model: ReturnType<typeof useInvitation>;
    onImageError: (event: SyntheticEvent<HTMLImageElement>) => void;
};

function CoverPaper({ guestName, model, onImageError }: CoverProps) {
    return (
        <div className="cover-paper">
            <InvitationDecor variant="cover" />
            <div className="cover-header">
                <span>THE WEDDING</span>
                <span>{formatWeddingDate({ year: 'numeric' })}</span>
            </div>
            <div className="cover-portrait">
                <img
                    id="cover-portrait"
                    alt="Foto pasangan calon pengantin"
                    width="1122"
                    height="1402"
                    fetchPriority="high"
                    src={featuredPhotos.cover}
                    onLoad={dismissInvitationLoader}
                    onError={onImageError}
                />
                <span className="cover-photo-label" aria-hidden="true">
                    BETTER TOGETHER
                </span>
            </div>
            <div className="cover-sticker" aria-hidden="true">
                <svg viewBox="0 0 80 80">
                    <use href="#d-spark" />
                </svg>
                <span>
                    with
                    <br />
                    love.
                </span>
            </div>
            <p className="eyebrow">Together with our families</p>
            <h1 className="cover-title" id="cover-title">
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
            <div className="guest">
                <p className="guest-label">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <p className="guest-name" id="guest-name">
                    {guestName}
                </p>
                <button
                    className="btn"
                    id="open-invitation"
                    type="button"
                    ref={model.openButtonRef}
                    disabled={model.coverPhase !== 'closed'}
                    onClick={model.openInvitation}
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
            <p className="cover-bottom">YOU, ME & OUR NEXT CHAPTER</p>
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
                            '--cover-duration': `${model.coverOpeningDuration}ms`,
                        } as CSSProperties
                    }
                >
                    <div
                        className="opening-scene"
                        aria-hidden="true"
                        onAnimationEnd={(event) => {
                            if (
                                event.target === event.currentTarget &&
                                event.animationName === 'opening-scene'
                            ) {
                                model.finishOpening();
                            }
                        }}
                    >
                        <div className="opening-wash opening-wash--one" />
                        <div className="opening-wash opening-wash--two" />
                        <div className="opening-orbit" />
                        <div className="opening-collage">
                            <div className="opening-card opening-card--back">
                                <span>you &amp; me.</span>
                            </div>
                            <div className="opening-card opening-card--photo">
                                <img
                                    src={model.coverSnapshot.portraitSrc}
                                    alt=""
                                    width="1122"
                                    height="1402"
                                    onError={props.onImageError}
                                />
                                <span>
                                    {invitation.bride.short} &amp;{' '}
                                    {invitation.groom.short}
                                </span>
                            </div>
                            <svg className="opening-spark" viewBox="0 0 80 80">
                                <use href="#d-spark" />
                            </svg>
                        </div>
                        <div className="opening-confetti">
                            {Array.from({ length: 12 }, (_, index) => (
                                <i
                                    key={index}
                                    style={
                                        { '--piece': index } as CSSProperties
                                    }
                                />
                            ))}
                        </div>
                        <p className="opening-copy">
                            A little love.
                            <br />
                            <strong>A lifetime together.</strong>
                        </p>
                        <div className="opening-progress">
                            <span />
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
