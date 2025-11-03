import { motion } from "framer-motion";
import { User, Award, Target, Coffee } from "lucide-react";
import { useTranslation } from "../locales/translations";
import useUI from "../store/useUI";

const About = () => {
    const { t } = useTranslation();
    const { isDarkMode } = useUI();

    const stats = [
        { icon: Award, label: t('about.experience'), value: '0.16+' },
        { icon: Target, label: t('about.projects'), value: '50+' },
        { icon: Coffee, label: t('about.coffee'), value: '∞' },
    ];

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
                            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode
                                ? 'text-white'
                                : 'text-gray-900'
                                }`}>
                                {t('about.title')}
                            </h2>
                            <p className={`mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                {t('about.subtitle')}
                            </p>
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
                                <h3 className="text-xl sm:text-2xl font-semibold text-brain-400 mb-4 sm:mb-6">
                                    {t('about.heading')}
                                </h3>
                                <div className={`space-y-4 leading-relaxed text-sm sm:text-base ${isDarkMode ? 'text-gray-300/90' : 'text-gray-700'
                                    }`}>
                                    <p>{t('about.p1')}</p>
                                    <p>{t('about.p2')}</p>
                                </div>
                            </div>

                            <div className={`md:col-span-2 p-6 sm:p-8 md:p-12 border-t md:border-t-0 md:border-l ${isDarkMode
                                ? 'bg-gray-900/30 border-gray-800'
                                : 'bg-gray-100/30 border-gray-200'
                                }`}>
                                <h4 className={`text-base sm:text-lg font-semibold mb-6 sm:mb-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                    {t('about.metrics')}
                                </h4>
                                <div className="space-y-6 sm:space-y-8">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={stat.label}
                                                className="flex items-center gap-3 sm:gap-4"
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
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
                                                        }`}>{stat.label}</div>
                                                </div>
                                            </motion.div>
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
                        <p className={`text-base sm:text-lg md:text-xl italic leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            "{t('about.quote')}"
                        </p>
                    </motion.blockquote>
                </motion.div>
            </div>
        </section>
    );
};

export default About;