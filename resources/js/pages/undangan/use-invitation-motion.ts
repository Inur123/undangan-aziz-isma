import { type RefObject, useLayoutEffect } from 'react';

export function useInvitationMotion(
    rootRef: RefObject<HTMLDivElement | null>,
    isOpen: boolean,
): void {
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const preference = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        const elements = Array.from(
            root.querySelectorAll<HTMLElement>('.reveal'),
        );
        const decorations = Array.from(
            root.querySelectorAll<HTMLElement>('[data-motion]'),
        );
        let observer: IntersectionObserver | undefined;
        let motionObserver: IntersectionObserver | undefined;

        const reveal = (element: Element) => {
            element.classList.add('is-visible');
            observer?.unobserve(element);
        };
        const configureMotion = () => {
            observer?.disconnect();
            motionObserver?.disconnect();
            root.classList.remove('js-ready', 'motion-enabled');
            decorations.forEach((element) =>
                element.classList.remove('motion-visible'),
            );

            if (preference.matches || !('IntersectionObserver' in window)) {
                elements.forEach(reveal);
                return;
            }

            root.classList.add('js-ready', 'motion-enabled');
            motionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle(
                        'motion-visible',
                        entry.isIntersecting,
                    );
                });
            });
            decorations
                .filter((element) =>
                    isOpen
                        ? !element.closest('.cover')
                        : element.closest('.cover'),
                )
                .forEach((element) => motionObserver?.observe(element));

            if (!isOpen) {
                elements.forEach((element) =>
                    element.classList.remove('is-visible'),
                );
                return;
            }

            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) reveal(entry.target);
                    });
                },
                { threshold: 0, rootMargin: '0px 0px -24px 0px' },
            );
            elements
                .filter((element) => !element.classList.contains('is-visible'))
                .forEach((element) => observer?.observe(element));
        };
        const onVisibilityChange = () => {
            root.classList.toggle('motion-paused', document.hidden);
        };
        const onFocus = (event: FocusEvent) => {
            const element =
                event.target instanceof Element
                    ? event.target.closest('.reveal')
                    : null;
            if (element) reveal(element);
        };

        configureMotion();
        onVisibilityChange();
        root.addEventListener('focusin', onFocus);
        document.addEventListener('visibilitychange', onVisibilityChange);
        if (typeof preference.addEventListener === 'function') {
            preference.addEventListener('change', configureMotion);
        } else {
            preference.addListener(configureMotion);
        }

        return () => {
            observer?.disconnect();
            motionObserver?.disconnect();
            root.classList.remove(
                'js-ready',
                'motion-enabled',
                'motion-paused',
            );
            decorations.forEach((element) =>
                element.classList.remove('motion-visible'),
            );
            root.removeEventListener('focusin', onFocus);
            document.removeEventListener(
                'visibilitychange',
                onVisibilityChange,
            );
            if (typeof preference.removeEventListener === 'function') {
                preference.removeEventListener('change', configureMotion);
            } else {
                preference.removeListener(configureMotion);
            }
        };
    }, [isOpen, rootRef]);
}
