import { useEffect, useState, useRef } from 'react';

export type ThemeTransitionPhase = 'idle' | 'blurring' | 'changing' | 'unblurring' | 'complete';

interface ThemeTransition {
    phase: ThemeTransitionPhase;
    progress: number;
    blurAmount: number;
    opacity: number;
}

export function useThemeTransition(isDarkMode: boolean) {
    const [transition, setTransition] = useState<ThemeTransition>({
        phase: 'idle',
        progress: 0,
        blurAmount: 0,
        opacity: 1
    });
    const [prevTheme, setPrevTheme] = useState(isDarkMode);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        // Eğer zaten animasyon çalışıyorsa, yeni animasyon başlatma
        if (isAnimatingRef.current) return;

        // Tema değişmediyse animasyon yapma
        if (isDarkMode === prevTheme) return;

        // Animasyon başladı
        isAnimatingRef.current = true;

        let progress = 0;
        const totalDuration = 800; // 800ms total
        const fps = 60;
        const increment = 1 / (totalDuration / 1000 * fps);
        let animationFrame: number;

        const animate = () => {
            progress += increment;

            if (progress <= 0.3) {
                // Phase 1: Blurring (0-30%)
                const blurProgress = progress / 0.3;
                setTransition({
                    phase: 'blurring',
                    progress: blurProgress,
                    blurAmount: blurProgress * 10,
                    opacity: 1 - (blurProgress * 0.3)
                });
            } else if (progress <= 0.5) {
                // Phase 2: Changing theme at max blur (30-50%)
                setTransition({
                    phase: 'changing',
                    progress: 0.5,
                    blurAmount: 10,
                    opacity: 0.7
                });
            } else if (progress < 1) {
                // Phase 3: Unblurring (50-100%)
                const unblurProgress = (progress - 0.5) / 0.5;
                setTransition({
                    phase: 'unblurring',
                    progress: unblurProgress,
                    blurAmount: 10 - (unblurProgress * 10),
                    opacity: 0.7 + (unblurProgress * 0.3)
                });
            } else {
                // Animation complete
                clearTimeout(animationFrame);
                setTransition({
                    phase: 'complete',
                    progress: 1,
                    blurAmount: 0,
                    opacity: 1
                });

                // Reset to idle after a brief delay
                setTimeout(() => {
                    setTransition({
                        phase: 'idle',
                        progress: 0,
                        blurAmount: 0,
                        opacity: 1
                    });
                    setPrevTheme(isDarkMode);
                    isAnimatingRef.current = false;
                }, 50);
                return;
            }

            // Continue animation
            animationFrame = window.setTimeout(animate, 1000 / fps);
        };

        // Start animation
        animate();

        // Cleanup
        return () => {
            if (animationFrame) {
                clearTimeout(animationFrame);
            }
            isAnimatingRef.current = false;
        };
    }, [isDarkMode, prevTheme]);

    return transition;
}

// Blur overlay style generator
export function getBlurOverlayStyle(blurAmount: number, opacity: number) {
    if (blurAmount === 0) return {};

    return {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        backgroundColor: `rgba(0, 0, 0, ${(1 - opacity) * 0.1})`,
        pointerEvents: 'none' as const,
        zIndex: 45,
    };
}