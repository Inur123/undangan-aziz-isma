import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { InvitationMarkup } from './invitation-markup';
import type { Wish } from './invitation-data';
import { dismissInvitationLoader } from './invitation-loader';
import { useInvitation } from './use-invitation';

interface UndanganProps {
    guestName: string;
    rsvps: Wish[];
    rsvpTotal: number;
}

export default function UndanganIndex({
    guestName,
    rsvps,
    rsvpTotal,
}: UndanganProps) {
    const model = useInvitation(guestName, rsvps, rsvpTotal);

    useEffect(() => {
        const coverImage = document.getElementById(
            'cover-portrait',
        ) as HTMLImageElement | null;

        if (coverImage?.complete && coverImage.naturalWidth > 0) {
            dismissInvitationLoader();
        }

        const fallbackTimer = window.setTimeout(dismissInvitationLoader, 7000);

        return () => {
            window.clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <>
            <Head title="Undangan Pernikahan">
                <link rel="stylesheet" href="/undangan-assets/style.css" />
                <link rel="stylesheet" href="/undangan-assets/compat.css" />
            </Head>
            <div
                ref={model.rootRef}
                className="undangan-wrapper font-sans text-[#4a4a4a]"
            >
                <InvitationMarkup guestName={guestName} model={model} />
            </div>
        </>
    );
}
