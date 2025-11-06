import { AnimatePresence, motion } from "framer-motion";
import {
    Code, Database, Beaker, Cpu,
    Wrench, Palette, Package, Server, Globe,
    Terminal, Box, Layers, FileCode, Sparkles
} from 'lucide-react';
import { useTranslation } from "../locales/translations";
import useUI from "../store/useUI";
import { useContent } from "../store/useContent";

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

const Skills = () => {
    const { t } = useTranslation();
    const { isDarkMode, language } = useUI();
    const { skills: skillCategories } = useContent();

    const textVariants = {
        exit: {
            y: -50,
            opacity: 0,
            transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
        },
        enter: {
            y: 50,
            opacity: 0
        },
        center: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
        }
    };

    return (
        <section
            id="skills"
            className={`min-h-screen py-16 sm:py-20 md:py-24 px-4 md:px-8 lg:px-16 snap-start flex flex-col justify-center ${isDarkMode
                ? 'bg-gradient-to-b from-transparent via-purple-950/10 to-transparent'
                : 'bg-gradient-to-b from-transparent via-purple-200/20 to-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto w-full my-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-6 sm:mb-8 md:mb-12">
                        <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg">
                            <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                        </div>
                        <div>
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={language + '-skills-title'}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}
                                    >
                                        {t('skills.title')}
                                    </motion.h2>
                                </AnimatePresence>
                            </div>
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={language + '-skills-subtitle'}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className={`mt-1 sm:mt-2 text-xs sm:text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}
                                    >
                                        {t('skills.subtitle')}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                        {skillCategories.map((category, categoryIndex) => {
                            const Icon = iconMap[category.icon as keyof typeof iconMap] || Code;
                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ delay: 0.2 + categoryIndex * 0.3 }}
                                    className={`p-4 sm:p-5 md:p-6 backdrop-blur-sm rounded-2xl border ${isDarkMode
                                        ? 'bg-gray-900/50 border-gray-800'
                                        : 'bg-white/50 border-gray-200'
                                        }`}
                                >
                                    {/* Category Header */}
                                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                                        <div className={`p-1.5 sm:p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <h3 className={`text-base sm:text-lg md:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {category.title[language]}
                                        </h3>
                                    </div>

                                    {/* Skills List */}
                                    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                                        {category.skills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                                            >
                                                <div className="flex justify-between mb-1">
                                                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                                        }`}>{skill.name}</span>
                                                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                        }`}>{skill.level}%</span>
                                                </div>
                                                <div className={`w-full rounded-full h-2 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                                                    }`}>
                                                    <motion.div
                                                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ amount: 0.8 }}
                                                        transition={{
                                                            duration: 1,
                                                            delay: categoryIndex * 0.1 + index * 0.05,
                                                            ease: 'easeOut'
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.8 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 sm:mt-12 text-center"
                    >
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={language + '-skills-desc'}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className={`text-xs sm:text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                >
                                    "{t('skills.description')}"
                                </motion.p>
                            </AnimatePresence>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;