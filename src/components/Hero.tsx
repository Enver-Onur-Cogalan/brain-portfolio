import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Brain } from 'lucide-react';
import { useTranslation } from "../locales/translations";
import useUI from "../store/useUI";

const Hero = () => {
    const { t } = useTranslation();
    const { isDarkMode, language } = useUI();

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

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
            id="hero"
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden snap-start px-4"
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode
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

                <h1 className="text-4xl md:text-7xl font-bold mb-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={language + '-title'}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="gradient-text inline-block"
                        >
                            {t('hero.title')}
                        </motion.span>
                    </AnimatePresence>
                </h1>

                <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={language + '-subtitle'}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className={`text-lg md:text-xl mb-8 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}
                        >
                            {t('hero.subtitle')}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={language + '-description'}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className={`text-base sm:text-lg mb-12 transition-colors duration-300 ${isDarkMode
                                ? 'text-gray-400 hover:text-brain-400'
                                : 'text-gray-600 hover:text-brain-500'
                                }`}
                        >
                            {t('hero.description')}
                        </motion.p>
                    </AnimatePresence>
                </div>
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
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={language + '-scroll'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm"
                        >
                            {t('hero.scroll')}
                        </motion.span>
                    </AnimatePresence>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.button>
        </section>
    );
};

export default Hero;
