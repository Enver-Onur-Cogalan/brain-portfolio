import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Brain, Languages, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sections
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import BrainCanvas from '../components/canvas/BrainCanvas';


// Hooks & Store
import useUI from '../store/useUI';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useEffect, useRef, type RefObject } from 'react';
import { useScrollTransition } from '../hooks/useScrollTransition';
import { useTranslation } from '../locales/translations';
import { useLanguageTransition } from '../hooks/useLanguageTransition';
import { useThemeTransition, getBlurOverlayStyle } from '../hooks/useThemeTransition';

function Home() {
    const {
        isSceneLoaded,
        currentSection,
        scrollProgress,
        isDarkMode,
        toggleTheme,
        language,
        setLanguage
    } = useUI();

    const navigate = useNavigate();

    const { t } = useTranslation();
    const languageTransition = useLanguageTransition(language);
    const themeTransition = useThemeTransition(isDarkMode);

    const mainContainerRef = useRef<HTMLDivElement>(null);


    useScrollProgress(mainContainerRef as RefObject<HTMLElement | null>);
    const { scrollToSection } = useScrollTransition(mainContainerRef);

    useEffect(() => {
        mainContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (themeTransition.phase === 'changing' || themeTransition.phase === 'idle') {
            if (isDarkMode) {
                root.classList.add('dark');
                body.classList.add('dark');
            } else {
                root.classList.remove('dark');
                body.classList.remove('dark');
            }
        }
    }, [isDarkMode, themeTransition.phase]);

    // Navigation items
    const navItems = [
        { id: 'hero', label: t('nav.home') },
        { id: 'about', label: t('nav.about') },
        { id: 'skills', label: t('nav.skills') },
        { id: 'projects', label: t('nav.projects') },
        { id: 'contact', label: t('nav.contact') },
    ];

    // Text animation variants for language transition
    const getTextVariants = () => {
        const direction = languageTransition.direction;
        return {
            exit: {
                y: direction === 'up' ? -30 : 30,
                opacity: 0,
                transition: { duration: 0.2, easeInOut }
            },
            enter: {
                y: direction === 'up' ? 30 : -30,
                opacity: 0,
            },
            center: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.3, easeInOut }
            }
        }
    }

    const isBlurActive = themeTransition.phase !== 'idle';

    return (
        <div className={`relative min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
            }`}>

            {/* Theme Paint Overlay */}
            <AnimatePresence>
                {isBlurActive && (
                    <motion.div
                        style={getBlurOverlayStyle(themeTransition.blurAmount, themeTransition.opacity)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                )}
            </AnimatePresence>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${isDarkMode
                    ? 'bg-gray-900/80 border-gray-800'
                    : 'bg-white/80 border-gray-200'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => scrollToSection('hero')}
                            onDoubleClick={() => navigate('/admin')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Brain className="w-8 h-8 text-brain-400" />
                            <AnimatePresence mode='wait'>
                                <motion.span
                                    key={language + '-logo'}
                                    variants={getTextVariants()}
                                    initial='enter'
                                    animate='center'
                                    exit='exit'
                                    className='text-xl font-bold gradient-text'
                                >
                                    {t('hero.title')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onClick={() => scrollToSection(item.id as any)}
                                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${currentSection === item.id
                                        ? isDarkMode ? 'text-white' : 'text-gray-900'
                                        : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={language + '-' + item.id}
                                            variants={getTextVariants()}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="block"
                                        >
                                            {item.label}
                                        </motion.span>
                                    </AnimatePresence>
                                    {currentSection === item.id && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brain-400 to-purple-400"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Theme and Language Toggles */}
                        <div className='flex items-center gap-2'>
                            {/* Language Toggle */}
                            <motion.button
                                onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isDarkMode
                                    ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700'
                                    : 'bg-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-300'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className='flex items-center gap-1'>
                                    <Languages className='w-4 h-4' />
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={language}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className='hidden sm:inline'
                                        >
                                            {language.toUpperCase()}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            </motion.button>

                            {/* Theme Toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                title={isDarkMode ? t('theme.light') : t('theme.dark')}
                            >
                                <AnimatePresence mode="wait">
                                    {isDarkMode ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                                        >
                                            <Sun className="w-5 h-5" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                                        >
                                            <Moon className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Progress Bar */}
            <motion.div
                className={`fixed top-16 left-0 right-0 h-1 z-40 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                    }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-brain-400 to-purple-400 origin-left"
                    style={{ scaleX: scrollProgress }}
                />
            </motion.div>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className={`backdrop-blur-md rounded-full border px-3 py-2.5 ${isDarkMode
                    ? 'bg-gray-900/90 border-gray-800'
                    : 'bg-white/90 border-gray-200'
                    }`}>
                    <div className="flex justify-around items-center">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onClick={() => scrollToSection(item.id as any)}
                                className={`p-2 rounded-full transition-colors ${currentSection === item.id
                                    ? 'bg-brain-500/20 text-brain-400'
                                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={language + '-mobile-' + item.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.15 }}
                                        className="text-xs"
                                    >
                                        {item.label}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main ref={mainContainerRef} className={`h-screen-safe overflow-y-auto overflow-x-hidden scroll-smooth transition-colors duration-300 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
                }`}>
                <BrainCanvas />

                <div id='hero' className='h-screen-safe pointer-events-none'>
                    <Hero />
                </div>

                <div id='about' className='relative z-10 w-full flex justify-end h-screen-safe pointer-events-none'>
                    <div className='w-full md:w-1/2 text-foreground overflow-y-auto section-container pointer-events-auto'>
                        <About />
                    </div>
                </div>

                <div id='skills' className='relative z-10 w-full flex justify-end h-scree-safe pointer-events-none'>
                    <div className='w-full md:w-1/2 text-foreground overflow-y-auto section-container pointer-events-auto'>
                        <Skills />
                    </div>
                </div>

                <div id='projects' className='relative z-10 w-full flex justify-end h-screen-safe pointer-events-none'>
                    <div className='w-full md:w-1/2 text-foreground overflow-y-auto section-container pointer-events-auto'>
                        <Projects />
                    </div>
                </div>

                <div id='contact' className='relative z-10 w-full flex justify-end h-screen-safe pointer-events-none'>
                    <div className='w-full md:w-1/2 text-foreground overflow-y-auto section-container pointer-events-auto'>
                        <Contact />
                    </div>
                </div>
            </main>

            {/* Loading Overlay - Will be used when 3D is loading */}
            <AnimatePresence>
                {!isSceneLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`fixed inset-0 z-[100] flex items-center justify-center ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
                            }`}
                    >
                        <div className="text-center">
                            <div className="loader mb-4 mx-auto" />
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={language + '-loading'}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                >
                                    {t('loading.text')}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Home
