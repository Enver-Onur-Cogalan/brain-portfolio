import { AnimatePresence, motion } from "framer-motion";
import { Award, CheckCircle, Coffee, Crown, Flame, Heart, Medal, Rocket, Star, Target, User, TrendingUp, Trophy, Zap } from "lucide-react";
import { useTranslation } from "../locales/translations";
import useUI from "../store/useUI";
import { useContent } from "../store/useContent";

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

const About = () => {
    const { t } = useTranslation();
    const { isDarkMode, language } = useUI();
    const { about } = useContent();

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
            id="about"
            className="min-h-screen w-full flex flex-col justify-center py-20 sm:py-32 px-4 sm:px-8 lg:px-16 snap-start"
        >
            <div className="max-w-5xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-8 sm:mb-12">
                        <div className="p-2 sm:p-3 bg-brain-500/20 rounded-lg">
                            <User className="w-6 h-6 sm:w-8 sm:h-8 text-brain-400" />
                        </div>
                        <div>
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={language + '-about-title'}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className={`text-3xl sm:text-4xl md:text-5xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}
                                    >
                                        {t('about.title')}
                                    </motion.h2>
                                </AnimatePresence>
                            </div>
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={language + '-about-subtitle'}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className={`mt-2 text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}
                                    >
                                        {t('about.subtitle')}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Glassmorphism Kart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className={`backdrop-blur-sm rounded-2xl border shadow-xl overflow-hidden ${isDarkMode
                            ? 'bg-gray-900/50 border-gray-800'
                            : 'bg-white/50 border-gray-200'
                            }`}
                    >
                        <div className="grid md:grid-cols-5">
                            <div className="md:col-span-3 p-6 sm:p-8 md:p-12">
                                <div className="overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.h3
                                            key={language + '-about-heading'}
                                            variants={textVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="text-xl sm:text-2xl font-semibold text-brain-400 mb-4 sm:mb-6"
                                        >
                                            {t('about.heading')}
                                        </motion.h3>
                                    </AnimatePresence>
                                </div>
                                <div className={`space-y-4 leading-relaxed text-sm sm:text-base ${isDarkMode ? 'text-gray-300/90' : 'text-gray-700'
                                    }`}>
                                    <div className="overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={language + '-about-p1'}
                                                variants={textVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                            >
                                                {about.p1[language]}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                    <div className="overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={language + '-about-p2'}
                                                variants={textVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                            >
                                                {about.p2[language]}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className={`md:col-span-2 p-6 sm:p-8 md:p-12 border-t md:border-t-0 md:border-l ${isDarkMode
                                ? 'bg-gray-900/30 border-gray-800'
                                : 'bg-gray-100/30 border-gray-200'
                                }`}>
                                <div className="overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.h4
                                            key={language + '-about-metrics'}
                                            variants={textVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className={`text-base sm:text-lg font-semibold mb-6 sm:mb-8 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                                }`}
                                        >
                                            {t('about.metrics')}
                                        </motion.h4>
                                    </AnimatePresence>
                                </div>
                                <div className="space-y-6 sm:space-y-8">
                                    {about.metrics.map((stat, index) => {
                                        const Icon = iconMap[stat.icon as keyof typeof iconMap];
                                        return (
                                            <AnimatePresence mode="wait" key={`${stat.value}-${stat.label[language]}`}>
                                                <motion.div
                                                    key={index}
                                                    className="flex items-center gap-3 sm:gap-4"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ delay: 0.5 + index * 0.1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <div className="p-2 sm:p-3 bg-gradient-to-br from-brain-500/20 to-purple-500/20 rounded-lg">
                                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brain-400" />
                                                    </div>
                                                    <div>
                                                        <div className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                                            }`}>{stat.value}</div>

                                                        <div className={`text-xs sm:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                            }`}>{stat.label[language]}</div>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quote Section */}
                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.8 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto px-4"
                    >
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={language + '-about-quote'}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className={`text-base sm:text-lg md:text-xl italic leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                >
                                    "{t('about.quote')}"
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.blockquote>
                </motion.div>
            </div>
        </section>
    );
};

export default About;