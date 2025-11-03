import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BrainLobe = 'frontal' | 'parietal' | 'temporal' | 'occipital' | null;
export type Section = 'hero' | 'about' | 'skills' | 'projects' | 'contact';
export type TransitionPhase = 'idle' | 'dissolving' | 'gathering';
export type Language = 'tr' | 'en';

interface UIState {
    // Lobe Section
    selectedLobe: BrainLobe;
    hoveredLobe: BrainLobe;
    setSelectedLobe: (lobe: BrainLobe) => void;
    setHoveredLobe: (lobe: BrainLobe) => void;

    // Section tracking
    currentSection: Section;
    setCurrentSection: (section: Section) => void;

    // Scroll progress
    scrollProgress: number;
    setScrollProgress: (progress: number) => void;

    // 3D Loading State
    isSceneLoaded: boolean;
    setSceneLoaded: (loaded: boolean) => void;

    // Theme
    isDarkMode: boolean;
    toggleTheme: () => void;

    // Mobile menu
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;

    // Language
    language: Language;
    setLanguage: (lang: Language) => void;

    // Scroll snap
    isTransitioning: boolean;
    setTransitioning: (isTransitioning: boolean) => void;
    transitionPhase: TransitionPhase;
    setTransitionPhase: (phase: TransitionPhase) => void;
}

const useUI = create<UIState>()(
    persist(
        (set) => ({
            // Initial states
            selectedLobe: null,
            hoveredLobe: null,
            currentSection: 'hero',
            scrollProgress: 0,
            isSceneLoaded: true,
            isDarkMode: true,
            language: 'tr',
            isMobileMenuOpen: false,
            isTransitioning: false,
            transitionPhase: 'idle',

            // Actions
            setSelectedLobe: (lobe) => set({ selectedLobe: lobe }),
            setHoveredLobe: (lobe) => set({ hoveredLobe: lobe }),
            setCurrentSection: (section) => set({ currentSection: section }),
            setScrollProgress: (progress) => set({ scrollProgress: progress }),
            setSceneLoaded: (loaded) => set({ isSceneLoaded: loaded }),
            toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            setLanguage: (lang) => set({ language: lang }),
            toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
            setTransitioning: (isTransitioning) => set({ isTransitioning }),
            setTransitionPhase: (phase) => set({ transitionPhase: phase }),
        }),
        {
            name: 'portfolio-storage',
            partialize: (state) => ({
                isDarkMode: state.isDarkMode,
                language: state.language
            }),
        }
    )
);

export default useUI;