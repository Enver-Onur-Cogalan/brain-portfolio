import { useEffect, useState } from "react";

export type ThemeTransitionPhase = 'idle' | 'painting' | 'complete';

interface ThemeTransition {
    phase: ThemeTransitionPhase;
    progress: number;
}

export function useThemeTransition(isDarkMode: boolean) {
    const [transition, setTransition] = useState<ThemeTransition>({
        phase: 'idle',
        progress: 0
    });
    const [prevTheme, setPrevTheme] = useState(isDarkMode);

    useEffect(() => {
        if (isDarkMode !== prevTheme) {
            setTransition({ phase: 'painting', progress: 0 });

            let progress = 0;
            const duration = 1000 // 800ms
            const fps = 60;
            const increment = 1 / (duration / 1000 * fps);

            const interval = setInterval(() => {
                progress += increment;
                if (progress >= 1) {
                    progress = 1;
                    clearInterval(interval);
                    setTransition({ phase: 'complete', progress: 1 });

                    setTimeout(() => {
                        setTransition({ phase: 'idle', progress: 0 });
                        setPrevTheme(isDarkMode);
                    }, 100);
                } else {
                    setTransition({ phase: 'painting', progress });
                }
            }, 1000 / fps);

            return () => clearInterval(interval);
        }
    }, [isDarkMode, prevTheme]);

    return transition;
}

// paint overlay generator
export function getPainOverlayStyle(progress: number, isDarkMode: boolean) {
    if (progress === 0) return {};

    const wave1 = Math.sin(progress * Math.PI * 3) * 15;
    const wave2 = Math.cos(progress * Math.PI * 4) * 10;
    const wave3 = Math.sin(progress * Math.PI * 5) * 5;

    // Boya dökülme efekti 
    const clipPath = `polygon(
        0% 0%,
        100% 0%,
        100% ${progress * 100}%,
        ${95 + wave1}% ${progress * 100 + wave1}%,
        ${85 + wave2}% ${progress * 100 + wave2}%,
        ${75 + wave3}% ${progress * 100 + wave3}%,
        ${65 + wave1}% ${progress * 100 - wave1}%,
        ${55 + wave2}% ${progress * 100 + wave2}%,
        ${45 + wave3}% ${progress * 100 - wave3}%,
        ${35 + wave1}% ${progress * 100 + wave1}%,
        ${25 + wave2}% ${progress * 100 - wave2}%,
        ${15 + wave3}% ${progress * 100 + wave3}%,
        ${5 + wave1}% ${progress * 100 - wave1}%,
        0% ${progress * 100}%
    )`;

    return {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDarkMode ? 'rgb(3 7 18)' : 'rgb(249 250 251)',
        clipPath,
        pointerEvents: 'none' as const,
        zIndex: 5,
    };
}