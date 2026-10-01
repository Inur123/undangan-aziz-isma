<?php

namespace App\Models;

use Database\Factories\GuestFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    /** @use HasFactory<GuestFactory> */
    use HasFactory;

    /** @var list<string> */
    protected $fillable = [
        'name',
    ];

    public function getInvitationUrl(): string
    {
        return route('undangan', [
            'to' => $this->name,
        ]);
    }

    public function getShareMessage(): string
    {
        return "Kepada Yth.\nBapak/Ibu/Saudara/i\n*{$this->name}*\n\n"
            ."---\n\n"
            ."Assalamualaikum Warahmatullahi Wabarakatuh\n\n"
            ."Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus rekan, untuk menghadiri pernikahan kami pada Minggu 01 November 2026.\n\n"
            ."Berikut link undangan kami, untuk info lengkap dari acara, bisa kunjungi :\n\n"
            .$this->getInvitationUrl()."\n\n"
            ."Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\n"
            ."Wassalamualaikum Warahmatullahi Wabarakatuh\n\n"
            ."Terima Kasih\n\n"
            ."Hormat kami,\n"
            .'Isma & Aziz';
    }

    public function getWhatsappShareUrl(): string
    {
        $encodedMessage = rawurlencode($this->getShareMessage());

        return "https://api.whatsapp.com/send?text={$encodedMessage}";
    }
}
