import { AnimatePresence, motion } from "framer-motion";
import { Code, Database, Beaker, Cpu } from "lucide-react";
import { useTranslation } from "../locales/translations";
import useUI from "../store/useUI";

const Skills = () => {
    const { t } = useTranslation();
    const { isDarkMode, language } = useUI();

    const skillCategories = [
        {
            icon: Code,
            title: t('skills.category.frontend'),
            color: 'from-blue-500 to-cyan-500',
            skills: [
                { name: 'React/Next.js', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'Three.js/R3F', level: 75 },
                { name: 'Tailwind CSS', level: 95 },
            ],
        },
        {
            icon: Database,
            title: t('skills.category.backend'),
            color: 'from-purple-500 to-pink-500',
            skills: [
                { name: 'Node.js/Express', level: 80 },
                { name: 'PostgreSQL', level: 75 },
                { name: 'MongoDB', level: 70 },
                { name: 'GraphQL', level: 65 },
            ],
        },
        {
            icon: Beaker,
            title: t('skills.category.biology'),
            color: 'from-green-500 to-emerald-500',
            skills: [
                { name: 'Molecular Biology', level: 85 },
                { name: 'Bioinformatics', level: 70 },
                { name: 'Data Analysis', level: 80 },
                { name: 'Scientific Writing', level: 90 },
            ],
        },
        {
            icon: Cpu,
            title: t('skills.category.tools'),
            color: 'from-orange-500 to-red-500',
            skills: [
                { name: 'Git/GitHub', level: 90 },
                { name: 'Docker', level: 70 },
                { name: 'AWS/Cloud', level: 65 },
                { name: 'CI/CD', level: 75 },
            ],
        },
    ];

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
            className={`min-h-screen py-20 sm:py-32 px-4 md:px-8 lg:px-16 snap-start flex flex-col justfiy-center ${isDarkMode
                ? 'bg-gradient-to-b from-transparent via-purple-950/10 to-transparent'
                : 'bg-gradient-to-b from-transparent via-purple-200/20 to-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-8 sm:mb-12">
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
                                        className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
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
                                        className={`mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}
                                    >
                                        {t('skills.subtitle')}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                        {skillCategories.map((category, categoryIndex) => {
                            const Icon = category.icon;
                            return (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ delay: 0.2 + categoryIndex * 0.3 }}
                                    className={`p-4 sm:p-6 backdrop-blur-sm rounded-2xl border ${isDarkMode
                                        ? 'bg-gray-900/50 border-gray-800'
                                        : 'bg-white/50 border-gray-200'
                                        }`}
                                >
                                    {/* Category Header */}
                                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                        <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <h3 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {category.title}
                                        </h3>
                                    </div>

                                    {/* Skills List */}
                                    <div className="space-y-3 sm:space-y-4">
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
                                    className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                >
                                    {t('skills.description')}
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