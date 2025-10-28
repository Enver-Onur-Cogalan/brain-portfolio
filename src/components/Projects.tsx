import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Github, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useRef, useLayoutEffect } from 'react';

const projects = [
    { title: 'BioSim Engine', description: 'A 3D cellular simulation platform built with Three.js for visualizing biological processes in real-time.', tags: ['Three.js', 'WebGL', 'React', 'Biology'], github: 'https://github.com', demo: 'https://demo.com', color: 'from-blue-500 to-cyan-500' },
    { title: 'Neural Network Visualizer', description: 'Interactive tool for understanding deep learning architectures through biological neuron metaphors.', tags: ['TensorFlow.js', 'D3.js', 'Python', 'ML'], github: 'https://github.com', demo: 'https://demo.com', color: 'from-purple-500 to-pink-500' },
    { title: 'DNA Sequence Analyzer', description: 'Web application for analyzing and visualizing DNA sequences with pattern recognition algorithms.', tags: ['Next.js', 'PostgreSQL', 'Bioinformatics'], github: 'https://github.com', demo: 'https://demo.com', color: 'from-green-500 to-emerald-500' },
    { title: 'Lab Protocol Manager', description: 'Digital laboratory notebook for managing and sharing research protocols with version control.', tags: ['React', 'Node.js', 'MongoDB', 'REST API'], github: 'https://github.com', demo: 'https://demo.com', color: 'from-orange-500 to-red-500' },
    { title: 'Protein Folding Predictor', description: 'Machine learning model for predicting protein structures based on amino acid sequences.', tags: ['Python', 'PyTorch', 'AlphaFold', 'Docker'], github: 'https://github.com', demo: 'https://demo.com', color: 'from-indigo-500 to-purple-500' },
    { title: 'Microscopy Image Processor', description: 'Automated image analysis pipeline for processing and quantifying microscopy data.', tags: ['OpenCV', 'Python', 'React', 'AWS'], github: 'https://github.com', demo: 'https://demo.com', color: 'from-pink-500 to-rose-500' },
];

const Projects = () => {
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

    return (
        <section id="projects" className="min-h-screen py-24 px-8 md:px-12 lg:px-16 snap-start flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full">
                {/* Başlık ve Animasyon Bandı  */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-500/20 rounded-lg"><FolderOpen className="w-8 h-8 text-blue-400" /></div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Projects & Work</h2>
                        <p className="text-gray-400 mt-2">Temporal Lobe • Memory & Experience</p>
                    </div>
                </div>
                <div className="hidden md:block w-full h-12 mb-8 rounded-full border border-gray-800 overflow-hidden relative">
                    <motion.div className="absolute top-0 left-0 h-full flex" variants={marqueeVariants} animate="animate">
                        <div className="flex-shrink-0 flex items-center justify-around text-gray-500" style={{ width: '1024px' }}><ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight /></div>
                        <div className="flex-shrink-0 flex items-center justify-around text-gray-500" style={{ width: '1024px' }}><ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight /><ArrowRight /></div>
                    </motion.div>
                </div>

                {/* Proje Kartları Alanı */}
                <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-6 -mx-8 px-8 snap-x snap-mandatory scrollbar-hide">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="flex-none w-[90%] md:w-[400px] snap-center group flex flex-col bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-lg overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/10"
                            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.1 }}
                        >
                            {/* Kart Detaylar */}
                            <div className="relative p-6 flex flex-col h-full">
                                <div className={`w-12 h-1 bg-gradient-to-r ${project.color} rounded-full mb-4`} />
                                <h4 className="text-xl font-semibold text-white mb-3">{project.title}</h4>
                                <p className="text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.slice(0, 3).map((tag) => <span key={tag} className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">{tag}</span>)}
                                    <AnimatePresence>
                                        {expanded === project.title && project.tags.slice(3).map(tag => (
                                            <motion.span key={tag} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">{tag}</motion.span>
                                        ))}
                                    </AnimatePresence>
                                    {project.tags.length > 3 && (
                                        <button onClick={() => setExpanded(expanded === project.title ? null : project.title)} className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-colors flex items-center gap-1">
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
                                        className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span className="text-sm">Code</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigasyon Okları */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={() => handleScroll('left')}
                        disabled={!canScrollLeft}
                        className="w-12 h-12 bg-gray-900/50 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all disabled:opacity-30"
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={() => handleScroll('right')}
                        disabled={!canScrollRight}
                        className="w-12 h-12 bg-gray-900/50 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all disabled:opacity-30"
                    >
                        <ArrowRight />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;