import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ContentStore, AboutContent, SkillCategory, Project } from '../types/content';

const defaultContent: ContentStore = {
    about: {
        p1: {
            en: 'With a background in biology and a passion for technology, I bring a unique perspective to software development. Just as the frontal lobe orchestrates complex decision-making and planning, I approach each project with strategic thinking and creative problem-solving.',
            tr: 'Biyoloji geçmişim ve teknolojiye olan tutkumla, yazılım geliştirmeye benzersiz bir bakış açısı getiriyorum. Frontal lob, karmaşık karar verme ve planlamayı yönettiği gibi, her projeye stratejik düşünme ve yaratıcı problem çözme ile yaklaşıyorum.'
        },
        p2: {
            en: 'My journey from studying cellular mechanisms to building digital ecosystems has taught me that the best solutions often come from understanding systems at multiple levels - from the microscopic details to the big picture.',
            tr: 'Hücresel mekanizmaları incelemekten dijital ekosistemler inşa etmeye uzanan yolculuğum, en iyi çözümlerin genellikle sistemleri birden fazla seviyede anlamaktan geldiğini öğretti - mikroskobik detaylardan büyük resme kadar.'
        },
        metrics: [
            {
                icon: 'Award',
                label: { en: 'Years of Experience', tr: 'Yıllık Deneyim' },
                value: '5+'
            },
            {
                icon: 'Target',
                label: { en: 'Projects Completed', tr: 'Tamamlanan Proje' },
                value: '50+'
            },
            {
                icon: 'Coffee',
                label: { en: 'Cups of Coffee', tr: 'Kahve Fincanı' },
                value: '∞'
            }
        ]
    },

    skills: [
        {
            id: '1',
            icon: 'Code',
            title: { en: 'Frontend Development', tr: 'Frontend Geliştirme' },
            color: 'from-blue-500 to-cyan-500',
            skills: [
                { name: 'React/Next.js', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'Three.js/R3F', level: 75 },
                { name: 'Tailwind CSS', level: 95 }
            ]
        },
        {
            id: '2',
            icon: 'Database',
            title: { en: 'Backend & Database', tr: 'Backend ve Veritabanı' },
            color: 'from-purple-500 to-pink-500',
            skills: [
                { name: 'Node.js/Express', level: 80 },
                { name: 'PostgreSQL', level: 75 },
                { name: 'MongoDB', level: 70 },
                { name: 'GraphQL', level: 65 }
            ]
        },
        {
            id: '3',
            icon: 'Beaker',
            title: { en: 'Biology & Science', tr: 'Biyoloji ve Bilim' },
            color: 'from-green-500 to-emerald-500',
            skills: [
                { name: 'Molecular Biology', level: 85 },
                { name: 'Bioinformatics', level: 70 },
                { name: 'Data Analysis', level: 80 },
                { name: 'Scientific Writing', level: 90 }
            ]
        },
        {
            id: '4',
            icon: 'Cpu',
            title: { en: 'Tools & Technologies', tr: 'Araçlar ve Teknolojiler' },
            color: 'from-orange-500 to-red-500',
            skills: [
                { name: 'Git/GitHub', level: 90 },
                { name: 'Docker', level: 70 },
                { name: 'AWS/Cloud', level: 65 },
                { name: 'CI/CD', level: 75 }
            ]
        }
    ],
    projects: [
        {
            id: '1',
            title: { en: 'BioSim Engine', tr: 'BioSim Motoru' },
            description: {
                en: 'A 3D cellular simulation platform built with Three.js for visualizing biological processes in real-time.',
                tr: 'Biyolojik süreçleri gerçek zamanlı görselleştirmek için Three.js ile oluşturulmuş 3D hücresel simülasyon platformu.'
            },
            tags: ['Three.js', 'WebGL', 'React', 'Biology'],
            github: 'https://github.com',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: '2',
            title: { en: 'Neural Network Visualizer', tr: 'Sinir Ağı Görselleştiricisi' },
            description: {
                en: 'Interactive tool for understanding deep learning architectures through biological neuron metaphors.',
                tr: 'Derin öğrenme mimarilerini biyolojik nöron metaforları ile anlama aracı.'
            },
            tags: ['TensorFlow.js', 'D3.js', 'Python', 'ML'],
            github: 'https://github.com',
            color: 'from-purple-500 to-pink-500'
        }
    ]
};

interface ContentState extends ContentStore {
    updateAbout: (about: AboutContent) => void;
    updateSkills: (skills: SkillCategory[]) => void;
    updateProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    removeProject: (id: string) => void;
    addSkillCategory: (category: SkillCategory) => void;
    removeSkillCategory: (id: string) => void;
    loadFromServer: () => Promise<void>;
    saveToServer: (adminKey: string) => Promise<boolean>;
}

export const useContent = create<ContentState>()(
    persist(
        (set, get) => ({
            ...defaultContent,

            updateAbout: (about) => set({ about }),
            updateSkills: (skills) => set({ skills }),
            updateProjects: (projects) => set({ projects }),

            addProject: (project) =>
                set((state) => ({ projects: [...state.projects, project] })),

            removeProject: (id) =>
                set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

            addSkillCategory: (category) =>
                set((state) => ({ skills: [...state.skills, category] })),

            removeSkillCategory: (id) =>
                set((state) => ({ skills: state.skills.filter(s => s.id !== id) })),

            loadFromServer: async () => {
                try {
                    const res = await fetch('/api/content', { method: 'GET' });
                    if (!res.ok) {
                        const text = await res.text().catch(() => '');
                        console.error('[loadFromServer] Failed', res.status, text || res.statusText);

                        if (res.status === 404) console.error('Hint: Ensure. file exist at /api/content.ts (repo root).');
                        if (res.status === 500) console.error('Hint: Check UPSTASH env vars on Vercel and redeploy.');
                        if (res.status === 401) console.error('Hint: ADMIN_SECRET mismatch or missing.');

                        return;
                    };

                    const data = await res.json();
                    if (data && data.about && data.skills && data.projects) {
                        set({
                            about: data.about,
                            skills: data.skills,
                            projects: data.projects,
                        });
                    } else {
                        console.warn('[loadFromServer] Response schema unexpected:', data);
                    }
                } catch (e) {
                    console.error('[loadFromServer] Network/Unexpected error', e);
                }
            },

            saveToServer: async (adminKey: string) => {
                try {
                    const state = get();
                    const res = await fetch('/api/content', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-admin-key': adminKey,
                        },
                        body: JSON.stringify({
                            about: state.about,
                            skills: state.skills,
                            projects: state.projects,
                        }),
                    });
                    if (!res.ok) {
                        const text = await res.text().catch(() => '');
                        console.error('[loadFromServer] Failed', res.status, text || res.statusText);

                        if (res.status === 404) console.error('Hint: Ensure. file exist at /api/content.ts (repo root).');
                        if (res.status === 500) console.error('Hint: Check UPSTASH env vars on Vercel and redeploy.');
                        if (res.status === 401) console.error('Hint: ADMIN_SECRET mismatch or missing.');

                        return false;
                    };

                    return true;
                } catch (e) {
                    console.error('[loadFromServer] Network/Unexpected error', e);
                    return false;
                }
            }
        }),
        {
            name: 'portfolio-content',
        }
    )
);

