import { type RefObject } from "react";
import { type BrainLobe, type Section } from "../store/useUI";

// Lobe to Section mapping
const lobeToSection: Record<NonNullable<BrainLobe>, Section> = {
    frontal: 'about',
    parietal: 'skills',
    temporal: 'projects',
    occipital: 'contact',
};

// Section to Lobe mapping
const sectionToLobe: Record<Exclude<Section, 'hero'>, BrainLobe> = {
    about: 'frontal',
    skills: 'parietal',
    projects: 'temporal',
    contact: 'occipital',
};

// Lobe metada
const lobeMetadata = {
    frontal: {
        name: 'Frontal Lobe',
        description: 'Problem Solving & Planning',
        color: '#ec4899',
        position: [0, 0.5, 1] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
    },
    parietal: {
        name: 'Parietal Lobe',
        description: 'Data Processing & Analysis',
        color: '#8b5cf6',
        position: [0, 1.5, -0.5] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
    },
    temporal: {
        name: 'Temporal Lobe',
        description: 'Memory & Experience',
        color: '#3b82f6',
        position: [-1.5, -0.5, 0] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number],
    },
    occipital: {
        name: 'Occipital Lobe',
        description: 'Visual Processing & Design',
        color: '#10b981',
        position: [0, 0, -1.5] as [number, number, number],
        rotation: [0, Math.PI, 0] as [number, number, number],
    },
};

export const useLobeMapping = (scrollContainerRef: RefObject<HTMLElement>) => {
    const getSectionForLobe = (lobe: BrainLobe): Section | null => {
        if (!lobe) return null;
        return lobeToSection[lobe];
    };

    const getLobeForSection = (section: Section): BrainLobe => {
        if (section === 'hero') return null;
        return sectionToLobe[section];
    };

    const getLobeMetadata = (lobe: BrainLobe) => {
        if (!lobe) return null;
        return lobeMetadata[lobe];
    };

    const scrollToSection = (section: Section) => {
        const container = scrollContainerRef.current;
        const element = document.getElementById(section);
        if (element && container) {

            const containerTop = container.getBoundingClientRect().top;
            const elementTop = element.getBoundingClientRect().top;

            const relativeTop = elementTop - containerTop;

            const top = container.scrollTop + relativeTop;

            container.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    };

    const scrollToLobe = (lobe: BrainLobe) => {
        const section = getSectionForLobe(lobe);
        if (section) {
            scrollToSection(section);
        }
    };

    return {
        getSectionForLobe,
        getLobeForSection,
        getLobeMetadata,
        scrollToSection,
        scrollToLobe,
        lobeMetadata,
    };
};