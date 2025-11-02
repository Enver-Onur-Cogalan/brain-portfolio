import { useEffect, useCallback, useRef } from 'react';
import useUI, { type Section } from '../store/useUI';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const sections: Section[] = ['hero', 'about', 'skills', 'projects', 'contact'];

const DISSOLVE_DURATION = 400;  // dağılma + aşağı düşme
const GATHER_DURATION = 300;    // toplanma
const SCROLL_DURATION = 1.0;    // scroll

const SCROLL_DEBOUNCE = 100;

export const useScrollTransition = (containerRef: React.RefObject<HTMLElement>) => {
    const {
        currentSection,
        setCurrentSection,
        isTransitioning,
        setTransitioning,
        setTransitionPhase
    } = useUI();

    const isTransitioningRef = useRef(isTransitioning);
    const currentSectionRef = useRef(currentSection);
    const lastScrollTime = useRef(0);

    useEffect(() => {
        isTransitioningRef.current = isTransitioning;
    }, [isTransitioning]);

    useEffect(() => {
        currentSectionRef.current = currentSection;
    }, [currentSection]);

    const startTransition = useCallback((nextIndex: number) => {
        const now = performance.now();

        if (now - lastScrollTime.current < SCROLL_DEBOUNCE) {
            return;
        }
        lastScrollTime.current = now;

        setTransitioning(true);

        // FAZ 1: DISSOLVING
        setTransitionPhase('dissolving');

        // FAZ 2: SCROLL
        setTimeout(() => {
            const nextSection = sections[nextIndex];
            const sectionElement = document.getElementById(nextSection);

            if (containerRef.current && sectionElement) {
                setCurrentSection(nextSection);

                gsap.to(containerRef.current, {
                    scrollTo: { y: sectionElement.offsetTop },
                    duration: SCROLL_DURATION,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        setTransitionPhase('gathering');
                    }
                });
            }

            // FAZ 3: GATHERING
            setTimeout(() => {
                setTimeout(() => {
                    setTransitionPhase('idle');
                    setTransitioning(false);
                }, GATHER_DURATION);
            }, SCROLL_DURATION * 1000);

        }, DISSOLVE_DURATION);
    }, [setTransitioning, setTransitionPhase, containerRef, setCurrentSection]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Ref üzerinden anlık kilit kontrolü
            if (isTransitioningRef.current) return;

            const isScrollingDown = e.deltaY > 0;
            const currentIndex = sections.indexOf(currentSectionRef.current);
            let nextIndex = -1;

            if (isScrollingDown && currentIndex < sections.length - 1) {
                nextIndex = currentIndex + 1;
            } else if (!isScrollingDown && currentIndex > 0) {
                nextIndex = currentIndex - 1;
            }

            if (nextIndex !== -1) {
                isTransitioningRef.current = true;
                startTransition(nextIndex);
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => container.removeEventListener('wheel', handleWheel);
    }, [containerRef, startTransition]);

    const scrollToSection = useCallback((section: Section) => {
        const nextIndex = sections.indexOf(section);

        if (nextIndex === -1) return;
        if (sections[nextIndex] === currentSectionRef.current) return;
        if (isTransitioningRef.current) return;

        isTransitioningRef.current = true;
        startTransition(nextIndex);
    }, [startTransition]);

    return { scrollToSection };
};