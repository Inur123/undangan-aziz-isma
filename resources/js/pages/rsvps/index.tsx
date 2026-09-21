import { Head, Link } from '@inertiajs/react';
import {
    MessageSquareHeart,
    UserCheck,
    UserX,
    Clock,
    Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pagination, PaginatedData } from '@/components/pagination';
import { dashboard } from '@/routes';
import * as RsvpRoutes from '@/routes/rsvps';

interface Rsvp {
    id: number;
    name: string;
    attendance: 'hadir' | 'tidak' | 'belum';
    message: string;
    created_at: string;
}

interface Stats {
    total: number;
    hadir: number;
    tidak: number;
    belum: number;
}

const attendanceConfig = {
    hadir: {
        label: 'Dengan senang hati hadir',
        icon: UserCheck,
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    tidak: {
        label: 'Maaf, belum bisa hadir',
        icon: UserX,
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    },
    belum: {
        label: 'Masih menyesuaikan jadwal',
        icon: Clock,
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    },
};

export default function RsvpsIndex({
    rsvps,
    stats,
    filter,
}: {
    rsvps: PaginatedData<Rsvp>;
    stats: Stats;
    filter: string;
}) {
    const filters = [
        { key: 'semua', label: 'Semua', count: stats.total },
        { key: 'hadir', label: 'Hadir', count: stats.hadir },
        { key: 'tidak', label: 'Tidak Hadir', count: stats.tidak },
        { key: 'belum', label: 'Belum Pasti', count: stats.belum },
    ];

    return (
        <>
            <Head title="RSVP & Ucapan" />
            <div className="flex w-full flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        RSVP & Ucapan
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Konfirmasi kehadiran dan doa dari tamu undangan.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total RSVP
                            </CardTitle>
                            <MessageSquareHeart className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                ucapan masuk
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Akan Hadir
                            </CardTitle>
                            <UserCheck className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.hadir}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                konfirmasi hadir
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tidak Hadir
                            </CardTitle>
                            <UserX className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {stats.tidak}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                konfirmasi tidak hadir
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Belum Pasti
                            </CardTitle>
                            <Clock className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">
                                {stats.belum}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                menyesuaikan jadwal
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter Tabs */}
                <div className="bg-muted/30 flex flex-wrap items-center gap-2 rounded-md border p-2 shadow-sm">
                    <Filter className="text-muted-foreground mx-1 h-4 w-4 shrink-0" />
                    {filters.map((f) => (
                        <Button
                            key={f.key}
                            variant={filter === f.key ? 'default' : 'ghost'}
                            size="sm"
                            className="h-7 px-3 text-xs"
                            asChild
                        >
                            <Link
                                href={`${RsvpRoutes.index().url}?filter=${f.key}`}
                            >
                                {f.label}
                                <span className="ml-1.5 opacity-70">
                                    ({f.count})
                                </span>
                            </Link>
                        </Button>
                    ))}
                </div>

                {/* RSVP List */}
                <Card className="gap-0 overflow-hidden rounded-md border p-0 shadow-sm">
                    <CardContent className="p-0">
                        {rsvps.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <MessageSquareHeart className="text-muted-foreground mb-3 h-10 w-10 opacity-50" />
                                <h3 className="text-sm font-semibold">
                                    Belum ada RSVP masuk
                                </h3>
                                <p className="text-muted-foreground mt-1 max-w-sm text-xs">
                                    Daftar RSVP untuk filter "
                                    {
                                        filters.find((f) => f.key === filter)
                                            ?.label
                                    }
                                    " masih kosong.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="h-10 w-[40px] pl-4 text-xs">
                                                No
                                            </TableHead>
                                            <TableHead className="h-10 w-[200px] text-xs">
                                                Nama
                                            </TableHead>
                                            <TableHead className="h-10 w-[180px] text-xs">
                                                Kehadiran
                                            </TableHead>
                                            <TableHead className="h-10 min-w-[250px] text-xs">
                                                Ucapan
                                            </TableHead>
                                            <TableHead className="h-10 w-[160px] pr-4 text-right text-xs">
                                                Tanggal
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rsvps.data.map((rsvp, index) => {
                                            const config =
                                                attendanceConfig[
                                                    rsvp.attendance
                                                ];
                                            return (
                                                <TableRow key={rsvp.id}>
                                                    <TableCell className="text-muted-foreground py-3 pl-4 text-xs">
                                                        {(rsvps.from || 1) +
                                                            index}
                                                    </TableCell>
                                                    <TableCell className="py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                                                                {Array.from(
                                                                    rsvp.name,
                                                                )[0]?.toUpperCase() ??
                                                                    'T'}
                                                            </div>
                                                            <span
                                                                className="max-w-[150px] truncate text-sm font-semibold"
                                                                title={
                                                                    rsvp.name
                                                                }
                                                            >
                                                                {rsvp.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-3">
                                                        <span
                                                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${config.color}`}
                                                        >
                                                            <config.icon className="h-3 w-3 shrink-0" />
                                                            {config.label}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground max-w-sm py-3 text-sm break-words whitespace-normal sm:max-w-md lg:max-w-xl">
                                                        {rsvp.message}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground py-3 pr-4 text-right text-[11px] whitespace-nowrap">
                                                        {new Date(
                                                            rsvp.created_at,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                            {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            },
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {rsvps.data.length > 0 && <Pagination links={rsvps.links} />}
            </div>
        </>
    );
}

RsvpsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'RSVP & Ucapan', href: RsvpRoutes.index().url },
    ],
};
