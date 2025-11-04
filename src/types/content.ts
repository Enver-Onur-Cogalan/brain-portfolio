export interface AboutContent {
    p1: {
        en: string;
        tr: string;
    };
    p2: {
        en: string;
        tr: string;
    };
    metrics: Array<{
        icon: string; // 'Award', 'Target', 'Coffee'
        label: {
            en: string;
            tr: string;
        };
        value: string;
    }>;
}

export interface SkillCategory {
    id: string;
    icon: string; // 'Code', 'Database', 'Beaker', 'Cpu'
    title: {
        en: string;
        tr: string;
    };
    color: string; // gradient class
    skills: Array<{
        name: string;
        level: number;
    }>;
}

export interface Project {
    id: string;
    title: {
        en: string;
        tr: string;
    };
    description: {
        en: string;
        tr: string;
    };
    tags: string[];
    github: string;
    demo: string;
    color: string; // gradient class
}

export interface ContentStore {
    about: AboutContent;
    skills: SkillCategory[];
    projects: Project[];
}