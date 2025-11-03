import { motion } from "framer-motion";
import { ChevronDown, Brain } from 'lucide-react';
import { useTranslation } from "../locales/translations";
import useUI from "../store/useUI";

const Hero = () => {
    const { t } = useTranslation();
    const { isDarkMode } = useUI();

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden snap-start px-4"
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 ${isDarkMode
                ? 'bg-gradient-to-b from-purple-900/20 via-transparent to-pink-900/20 opacity-100'
                : 'bg-gradient-to-b from-purple-200/30 via-transparent to-pink-200/30 opacity-100'
                }`} />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="mb-8"
                    animate={{
                        rotateY: [0, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    <Brain className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-brain-400" />
                </motion.div>

                <h1 className="text-4xl md:text-7xl font-bold mb-4">
                    <span className="gradient-text">{t('hero.title')}</span>
                </h1>

                <p className={`text-lg md:text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    {t('hero.subtitle')}
                </p>

                <motion.p
                    className={`text-base sm:text-lg mb-12 transition-colors duration-300 ${isDarkMode
                        ? 'text-gray-400 hover:text-brain-400'
                        : 'text-gray-600 hover:text-brain-500'
                        }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {t('hero.description')}
                </motion.p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
                onClick={scrollToAbout}
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-colors duration-300 ${isDarkMode
                    ? 'text-gray-400 hover:text-brain-400'
                    : 'text-gray-600 hover:text-brain-500'
                    }`}
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm">{t('hero.scroll')}</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.button>
        </section>
    );
};

export default Hero;
