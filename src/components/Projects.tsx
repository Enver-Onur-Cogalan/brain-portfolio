import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Github, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useRef, useLayoutEffect } from 'react';
import { useTranslation } from '../locales/translations';
import useUI from '../store/useUI';
import { useContent } from '../store/useContent';


const Projects = () => {
    const { t } = useTranslation();
    const { isDarkMode, language } = useUI();
    const { projects } = useContent();

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [expanded, setExpanded] = useState<string | null>(null);

    useLayoutEffect(() => {
        const checkScrollability = () => {
            const container = scrollContainerRef.current;
            if (container) {
                const { scrollLeft, scrollWidth, clientWidth } = container;
                setCanScrollLeft(scrollLeft > 5);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
            }
        };
        checkScrollability();
        const container = scrollContainerRef.current;
        container?.addEventListener('scroll', checkScrollability, { passive: true });
        window.addEventListener('resize', checkScrollability);
        return () => {
            container?.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        };
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400 + 24;
            scrollContainerRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
        }
    };

    const marqueeVariants = {
        animate: {
            x: [-1024, 0],
            transition: { x: { repeat: Infinity, repeatType: "loop", duration: 15, ease: "linear" } },
        },
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
        <section id="projects" className="min-h-screen py-20 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 snap-start flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
            >
                {/* Header  */}
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg">
                        <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    </div>
                    <div>
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={language + '-projects-title'}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className={`text-3xl sm:text-4xl md:text-5xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                        }`}
                                >
                                    {t('projects.work')}
                                </motion.h2>
                            </AnimatePresence>
                        </div>
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={language + '-projects-subtitle'}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className={`mt-2 text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                >
                                    {t('projects.workSubtitle')}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                {/* Animation band */}
                <div className={`hidden md:block w-full h-12 mb-6 sm:mb-8 rounded-full border overflow-hidden relative ${isDarkMode ? 'border-gray-800' : 'border-gray-300'
                    }`}>
                    <motion.div className="absolute top-0 left-0 h-full flex" variants={marqueeVariants} animate="animate">
                        <div className={`flex-shrink-0 flex items-center justify-around ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} style={{ width: '1024px' }}>
                            <ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight />
                        </div>
                        <div className={`flex-shrink-0 flex items-center justify-around ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} style={{ width: '1024px' }}>
                            <ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight />
                        </div>
                    </motion.div>
                </div>

                {/* Projects Card */}
                <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 -mx-4 sm:-mx-8 px-4 sm:px-8 snap-x snap-mandatory scrollbar-hide">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`flex-none w-[85%] sm:w-[90%] md:w-[400px] snap-center group flex flex-col backdrop-blur-sm rounded-2xl border shadow-lg overflow-hidden transition-all duration-300 ${isDarkMode
                                ? 'bg-gray-900/50 border-gray-800 hover:border-blue-500/30 hover:shadow-blue-500/10'
                                : 'bg-white/50 border-gray-200 hover:border-blue-400/50 hover:shadow-blue-400/20'
                                }`}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Card Details */}
                            <div className="relative p-5 sm:p-6 flex flex-col h-full">
                                <div className={`w-12 h-1 bg-gradient-to-r ${project.color} rounded-full mb-4`} />
                                <h4 className={`text-lg sm:text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {project.title[language]}
                                </h4>
                                <p className={`text-sm mb-4 flex-grow ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    {project.description[language]}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.slice(0, 3).map((tag) => <span key={tag} className={`px-3 py-1 text-xs rounded-full ${isDarkMode
                                        ? 'bg-gray-800 text-gray-300'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}>
                                        {tag}
                                    </span>)}
                                    <AnimatePresence>
                                        {expanded === project.title && project.tags.slice(3).map(tag => (
                                            <motion.span
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                className={`px-3 py-1 text-xs rounded-full ${isDarkMode
                                                    ? 'bg-gray-800 text-gray-300'
                                                    : 'bg-gray-200 text-gray-700'
                                                    }`}>
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                    {project.tags.length > 3 && (
                                        <button
                                            onClick={() => setExpanded(expanded === project.title ? null : project.title)}
                                            className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${isDarkMode
                                                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                                : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                                                }`}>
                                            {expanded === project.title ? 'Less' : `+${project.tags.length - 3}`}
                                            <ChevronDown className={`w-3 h-3 transition-transform ${expanded === project.title ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-3 mt-auto">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-1 transition-colors ${isDarkMode
                                            ? 'text-gray-400 hover:text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <Github className="w-4 h-4" />
                                        <span className="text-sm">Code</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center gap-4 mt-6 sm:mt-8">
                    <button
                        onClick={() => handleScroll('left')}
                        disabled={!canScrollLeft}
                        className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-full flex items-center justify-center transition-all disabled:opacity-30 ${isDarkMode
                            ? 'bg-gray-900/50 border-gray-800 text-gray-400 hover:text-white'
                            : 'bg-white/50 border-gray-300 text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleScroll('right')}
                        disabled={!canScrollRight}
                        className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-full flex items-center justify-center transition-all disabled:opacity-30 ${isDarkMode
                            ? 'bg-gray-900/50 border-gray-800 text-gray-400 hover:text-white'
                            : 'bg-white/50 border-gray-300 text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;