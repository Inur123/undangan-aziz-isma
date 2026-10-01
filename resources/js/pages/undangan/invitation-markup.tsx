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
    featuredPhotos,
    formatAccountNumber,
    formatWeddingDate,
    invitation,
    photos,
    type Wish,
} from './invitation-data';
import { CelebrationBand, InvitationDecor } from './invitation-decor';
import { InvitationCover } from './invitation-cover';
import { InvitationSymbols } from './invitation-symbols';
import type { useInvitation } from './use-invitation';

function useJpegFallback(event: SyntheticEvent<HTMLImageElement>): void {
    const image = event.currentTarget;
    const source = image.getAttribute('src');

    if (source?.endsWith('.webp')) {
        image.src = `${source.slice(0, -5)}.jpeg`;
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
            <InvitationSymbols />

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
                    <InvitationDecor variant="hero" />
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
                    <div className="hero-collage" data-motion>
                        <figure
                            className="hero-photo hero-photo--main motion-keepsake"
                            data-ambient
                        >
                            <img
                                src={featuredPhotos.heroMain}
                                width="1400"
                                height="1050"
                                alt="Pasangan tersenyum dari kedua sisi"
                                loading="lazy"
                                onError={useJpegFallback}
                            />
                            <figcaption>Every day, with you.</figcaption>
                        </figure>
                        <figure
                            className="hero-photo hero-photo--small motion-keepsake"
                            data-ambient
                        >
                            <img
                                src={featuredPhotos.heroAccent}
                                width="1122"
                                height="1402"
                                alt="Pasangan berpose ceria bersama"
                                loading="lazy"
                                onError={useJpegFallback}
                            />
                        </figure>
                        <span
                            className="hero-note motion-float"
                            data-ambient
                            aria-hidden="true"
                        >
                            it's always
                            <br />
                            been you.
                        </span>
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
                </section>

                <CelebrationBand />
                <section className="section intro" id="salam">
                    <InvitationDecor />
                    <div className="reveal">
                        <span className="section-sticker" aria-hidden="true">
                            <svg className="icon">
                                <use href="#i-heart" />
                            </svg>
                        </span>
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
                    <InvitationDecor variant="celebration" />
                    <div className="reveal">
                        <span className="quote-mark" aria-hidden="true">
                            “
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
                    <InvitationDecor />
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
                                alt="Pasangan duduk bersandar dan tersenyum"
                                width="1122"
                                height="1402"
                                loading="lazy"
                                src={featuredPhotos.couple}
                                onError={useJpegFallback}
                            />
                        </div>
                        <figcaption className="photo-caption">
                            SEPASANG CERITA · SATU TUJUAN
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
                        <div className="editorial-divider" aria-hidden="true">
                            <span>TOGETHER</span>
                        </div>
                    </div>
                </section>

                <section
                    className="section events"
                    id="acara"
                    aria-labelledby="events-title"
                >
                    <InvitationDecor />
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
                    <InvitationDecor />
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
                    <InvitationDecor />
                    <div className="reveal">
                        <span className="section-sticker" aria-hidden="true">
                            <svg className="icon">
                                <use href="#i-gallery" />
                            </svg>
                        </span>
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
                                        style={{
                                            objectPosition: photo.position,
                                        }}
                                        onError={useJpegFallback}
                                        alt={photo.alt}
                                    />
                                </span>
                                <span className="gallery-caption">
                                    {photo.caption}
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
                        EMPAT POTRET · SATU CERITA
                    </p>
                </section>

                <section
                    className="section gift"
                    id="hadiah"
                    aria-labelledby="gift-title"
                >
                    <InvitationDecor />
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
                    <InvitationDecor />
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

                <CelebrationBand />
                <footer className="section closing reveal">
                    <InvitationDecor variant="celebration" />
                    <span className="closing-monogram" aria-hidden="true">
                        {invitation.bride.short[0]} &amp;{' '}
                        {invitation.groom.short[0]}
                    </span>
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
                    <p className="thank-you">Terima kasih.</p>
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
                        ? 'Jeda musik undangan'
                        : 'Putar musik instrumental'
                }
                aria-pressed={model.music.playing}
                title={
                    model.music.playing
                        ? 'Jeda musik undangan'
                        : 'Putar musik instrumental'
                }
                hidden={model.coverPhase !== 'open'}
                disabled={model.music.starting}
                onClick={() => model.music.toggle()}
            >
                <svg
                    className="music-button__ring"
                    viewBox="0 0 44 44"
                    aria-hidden="true"
                >
                    <circle
                        className="music-button__ring-track"
                        cx="22"
                        cy="22"
                        r="20"
                    />
                    <circle
                        className="music-button__ring-progress"
                        cx="22"
                        cy="22"
                        r="20"
                        pathLength="100"
                        style={{
                            strokeDashoffset: 100 - model.music.progress * 100,
                        }}
                    />
                </svg>
                <svg className="icon" aria-hidden="true">
                    <use href={model.music.playing ? '#i-stop' : '#i-music'} />
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
