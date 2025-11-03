import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Languages, Sun, Moon } from 'lucide-react';

// Sections
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BrainCanvas from './components/canvas/BrainCanvas';

// Hooks & Store
import useUI from './store/useUI';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useEffect, useRef, type RefObject } from 'react';
import { useScrollTransition } from './hooks/useScrollTransition';
import { useTranslation } from './locales/translations';

function App() {
  const {
    isSceneLoaded,
    currentSection,
    scrollProgress,
    isDarkMode,
    toggleTheme,
    language,
    setLanguage
  } = useUI();

  const { t } = useTranslation();

  const mainContainerRef = useRef<HTMLDivElement>(null);


  useScrollProgress(mainContainerRef as RefObject<HTMLElement>);
  const { scrollToSection } = useScrollTransition(mainContainerRef);

  useEffect(() => {
    mainContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      body.style.backgroundColor = 'rgb(3 7 18)';
      body.style.color = 'rgb(243 244 246)';
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      body.style.backgroundColor = 'rgb(249 250 251)';
      body.style.color = 'rgb(31 41 55)';
    }
  }, [isDarkMode]);

  // Navigation items
  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-8 h-8 text-brain-400" />
              <span className="text-xl font-bold gradient-text">
                {t('hero.title')}
              </span>
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
                  {item.label}
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
                  <span className='hidden sm:inline'>{language.toUpperCase()}</span>
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
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.2 }}
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
        className={`fixed top-16 left-0 right-0 h-1 z-40 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
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
                <span className="text-xs">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main ref={mainContainerRef} className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <BrainCanvas />

        <div id='hero' className='h-screen pointer-events-none'>
          <Hero />
        </div>

        <div id='about' className='relative z-10 w-full flex justify-end h-screen pointer-events-none'>
          <div className='w-full md:w-1/2 text-foreground overflow-y-auto section-container pointer-events-auto'>
            <About />
          </div>
        </div>

        <div id='skills' className='relative z-10 w-full flex justify-end h-screen pointer-events-none'>
          <div className='w-full md:w-1/2 text-foreground overflow-y-auto section-container pointer-events-auto'>
            <Skills />
          </div>
        </div>

        <div id='projects' className='relative z-10 w-full flex justify-end h-screen pointer-events-none'>
          <div className='w-full md:w-1/2 text-foreground overflow-y-auto section-container pointer-events-auto'>
            <Projects />
          </div>
        </div>

        <div id='contact' className='relative z-10 w-full flex justify-end h-screen pointer-events-none'>
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
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {t('loading.text')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App
