export type Attendance = 'hadir' | 'tidak' | 'belum';

export interface Wish {
    id: number;
    name: string;
    attendance: Attendance;
    message: string;
}

export const invitation = {
    bride: {
        short: 'Sekar',
        full: 'Sekar Ayu Prameswari',
        parents: 'Bapak Hadi Susanto & Ibu Ratna Wulandari',
    },
    groom: {
        short: 'Bima',
        full: 'Bima Aditya Pratama',
        parents: 'Bapak Arif Pratama & Ibu Sri Handayani',
    },
    date: '2027-02-14T08:00:00+07:00',
    end: '2027-02-14T14:00:00+07:00',
    akadTime: '08.00 – 09.00 WIB',
    receptionTime: '11.00 – 14.00 WIB',
    venue: 'Pendopo Kinasih (contoh)',
    address: 'Yogyakarta, Daerah Istimewa Yogyakarta',
    mapsQuery: 'Yogyakarta, Daerah Istimewa Yogyakarta',
    gifts: [
        {
            bank: 'BCA',
            number: '0000000000',
            holder: 'Sekar Ayu Prameswari',
            isExample: true,
        },
        {
            bank: 'MANDIRI',
            number: '0000000000000',
            holder: 'Bima Aditya Pratama',
            isExample: true,
        },
    ],
} as const;

export const photos = [
    {
        src: '/images/foto-mempelai/2.webp',
        caption: 'Seiring langkah',
        alt: 'Pasangan pengantin berjalan bersama di halaman pendopo Jawa',
    },
    {
        src: '/images/foto-mempelai/1.webp',
        caption: 'Dalam satu bingkai',
        alt: 'Potret pasangan pengantin dalam busana adat Jawa',
    },
    {
        src: '/images/foto-mempelai/3.webp',
        caption: 'Tempat untuk pulang',
        alt: 'Pasangan pengantin duduk bersama dan saling tersenyum di pendopo',
    },
    {
        src: '/images/foto-mempelai/4.webp',
        caption: 'Janji yang kita jaga',
        alt: 'Detail kedua tangan pengantin saling menggenggam dengan cincin dan busana batik',
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
