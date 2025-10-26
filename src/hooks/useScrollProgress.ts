import { useEffect, useCallback, type RefObject } from "react";
import useUI from "../store/useUI";

// DEĞİŞİKLİK: Hook artık bir "ref" alacak.
export const useScrollProgress = (scrollContainerRef: RefObject<HTMLElement>) => {
    const { setScrollProgress, setCurrentSection } = useUI();

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // DEĞİŞİKLİK: "window" yerine "container" kullanıyoruz.
        const scrollY = container.scrollTop;
        const containerHeight = container.clientHeight;
        const documentHeight = container.scrollHeight;

        const progress = scrollY / (documentHeight - containerHeight);
        setScrollProgress(isNaN(progress) ? 0 : Math.min(Math.max(progress, 0), 1));

        const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                // DEĞİŞİKLİK: Konum hesaplaması hala window'a göre yapılabilir
                // ama ideal olanı container'a göre yapmak. Şimdilik böyle bırakalım.
                const rect = element.getBoundingClientRect();
                const elementMiddle = rect.top + rect.height / 2;

                if (elementMiddle >= 0 && elementMiddle <= containerHeight) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setCurrentSection(section as any);
                    break;
                }
            }
        }
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

    // Bu fonksiyonları şimdilik devre dışı bırakıyoruz çünkü artık window'u kaydırmıyoruz.
    return {
        // scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        // scrollToBottom: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }),
    };
};