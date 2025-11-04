import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code, Database, Beaker, Cpu, Plus, Trash2, GripVertical,
    Wrench, Palette, Package, Server, Globe,
    Terminal, Box, Layers, FileCode, Sparkles
} from 'lucide-react';
import { useContent } from '../../store/useContent';
import LanguageToggle from './LanguageToggle';
import useUI from '../../store/useUI';
import type { SkillCategory } from '../../types/content';

const iconMap = {
    Code,
    Database,
    Beaker,
    Cpu,
    Wrench,
    Palette,
    Package,
    Server,
    Globe,
    Terminal,
    Box,
    Layers,
    FileCode,
    Sparkles
};

const colorOptions = [
    { value: 'from-blue-500 to-cyan-500', label: 'Blue → Cyan', preview: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { value: 'from-purple-500 to-pink-500', label: 'Purple → Pink', preview: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { value: 'from-green-500 to-emerald-500', label: 'Green → Emerald', preview: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { value: 'from-orange-500 to-red-500', label: 'Orange → Red', preview: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { value: 'from-indigo-500 to-purple-500', label: 'Indigo → Purple', preview: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
    { value: 'from-pink-500 to-rose-500', label: 'Pink → Rose', preview: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    { value: 'from-yellow-500 to-orange-500', label: 'Yellow → Orange', preview: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { value: 'from-teal-500 to-cyan-500', label: 'Teal → Cyan', preview: 'bg-gradient-to-r from-teal-500 to-cyan-500' },
    { value: 'from-red-500 to-pink-500', label: 'Red → Pink', preview: 'bg-gradient-to-r from-red-500 to-pink-500' },
    { value: 'from-violet-500 to-purple-500', label: 'Violet → Purple', preview: 'bg-gradient-to-r from-violet-500 to-purple-500' },
    { value: 'from-emerald-500 to-teal-500', label: 'Emerald → Teal', preview: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
    { value: 'from-amber-500 to-orange-500', label: 'Amber → Orange', preview: 'bg-gradient-to-r from-amber-500 to-orange-500' },
    { value: 'from-sky-500 to-blue-500', label: 'Sky → Blue', preview: 'bg-gradient-to-r from-sky-500 to-blue-500' },
    { value: 'from-lime-500 to-green-500', label: 'Lime → Green', preview: 'bg-gradient-to-r from-lime-500 to-green-500' },
    { value: 'from-fuchsia-500 to-pink-500', label: 'Fuchsia → Pink', preview: 'bg-gradient-to-r from-fuchsia-500 to-pink-500' },
    { value: 'from-cyan-500 to-blue-500', label: 'Cyan → Blue', preview: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
    { value: 'from-rose-500 to-red-500', label: 'Rose → Red', preview: 'bg-gradient-to-r from-rose-500 to-red-500' },
    { value: 'from-slate-500 to-gray-500', label: 'Slate → Gray', preview: 'bg-gradient-to-r from-slate-500 to-gray-500' },
    { value: 'from-blue-600 to-indigo-600', label: 'Deep Blue → Indigo', preview: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
    { value: 'from-purple-600 to-pink-600', label: 'Deep Purple → Pink', preview: 'bg-gradient-to-r from-purple-600 to-pink-600' }
];

interface Props {
    onChange: () => void;
}

const SkillsEditor = ({ onChange }: Props) => {
    const { skills, updateSkills, addSkillCategory, removeSkillCategory } = useContent()
    const { language } = useUI();
    const [localSkills, setLocalSkills] = useState<SkillCategory[]>(skills || []);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(skills?.[0]?.id ? [skills[0].id] : [])
    );

    useEffect(() => {
        if (skills && skills.length > 0) {
            setLocalSkills(skills);
        }
    }, [skills]);

    const toggleCategory = (id: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCategories(newExpanded);
    };

    const handleCategoryUpdate = (
        id: string,
        field: keyof SkillCategory,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any
    ) => {
        const updated = localSkills.map(cat =>
            cat.id === id ? { ...cat, [field]: value } : cat
        );
        setLocalSkills(updated);
        updateSkills(updated)
        onChange();
    };

    const handleTitleUpdate = (id: string, lang: 'en' | 'tr', value: string) => {
        const updated = localSkills.map(cat => {
            if (cat.id === id) {
                return {
                    ...cat,
                    title: { ...cat.title, [lang]: value }
                };
            }
            return cat;
        });
        setLocalSkills(updated);
        updateSkills(updated);
        onChange();
    };

    const handleSkillUpdate = (
        categoryId: string,
        skillIndex: number,
        field: 'name' | 'level',
        value: string | number
    ) => {
        const updated = localSkills.map(cat => {
            if (cat.id === categoryId) {
                const newSkills = [...cat.skills];
                newSkills[skillIndex] = {
                    ...newSkills[skillIndex],
                    [field]: field === 'level' ? Number(value) : value
                };
                return { ...cat, skills: newSkills };
            }
            return cat;
        });
        setLocalSkills(updated);
        updateSkills(updated);
        onChange();
    };

    const addSkillToCategory = (categoryId: string) => {
        const updated = localSkills.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    skills: [...cat.skills, { name: 'New Skills', level: 50 }]
                };
            }
            return cat;
        });
        setLocalSkills(updated);
        updateSkills(updated);
        onChange();
    };

    const removeSkillFromCategory = (categoryId: string, skillIndex: number) => {
        const updated = localSkills.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    skills: cat.skills.filter((_, i) => i !== skillIndex)
                };
            }
            return cat;
        });
        setLocalSkills(updated);
        updateSkills(updated);
        onChange();
    };

    const handleAddCategory = () => {
        const newCategory: SkillCategory = {
            id: Date.now().toString(),
            icon: 'Code',
            title: { en: 'New Category', tr: 'Yeni Kategory' },
            color: 'from-blue-500 to-cyan-500',
            skills: [{ name: 'New Skills', level: 50 }]
        };
        addSkillCategory(newCategory);
        setLocalSkills([...localSkills, newCategory]);
        setExpandedCategories(new Set([...expandedCategories, newCategory.id]));
        onChange();
    };

    const handleRemoveCategory = (id: string) => {
        if (localSkills.length <= 1) {
            alert('You must have at least one skill category!');
            return;
        }
        if (confirm('Are you sure you want to delete this skill category?')) {
            removeSkillCategory(id);
            setLocalSkills(localSkills.filter(cat => cat.id !== id));
            onChange();
        }
    };

    if (!localSkills || localSkills.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-400">Loading skills...</p>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-white'>Edit Skills Section</h2>
                <LanguageToggle />
            </div>

            {/* Add Category Button */}
            <button
                onClick={handleAddCategory}
                className='w-full py-3 bg-green-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors'
            >
                <Plus className='w-5 h-5' />
                Add Skill Category
            </button>

            {/* Skill Categories */}
            <div className='space-y-4'>
                <AnimatePresence>
                    {localSkills.map((category, index) => {
                        const Icon = iconMap[category.icon as keyof typeof iconMap] || Code;
                        const isExpanded = expandedCategories.has(category.id);

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className='bg-gray-800 border border-gray-700 rounded-lg overflow-hidden'
                            >
                                {/* Category Header */}
                                <div className='p-4 bg-gray-900/50 flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <GripVertical className='w-5 h-5 text-gray-500 cursor-move' />
                                        <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                                            <Icon className='w-5 h-5 text-white' />
                                        </div>
                                        <div>
                                            <h3 className='text-white font-semibold'>
                                                Category #{index + 1}
                                            </h3>
                                            <p className='text-xs text-gray-400'>
                                                {category.skills?.length || 0} skills
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button
                                            onClick={() => toggleCategory(category.id)}
                                            className='px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors'
                                        >
                                            {isExpanded ? 'Collapse' : 'Expand'}
                                        </button>
                                        <button
                                            onClick={() => handleRemoveCategory(category.id)}
                                            className='p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>

                                {/* Category Details */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className='p-4 space-y-4'
                                        >
                                            {/* Basic Info */}
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <label className='block text-sm text-gray-400 mb-2'>
                                                        Title ({language.toUpperCase()})
                                                    </label>
                                                    <input
                                                        type='text'
                                                        value={category.title[language]}
                                                        onChange={(e) => handleTitleUpdate(category.id, language, e.target.value)}
                                                        className='w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-brain-500 outline-none'
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-400 mb-2">
                                                        Icon
                                                    </label>
                                                    <select
                                                        value={category.icon}
                                                        onChange={(e) => handleCategoryUpdate(category.id, 'icon', e.target.value)}
                                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-brain-500 outline-none"
                                                    >
                                                        <option value="Code">💻 Code</option>
                                                        <option value="Database">🗄️ Database</option>
                                                        <option value="Beaker">🧪 Beaker</option>
                                                        <option value="Cpu">🖥️ CPU</option>
                                                        <option value="Wrench">🔧 Wrench</option>
                                                        <option value="Palette">🎨 Palette</option>
                                                        <option value="Package">📦 Package</option>
                                                        <option value="Server">🖧 Server</option>
                                                        <option value="Globe">🌐 Globe</option>
                                                        <option value="Terminal">⌨️ Terminal</option>
                                                        <option value="Box">📦 Box</option>
                                                        <option value="Layers">📚 Layers</option>
                                                        <option value="FileCode">📄 File Code</option>
                                                        <option value="Sparkles">✨ Sparkles</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-sm text-gray-400 mb-2'>
                                                    Color Gradient
                                                </label>
                                                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 bg-gray-900 rounded-lg border border-gray-700">
                                                    {colorOptions.map(option => (
                                                        <button
                                                            key={option.value}
                                                            type="button"
                                                            onClick={() => handleCategoryUpdate(category.id, 'color', option.value)}
                                                            className={`p-2 rounded border-2 transition-all ${category.color === option.value
                                                                ? 'border-brain-500 ring-2 ring-brain-500/50'
                                                                : 'border-gray-700 hover:border-gray-600'
                                                                }`}
                                                        >
                                                            <div className={`h-8 rounded ${option.preview}`} />
                                                            <p className="text-[10px] text-gray-400 mt-1 text-center">{option.label}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Skill List */}
                                            <div className='border-t border-gray-700 pt-4'>
                                                <div className='flex items-center justify-between mb-3'>
                                                    <h4 className='text-sm font-semibold text-gray-300'>Skills</h4>
                                                    <button
                                                        onClick={() => addSkillToCategory(category.id)}
                                                        className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded flex items-center gap-1 transition-colors'
                                                    >
                                                        <Plus className='w-3 h-3' />
                                                        Add Skill
                                                    </button>
                                                </div>

                                                <div className='space-y-3'>
                                                    {category.skills?.map((skills, skillIndex) => (
                                                        <div
                                                            key={skillIndex}
                                                            className='flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg'
                                                        >
                                                            <div className='flex-1 grid grid-cols-2 gap-3'>
                                                                <input
                                                                    type='text'
                                                                    value={skills.name}
                                                                    onChange={(e) => handleSkillUpdate(category.id, skillIndex, 'name', e.target.value)}
                                                                    placeholder='Skill name'
                                                                    className='px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-brain-500 outline-none'
                                                                />
                                                                <div className='flex items-center gap-2'>
                                                                    <input
                                                                        type='range'
                                                                        min='0'
                                                                        max='100'
                                                                        value={skills.level}
                                                                        onChange={(e) => handleSkillUpdate(category.id, skillIndex, 'level', e.target.value)}
                                                                        className='flex-1'
                                                                    />
                                                                    <input
                                                                        type='number'
                                                                        min='0'
                                                                        max='100'
                                                                        value={skills.level}
                                                                        onChange={(e) => handleSkillUpdate(category.id, skillIndex, 'level', e.target.value)}
                                                                        className='w-16 px-2 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm text-center focus:border-brain-500 outline-none'
                                                                    />
                                                                    <span className='text-gray-400 text-sm'>%</span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => removeSkillFromCategory(category.id, skillIndex)}
                                                                className='p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors'
                                                            >
                                                                <Trash2 className='w-4 h-4' />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SkillsEditor;