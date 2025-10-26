import { create } from "zustand";

export type BrainLobe = 'frontal' | 'parietal' | 'temporal' | 'occipital' | null;
export type Section = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

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

    // Sound
    isSoundEnabled: boolean;
    toggleSound: () => void;
}

const useUI = create<UIState>((set) => ({
    // Initial states
    selectedLobe: null,
    hoveredLobe: null,
    currentSection: 'hero',
    scrollProgress: 0,
    isSceneLoaded: true,
    isDarkMode: true,
    isMobileMenuOpen: false,
    isSoundEnabled: false,

    // Actions
    setSelectedLobe: (lobe) => set({ selectedLobe: lobe }),
    setHoveredLobe: (lobe) => set({ hoveredLobe: lobe }),
    setCurrentSection: (section) => set({ currentSection: section }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setSceneLoaded: (loaded) => set({ isSceneLoaded: loaded }),
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
}));

export default useUI;