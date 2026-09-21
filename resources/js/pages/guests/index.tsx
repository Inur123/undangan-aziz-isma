import { Head, useForm } from '@inertiajs/react';
import {
    Copy,
    Plus,
    Trash2,
    ExternalLink,
    MessageCircle,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginatedData } from '@/components/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { dashboard } from '@/routes';
import * as GuestRoutes from '@/routes/guests';

interface Guest {
    id: number;
    name: string;
    invitation_url: string;
    whatsapp_url: string;
    share_message: string;
}

export default function GuestsIndex({
    guests,
}: {
    guests: PaginatedData<Guest>;
}) {
    const [addOpen, setAddOpen] = useState(false);
    const [copied, setCopied] = useState<number | null>(null);
    const deleteForm = useForm({});
    const form = useForm({ name: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(GuestRoutes.store().url, {
            onSuccess: () => {
                form.reset();
                setAddOpen(false);
            },
        });
    }

    async function copyLink(guest: Guest) {
        try {
            await navigator.clipboard.writeText(
                guest.share_message || guest.invitation_url,
            );
            setCopied(guest.id);
            setTimeout(() => setCopied(null), 2000);
        } catch {
            setCopied(null);
        }
    }

    function handleDelete(guest: Guest) {
        deleteForm.delete(GuestRoutes.destroy(guest.id).url);
    }

    return (
        <>
            <Head title="Tamu Undangan" />
            <div className="flex w-full flex-col gap-6 p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Tamu Undangan
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Kelola daftar tamu dan bagikan link undangan.
                        </p>
                    </div>

                    <Dialog open={addOpen} onOpenChange={setAddOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Tamu
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Tamu Undangan</DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={submit}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="name">Nama Tamu *</Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData('name', e.target.value)
                                        }
                                        placeholder="Contoh: Bapak Ahmad Fauzi"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-destructive text-sm">
                                            {form.errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setAddOpen(false)}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                    >
                                        {form.processing
                                            ? 'Menyimpan...'
                                            : 'Simpan'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="gap-0 overflow-hidden rounded-md border p-0 shadow-sm">
                    <CardHeader className="bg-muted/20 border-b px-4 py-3">
                        <CardTitle className="text-sm font-medium">
                            Daftar Tamu (Total {guests.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {guests.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Users className="text-muted-foreground mb-3 h-10 w-10" />
                                <h3 className="text-sm font-semibold">
                                    Belum ada tamu
                                </h3>
                                <p className="text-muted-foreground mt-1 max-w-sm text-xs">
                                    Daftar tamu Anda masih kosong. Klik tombol
                                    "Tambah Tamu" di atas untuk mulai membuat
                                    daftar.
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
                                            <TableHead className="h-10 w-[280px] text-xs">
                                                Nama Tamu
                                            </TableHead>
                                            <TableHead className="h-10 text-xs">
                                                Link URL
                                            </TableHead>
                                            <TableHead className="h-10 pr-4 text-right text-xs">
                                                Aksi
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {guests.data.map((guest, index) => (
                                            <TableRow
                                                key={guest.id}
                                                className="h-12"
                                            >
                                                <TableCell className="text-muted-foreground py-2 pl-4 text-xs">
                                                    {(guests.from || 1) + index}
                                                </TableCell>
                                                <TableCell className="py-2 text-sm font-medium">
                                                    {guest.name}
                                                </TableCell>
                                                <TableCell className="py-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <code className="bg-muted/50 border-border/50 rounded border px-1.5 py-0.5 text-xs">
                                                            {guest.invitation_url.replace(
                                                                window.location
                                                                    .origin,
                                                                '',
                                                            )}
                                                        </code>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-foreground h-6 w-6"
                                                            onClick={() =>
                                                                copyLink(guest)
                                                            }
                                                            title="Salin Teks Undangan"
                                                        >
                                                            {copied ===
                                                            guest.id ? (
                                                                <span className="text-xs font-bold text-green-600">
                                                                    ✓
                                                                </span>
                                                            ) : (
                                                                <Copy className="h-3 w-3" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-2 pr-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            asChild
                                                            className="h-7 px-2 text-[11px] font-semibold"
                                                        >
                                                            <a
                                                                href={
                                                                    guest.invitation_url
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <ExternalLink className="mr-1 h-3 w-3" />
                                                                Buka
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-7 bg-green-600 px-2 text-[11px] font-semibold hover:bg-green-700"
                                                            asChild
                                                        >
                                                            <a
                                                                href={`https://wa.me/?text=${encodeURIComponent(guest.share_message)}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <MessageCircle className="mr-1 h-3 w-3" />
                                                                Kirim WA
                                                            </a>
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7"
                                                                    disabled={
                                                                        deleteForm.processing
                                                                    }
                                                                    title="Hapus"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Hapus
                                                                        Data
                                                                        Tamu?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Apakah
                                                                        Anda
                                                                        yakin
                                                                        ingin
                                                                        menghapus{' '}
                                                                        <strong>
                                                                            "
                                                                            {
                                                                                guest.name
                                                                            }
                                                                            "
                                                                        </strong>
                                                                        ? Data
                                                                        yang
                                                                        sudah
                                                                        dihapus
                                                                        tidak
                                                                        bisa
                                                                        dikembalikan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>
                                                                        Batal
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                guest,
                                                                            )
                                                                        }
                                                                        className="bg-destructive hover:bg-destructive/90"
                                                                    >
                                                                        Hapus
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {guests.data.length > 0 && <Pagination links={guests.links} />}
            </div>
        </>
    );
}

GuestsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Tamu Undangan', href: GuestRoutes.index().url },
    ],
};
