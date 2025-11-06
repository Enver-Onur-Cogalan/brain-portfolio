import { useEffect, useCallback, type RefObject } from "react";
import useUI from "../store/useUI";

// DEĞİŞİKLİK: Hook artık bir "ref" alacak.
export const useScrollProgress = (scrollContainerRef: RefObject<HTMLElement | null>) => {
    const { setScrollProgress, setCurrentSection } = useUI();

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollY = container.scrollTop;
        const containerHeight = container.clientHeight;
        const documentHeight = container.scrollHeight;

        const progress = scrollY / (documentHeight - containerHeight);
        setScrollProgress(isNaN(progress) ? 0 : Math.min(Math.max(progress, 0), 1));

        const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

        const containerTop = container.getBoundingClientRect().top;
        const triggerPoint = container.clientHeight * 0.4;

        let currentBestFit = 'hero'; // Varsayılan olarak hero

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const elementTop = element.getBoundingClientRect().top - containerTop;

                if (elementTop <= triggerPoint) {
                    currentBestFit = section;
                }
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCurrentSection(currentBestFit as any);

    }, [setScrollProgress, setCurrentSection, scrollContainerRef]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        handleScroll();

        // DEĞİŞİKLİK: "window" yerine "container" dinliyoruz.
        container.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true }); // Resize'ı window'da bırakabiliriz

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        }
    }, [handleScroll, scrollContainerRef]);

    return {
        // scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        // scrollToBottom: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }),
    };
};