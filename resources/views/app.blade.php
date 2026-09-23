<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        @if (($page['component'] ?? null) === 'undangan/index')
            <style>
                #invitation-boot-loader {
                    position: fixed;
                    z-index: 10000;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f7f2e8;
                    color: #645b49;
                    opacity: 1;
                    transition: opacity 250ms ease, visibility 250ms ease;
                }

                #invitation-boot-loader.is-hiding {
                    visibility: hidden;
                    pointer-events: none;
                    opacity: 0;
                }

                .invitation-boot-loader__content {
                    text-align: center;
                    opacity: 0;
                    animation: invitation-loader-reveal 180ms ease 220ms forwards;
                }

                .invitation-boot-loader__spinner {
                    width: 38px;
                    height: 38px;
                    margin: 0 auto 14px;
                    border: 1px solid #d7c9a9;
                    border-top-color: #737860;
                    border-radius: 50%;
                    animation: invitation-loader-spin 800ms linear infinite;
                }

                .invitation-boot-loader__label {
                    margin: 0;
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 12px;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                }

                @keyframes invitation-loader-reveal {
                    to {
                        opacity: 1;
                    }
                }

                @keyframes invitation-loader-spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    #invitation-boot-loader {
                        transition: none;
                    }

                    .invitation-boot-loader__content {
                        opacity: 1;
                        animation: none;
                    }

                    .invitation-boot-loader__spinner {
                        animation-duration: 1600ms;
                    }
                }
            </style>

            <script>
                window.setTimeout(function() {
                    var loader = document.getElementById('invitation-boot-loader');

                    if (!loader) {
                        return;
                    }

                    loader.classList.add('is-hiding');

                    window.setTimeout(function() {
                        if (loader.parentNode) {
                            loader.parentNode.removeChild(loader);
                        }
                    }, 300);
                }, 10000);
            </script>
        @endif

        <link rel="icon" href="{{ asset('images/foto-mempelai/1.jpg') }}" type="image/jpeg">
        <link rel="apple-touch-icon" href="{{ asset('images/foto-mempelai/1.jpg') }}">

        {{-- Open Graph Meta Tags untuk WhatsApp/Facebook --}}
        <meta property="og:title" content="Undangan Pernikahan Aziz & Isma" />
        <meta property="og:description" content="Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus rekan, untuk menghadiri acara pernikahan kami." />
        <meta property="og:image" content="{{ asset('images/foto-mempelai/1.jpg') }}" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:type" content="website" />

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>Aziz & Isma</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        @if (($page['component'] ?? null) === 'undangan/index')
            <div id="invitation-boot-loader" role="status" aria-live="polite">
                <div class="invitation-boot-loader__content">
                    <div class="invitation-boot-loader__spinner" aria-hidden="true"></div>
                    <p class="invitation-boot-loader__label">Menyiapkan undangan</p>
                </div>
            </div>
        @endif

        <x-inertia::app />
    </body>
</html>
