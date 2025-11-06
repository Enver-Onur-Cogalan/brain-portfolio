import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../../store/useContent";
import { Award, CheckCircle, Coffee, Crown, Flame, Heart, Medal, Plus, Rocket, Star, Target, Trash2, TrendingUp, Trophy, Zap } from "lucide-react";


const iconMap = {
    Award,
    Trophy,
    Medal,
    Star,
    Target,
    Coffee,
    Zap,
    Flame,
    Heart,
    CheckCircle,
    TrendingUp,
    Rocket,
    Crown
};

interface Props {
    onChange: () => void;
}

const AboutEditor = ({ onChange }: Props) => {
    const { about, updateAbout } = useContent();
    const [editLang, setEditLang] = useState<'en' | 'tr'>('en');
    const [localAbout, setLocalAbout] = useState(about);

    const handleUpdate = (field: keyof typeof localAbout, lang: 'en' | 'tr', value: string) => {
        const updated = {
            ...localAbout,
            [field]: {
                ...localAbout[field],
                [lang]: value
            }
        };
        setLocalAbout(updated);
        updateAbout(updated);
        onChange();
    };

    const handleMetricUpdate = (index: number, field: 'label' | 'value', lang: 'en' | 'tr', value: string) => {
        const updated = { ...localAbout };
        if (field === 'label') {
            updated.metrics[index].label[lang] = value;
        } else {
            updated.metrics[index].value = value;
        }
        setLocalAbout(updated);
        updateAbout(updated);
        onChange();
    };

    const addMetric = () => {
        const updated = {
            ...localAbout,
            metrics: [
                ...localAbout.metrics,
                {
                    icon: 'Award',
                    label: { en: 'New Metric', tr: 'Yeni Metric' },
                    value: '0'
                }
            ]
        };
        setLocalAbout(updated);
        updateAbout(updated);
        onChange();
    };

    const removeMetric = (index: number) => {
        const updated = {
            ...localAbout,
            metrics: localAbout.metrics.filter((_, i) => i !== index)
        };
        setLocalAbout(updated);
        updateAbout(updated);
        onChange();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Edit About Section</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setEditLang('en')}
                        className={`px-4 py-2 rounded-lg transition-colors ${editLang === 'en'
                            ? 'bg-brain-500 text-white'
                            : 'bg-gray-800 text-gray-400'
                            }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setEditLang('tr')}
                        className={`px-4 py-2 rounded-lg transition-colors ${editLang === 'tr'
                            ? 'bg-brain-500 text-white'
                            : 'bg-gray-800 text-gray-400'
                            }`}
                    >
                        TR
                    </button>
                </div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Paragraph 1 ({editLang.toUpperCase()})
                    </label>
                    <textarea
                        value={localAbout.p1[editLang]}
                        onChange={(e) => handleUpdate('p1', editLang, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-brain-500 focus:ring-1 focus:ring-brain-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Paragraph 2 ({editLang.toUpperCase()})
                    </label>
                    <textarea
                        value={localAbout.p2[editLang]}
                        onChange={(e) => handleUpdate('p2', editLang, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-brain-500 focus:ring-1 focus:ring-brain-500 outline-none"
                    />
                </div>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Key Metrics</h3>
                    <button
                        onClick={addMetric}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Metric
                    </button>
                </div>

                {localAbout.metrics.map((metric, index) => {
                    const Icon = iconMap[metric.icon as keyof typeof iconMap] || Award;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-gray-800 border border-gray-700 rounded-lg space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon className="w-5 h-5 text-brain-400" />
                                    <span className="text-sm text-gray-400">Metric #{index + 1}</span>
                                </div>
                                <button
                                    onClick={() => removeMetric(index)}
                                    className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">
                                        Label ({editLang.toUpperCase()})
                                    </label>
                                    <input
                                        type="text"
                                        value={metric.label[editLang]}
                                        onChange={(e) => handleMetricUpdate(index, 'label', editLang, e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm focus:border-brain-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Value</label>
                                    <input
                                        type="text"
                                        value={metric.value}
                                        onChange={(e) => handleMetricUpdate(index, 'value', 'en', e.target.value)}
                                        className="w-20 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm focus:border-brain-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Icon</label>
                                <select
                                    value={metric.icon}
                                    onChange={(e) => {
                                        const updated = { ...localAbout };
                                        updated.metrics[index].icon = e.target.value;
                                        setLocalAbout(updated);
                                        updateAbout(updated);
                                        onChange();
                                    }}
                                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm focus:border-brain-500 outline-none"
                                >
                                    <option value='Award'>🏆 Award</option>
                                    <option value='Trophy'>🏆 Trophy</option>
                                    <option value='Medal'>🥇 Medal</option>
                                    <option value='Star'>⭐ Star</option>
                                    <option value='Target'>🎯 Target</option>
                                    <option value='Coffee'>☕ Coffee</option>
                                    <option value='Zap'>⚡ Zap</option>
                                    <option value='Flame'>🔥 Flame</option>
                                    <option value='Heart'>❤️ Heart</option>
                                    <option value='CheckCircle'>✅ CheckCircle</option>
                                    <option value='TrendingUp'>📈 Trending Up</option>
                                    <option value='Rocket'>🚀 Rocket</option>
                                    <option value='Crown'>👑 Crown</option>
                                </select>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default AboutEditor;