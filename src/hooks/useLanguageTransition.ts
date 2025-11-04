import { useEffect, useState } from "react";

export type AnimationDirection = 'up' | 'down' | 'left' | 'right'

interface LanguageTransition {
    isTransitioning: boolean;
    direction: AnimationDirection;
}

export function useLanguageTransition(language: string) {
    const [transition, setTransition] = useState<LanguageTransition>({
        isTransitioning: false,
        direction: 'down'
    });
    const [prevLanguage, setPrevLanguage] = useState(language);

    useEffect(() => {
        if (language !== prevLanguage) {
            setTransition({
                isTransitioning: false,
                direction: language === 'en' ? 'up' : 'down'
            });

            const timer = setTimeout(() => {
                setTransition({
                    isTransitioning: false,
                    direction: language === 'en' ? 'up' : 'down'
                });
                setPrevLanguage(language)
            }, 500); // Animasyon süresi

            return () => clearTimeout(timer);
        }
    }, [language, prevLanguage]);

    return transition;
}

// Text animasyon varyantları
export const textTransitionVariants = {
    // Tr -> En (yukarı)
    exitUp: {
        y: -50,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    enterUp: {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] } }
    },

    // En -> Tr (aşağı)
    exitDown: {
        y: 50,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    enterDown: {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] } }
    }
};
