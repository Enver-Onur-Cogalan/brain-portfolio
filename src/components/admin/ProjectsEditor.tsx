import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ExternalLink, Github, FolderOpen } from 'lucide-react';
import { useContent } from '../../store/useContent';
import LanguageToggle from './LanguageToggle';
import useUI from '../../store/useUI';
import type { Project } from '../../types/content';

const colorOptions = [
    { value: 'from-blue-500 to-cyan-500', label: 'Blue → Cyan', preview: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { value: 'from-purple-500 to-pink-500', label: 'Purple → Pink', preview: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { value: 'from-green-500 to-emerald-500', label: 'Green → Emerald', preview: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { value: 'from-orange-500 to-red-500', label: 'Orange → Red', preview: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { value: 'from-indigo-500 to-purple-500', label: 'Indigo → Purple', preview: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
    { value: 'from-pink-500 to-rose-500', label: 'Pink → Rose', preview: 'bg-gradient-to-r from-pink-500 to-rose-500' }
];

interface Props {
    onChange: () => void;
}

const ProjectsEditor = ({ onChange }: Props) => {
    const { projects, updateProjects, addProject, removeProject } = useContent();
    const { language } = useUI();
    const [localProjects, setLocalProjects] = useState<Project[]>(projects);
    const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set([projects[0]?.id]));

    const toggleProject = (id: string) => {
        const newExpanded = new Set(expandedProjects);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedProjects(newExpanded);
    };

    const handleProjectUpdate = (
        id: string,
        field: keyof Project,
        value: any
    ) => {
        const updated = localProjects.map(proj =>
            proj.id === id ? { ...proj, [field]: value } : proj
        );
        setLocalProjects(updated);
        updateProjects(updated);
        onChange();
    };

    const handleTitleUpdate = (id: string, lang: 'en' | 'tr', value: string) => {
        const updated = localProjects.map(proj => {
            if (proj.id === id) {
                return {
                    ...proj,
                    title: { ...proj.title, [lang]: value }
                };
            }
            return proj;
        });
        setLocalProjects(updated);
        updateProjects(updated);
        onChange();
    };

    const handleDescriptionUpdate = (id: string, lang: 'en' | 'tr', value: string) => {
        const updated = localProjects.map(proj => {
            if (proj.id === id) {
                return {
                    ...proj,
                    description: { ...proj.description, [lang]: value }
                };
            }
            return proj;
        });
        setLocalProjects(updated);
        updateProjects(updated);
        onChange();
    };

    const handleTagsUpdate = (id: string, tagsString: string) => {
        const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
        handleProjectUpdate(id, 'tags', tags);
    };

    const handleAddProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: { en: 'New Project', tr: 'Yeni Proje' },
            description: {
                en: 'Project description here...',
                tr: 'Proje açıklaması buraya...'
            },
            tags: ['React', 'TypeScript'],
            github: 'https://github.com',
            color: 'from-blue-500 to-cyan-500'
        };
        addProject(newProject);
        setLocalProjects([...localProjects, newProject]);
        setExpandedProjects(new Set([...expandedProjects, newProject.id]));
        onChange();
    };

    const handleRemoveProject = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            removeProject(id);
            setLocalProjects(localProjects.filter(proj => proj.id !== id));
            onChange();
        }
    };

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-white'>Edit Projects Section</h2>
                <LanguageToggle />
            </div>

            {/* Add Project Button */}
            <button
                onClick={handleAddProject}
                className='w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors'
            >
                <Plus className='w-5 h-5' />
                Add New Project
            </button>

            {/* Projects List */}
            <div className='space-y-4'>
                <AnimatePresence>
                    {localProjects.map((project, index) => {
                        const isExpanded = expandedProjects.has(project.id);

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className='bg-gray-800 border border-gray-700 rounded-lg overflow-hidden'
                            >
                                {/* Project Header */}
                                <div className='p-4 bg-gray-900/50 flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center`}>
                                            <FolderOpen className='w-6 h-6 text-white' />
                                        </div>
                                        <div>
                                            <h3 className='text-white font-semibold'>
                                                {project.title[language]}
                                            </h3>
                                            <p className='text-xs text-gray-400'>
                                                Project #{index + 1} • {project.tags.length} tags
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button
                                            onClick={() => toggleProject(project.id)}
                                            className='px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors'
                                        >
                                            {isExpanded ? 'Collapse' : 'Expand'}
                                        </button>
                                        <button
                                            onClick={() => handleRemoveProject(project.id)}
                                            className='p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className='p-4 space-y-4'
                                        >
                                            {/* Title */}
                                            <div>
                                                <input
                                                    type='text'
                                                    value={project.title[language]}
                                                    onChange={(e) => handleTitleUpdate(project.id, language, e.target.value)}
                                                    className='w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-brain-500 outline-none'
                                                />
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <label className='block text-sm text-gray-400 mb-2'>
                                                    Description ({language.toLowerCase()})
                                                </label>
                                                <textarea
                                                    value={project.description[language]}
                                                    onChange={(e) => handleDescriptionUpdate(project.id, language, e.target.value)}
                                                    rows={3}
                                                    className='w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-brain-500 outline-none resize-none'
                                                />
                                            </div>

                                            {/* Tags */}
                                            <div>
                                                <label className='block text-sm text-gray-400 mb-2'>
                                                    Tags (comma separated)
                                                </label>
                                                <input
                                                    type='text'
                                                    value={project.tags.join(', ')}
                                                    onChange={(e) => handleTagsUpdate(project.id, e.target.value)}
                                                    placeholder='React, TypeScript, Node.JS'
                                                    className='w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus: border-brain-500 outline-none'
                                                />
                                                <div className='mt-2 flex flex-wrap gap-2'>
                                                    {project.tags.map((tag, i) => (
                                                        <span key={i} className='px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded'>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Links */}
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <label className='block text-sm text-gray-400 mb-2 flex items-center gap-2'>
                                                        <Github className='w-4 h-4' />
                                                        GitHub URL
                                                    </label>
                                                    <input
                                                        type='url'
                                                        value={project.github}
                                                        onChange={(e) => handleProjectUpdate(project.id, 'github', e.target.value)}
                                                        placeholder='https://github.com/...'
                                                        className='w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-brain-500 outline-none'
                                                    />
                                                </div>
                                            </div>

                                            {/* Color */}
                                            <label className='block text-sm text-gray-400 mb-2'>
                                                Color Theme
                                            </label>
                                            <div className='grid grid-cols-3 gap-2'>
                                                {colorOptions.map(option => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => handleProjectUpdate(project.id, 'color', option.value)}
                                                        className={`p-3 rounded-lg border-2 transition-all ${project.color === option.value
                                                            ? 'border-brain-500'
                                                            : 'border-gray-700 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        <div className={`h-6 roundedd ${option.preview}`} />
                                                        <p className='text-xs text-gray-400 mt-2'>{option.label}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {localProjects.length === 0 && (
                <div className='text-center py-12 text-gray-400'>
                    <FolderOpen className='w-16 h-16 mx-auto mb-4 opacity-50' />
                    <p>No projects yet. Add your first project!</p>
                </div>
            )}
        </div>
    );
};

export default ProjectsEditor;