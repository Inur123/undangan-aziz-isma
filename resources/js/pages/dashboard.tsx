import { Head, Link } from '@inertiajs/react';
import { MessageSquareHeart, Users, UserCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as GuestRoutes from '@/routes/guests';
import * as RsvpRoutes from '@/routes/rsvps';
import { dashboard } from '@/routes';

interface Stats {
    total_guests: number;
    total_rsvps: number;
    hadir: number;
    tidak: number;
    belum: number;
}

export default function Dashboard({ stats }: { stats: Stats }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Dashboard Undangan
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Ringkasan undangan pernikahan Anda.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Tamu
                            </CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_guests}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                tamu terdaftar
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total RSVP
                            </CardTitle>
                            <MessageSquareHeart className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_rsvps}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                ucapan masuk
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Hadir
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
                                Belum Konfirmasi
                            </CardTitle>
                            <Clock className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">
                                {stats.belum + stats.tidak}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                belum / tidak hadir
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Kelola Tamu
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col gap-3">
                            <p className="text-muted-foreground flex-1 text-sm">
                                Tambah nama tamu undangan dan bagikan link
                                undangan personal melalui WhatsApp.
                            </p>
                            <Button asChild className="mt-auto">
                                <Link href={GuestRoutes.index().url}>
                                    <Users className="mr-2 h-4 w-4" />
                                    Kelola Tamu
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Lihat RSVP & Ucapan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col gap-3">
                            <p className="text-muted-foreground flex-1 text-sm">
                                Pantau konfirmasi kehadiran dan baca ucapan doa
                                dari tamu undangan.
                            </p>
                            <Button
                                asChild
                                variant="outline"
                                className="mt-auto"
                            >
                                <Link href={RsvpRoutes.index().url}>
                                    <MessageSquareHeart className="mr-2 h-4 w-4" />
                                    Lihat RSVP
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
    ],
};
