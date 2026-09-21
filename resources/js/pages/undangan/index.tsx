import { Head } from '@inertiajs/react';
import { InvitationMarkup } from './invitation-markup';
import type { Wish } from './invitation-data';
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

    return (
        <>
            <Head title="Undangan Pernikahan">
                <link rel="stylesheet" href="/undangan-assets/style.css" />
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
