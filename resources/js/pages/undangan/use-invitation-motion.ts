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
        let observer: IntersectionObserver | undefined;

        const reveal = (element: Element) => {
            element.classList.add('is-visible');
            observer?.unobserve(element);
        };
        const configureMotion = () => {
            observer?.disconnect();
            root.classList.remove('js-ready');

            if (preference.matches || !('IntersectionObserver' in window)) {
                elements.forEach(reveal);
                return;
            }

            root.classList.add('js-ready');
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
        const onFocus = (event: FocusEvent) => {
            const element =
                event.target instanceof Element
                    ? event.target.closest('.reveal')
                    : null;
            if (element) reveal(element);
        };

        configureMotion();
        root.addEventListener('focusin', onFocus);
        if (typeof preference.addEventListener === 'function') {
            preference.addEventListener('change', configureMotion);
        } else {
            preference.addListener(configureMotion);
        }

        return () => {
            observer?.disconnect();
            root.classList.remove('js-ready');
            root.removeEventListener('focusin', onFocus);
            if (typeof preference.removeEventListener === 'function') {
                preference.removeEventListener('change', configureMotion);
            } else {
                preference.removeListener(configureMotion);
            }
        };
    }, [isOpen, rootRef]);
}
