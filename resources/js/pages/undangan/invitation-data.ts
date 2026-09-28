export type Attendance = 'hadir' | 'tidak' | 'belum';

export interface Wish {
    id: number;
    name: string;
    attendance: Attendance;
    message: string;
}

export const invitation = {
    bride: {
        short: 'Isma',
        full: 'Ismatul Anwaroti, S.Pd',
        parents: 'Bapak Slamet & Ibu Suratmi',
    },
    groom: {
        short: 'Aziz',
        full: 'Muhammad Lathifatul Aziz, S.Pd',
        parents: 'Bapak Kusnan & Ibu Muryati',
    },
    date: '2026-11-01T08:00:00+07:00',
    end: '2026-11-01T14:00:00+07:00',
    akadTime: '08.00 – 09.00 WIB',
    receptionTime: '11.00 – 14.00 WIB',
    venue: 'Kediaman Mempelai Wanita',
    address:
        'Dusun Balibatur RT 003 RW 004, Desa Temboro, Kec. Karas, Kab. Magetan',
    mapsQuery: '-7.59186,111.39450',
    gifts: [
        {
            bank: 'BCA',
            number: '0000000000',
            holder: 'Ismatul Anwaroti, S.Pd',
            isExample: true,
        },
        {
            bank: 'MANDIRI',
            number: '0000000000000',
            holder: 'Muhammad Lathifatul Aziz, S.Pd',
            isExample: true,
        },
    ],
} as const;

export const featuredPhotos = {
    cover: '/images/foto-mempelai/foto-3.webp',
    heroMain: '/images/foto-mempelai/foto-2.webp',
    heroAccent: '/images/foto-mempelai/foto-1.webp',
    couple: '/images/foto-mempelai/foto-2.webp',
} as const;

export const photos = [
    {
        src: '/images/foto-mempelai/foto-3.webp',
        caption: 'Di antara kita',
        alt: 'Pasangan tersenyum dari kedua sisi dengan ruang di tengah',
        position: 'center 28%',
    },
    {
        src: '/images/foto-mempelai/foto-4.webp',
        caption: 'Tumbuh bersama',
        alt: 'Pasangan berdiri bersama dalam pose ceria',
        position: 'center 28%',
    },
    {
        src: '/images/foto-mempelai/foto-2.webp',
        caption: 'Saling menatap',
        alt: 'Pasangan duduk saling menatap dan tersenyum satu sama lain',
        position: 'center 25%',
    },
    {
        src: '/images/foto-mempelai/foto-1.webp',
        caption: 'Tawa yang sama',
        alt: 'Pasangan berpose ceria dengan kedua tangan menopang wajah',
        position: 'center 65%',
    },
] as const;

export const attendanceLabels: Record<Attendance, string> = {
    hadir: 'Berencana hadir',
    tidak: 'Belum bisa hadir',
    belum: 'Menyesuaikan jadwal',
};

export const weddingDate = new Date(invitation.date);

export function formatWeddingDate(options: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        ...options,
    }).format(weddingDate);
}

export function formatAccountNumber(number: string): string {
    return number
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
}
