<?php

namespace App\Support;

use Illuminate\Support\Facades\Vite;
use RuntimeException;

final class InvitationAssets
{
    public const COVER_IMAGE_SOURCE = 'resources/images/foto-mempelai/foto-3.jpeg';

    public const FAVICON_SOURCE = 'resources/images/foto-mempelai/foto-3.webp';

    public const SHARE_IMAGE_SOURCE = 'resources/images/share/undangan-aziz-isma.jpg';

    private const STYLE_SOURCE = 'resources/css/undangan/style.css';

    private const COMPAT_STYLE_SOURCE = 'resources/css/undangan/compat.css';

    public static function coverImageUrl(): string
    {
        return Vite::asset(self::COVER_IMAGE_SOURCE);
    }

    public static function faviconUrl(): string
    {
        return Vite::asset(self::FAVICON_SOURCE);
    }

    public static function shareImageUrl(): string
    {
        return Vite::asset(self::SHARE_IMAGE_SOURCE);
    }

    /** @return array{style: string, compat: string} */
    public static function styleUrls(): array
    {
        return [
            'style' => Vite::asset(self::STYLE_SOURCE),
            'compat' => Vite::asset(self::COMPAT_STYLE_SOURCE),
        ];
    }

    public static function previewVersion(): string
    {
        $viewHash = hash_file('sha256', resource_path('views/app.blade.php'));

        if ($viewHash === false) {
            throw new RuntimeException('Unable to generate the invitation preview version.');
        }

        return substr(hash('sha256', self::shareImageUrl().'|'.$viewHash), 0, 12);
    }
}
