import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Volume2, VolumeX } from 'lucide-react';

// Sections
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Hooks & Store
import useUI from './store/useUI';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useLobeMapping } from './hooks/useLobeMapping';
import { useEffect, useRef, type RefObject } from 'react';

function App() {
  const {
    isSceneLoaded,
    currentSection,
    scrollProgress,
    isSoundEnabled,
    toggleSound
  } = useUI();

  // YENİ: main elementi için bir ref oluşturduk
  const mainContainerRef = useRef<HTMLDivElement>(null);


  useScrollProgress(mainContainerRef as RefObject<HTMLElement>);

  const { scrollToSection } = useLobeMapping(mainContainerRef as RefObject<HTMLElement>);

  // YENİ: Sayfa yüklendiğinde en başa kaydır
  useEffect(() => {
    mainContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, []); // Boş dependency array ile sadece ilk render'da çalışır

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="relative min-h-screen bg-gray-950">
      {/* Fixed Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
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
              <span className="text-xl font-bold gradient-text">Neural Portfolio</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => scrollToSection(item.id as any)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${currentSection === item.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
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

            {/* Sound Toggle */}
            <motion.button
              onClick={toggleSound}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isSoundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-1 bg-gray-800 z-40"
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
        <div className="bg-gray-900/90 backdrop-blur-md rounded-full border border-gray-800 px-4 py-3">
          <div className="flex justify-around items-center">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => scrollToSection(item.id as any)}
                className={`p-2 rounded-full transition-colors ${currentSection === item.id
                  ? 'bg-brain-500/20 text-brain-400'
                  : 'text-gray-400'
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
      {/* DEĞİŞİKLİK: Oluşturduğumuz ref'i main elementine atadık */}
      <main ref={mainContainerRef} className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Loading Overlay - Will be used when 3D is loading */}
      <AnimatePresence>
        {!isSceneLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gray-950 z-[100] flex items-center justify-center"
          >
            <div className="text-center">
              <div className="loader mb-4 mx-auto" />
              <p className="text-gray-400">Loading Neural Network...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App
