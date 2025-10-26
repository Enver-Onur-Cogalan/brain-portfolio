import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Github, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Projects = () => {
    const [expanded, setExpanded] = useState<string | null>(null);

    const projects = [
        {
            title: 'BioSim Engine',
            description: 'A 3D cellular simulation platform built with Three.js for visualizing biological processes in real-time.',
            tags: ['Three.js', 'WebGL', 'React', 'Biology'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: true,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Neural Network Visualizer',
            description: 'Interactive tool for understanding deep learning architectures through biological neuron metaphors.',
            tags: ['TensorFlow.js', 'D3.js', 'Python', 'ML'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: true,
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'DNA Sequence Analyzer',
            description: 'Web application for analyzing and visualizing DNA sequences with pattern recognition algorithms.',
            tags: ['Next.js', 'PostgreSQL', 'Bioinformatics'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: false,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Lab Protocol Manager',
            description: 'Digital laboratory notebook for managing and sharing research protocols with version control.',
            tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: false,
            color: 'from-orange-500 to-red-500',
        },
        {
            title: 'Protein Folding Predictor',
            description: 'Machine learning model for predicting protein structures based on amino acid sequences.',
            tags: ['Python', 'PyTorch', 'AlphaFold', 'Docker'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: true,
            color: 'from-indigo-500 to-purple-500',
        },
        {
            title: 'Microscopy Image Processor',
            description: 'Automated image analysis pipeline for processing and quantifying microscopy data.',
            tags: ['OpenCV', 'Python', 'React', 'AWS'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: false,
            color: 'from-pink-500 to-rose-500',
        },
    ];

    return (
        <section
            id="projects"
            className="h-screen py-32 px-4 md:px-8 lg:px-16 snap-start flex flex-col justfiy-center"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-16">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <FolderOpen className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Projects & Work
                            </h2>
                            <p className="text-gray-400 mt-2">Temporal Lobe • Memory & Experience</p>
                        </div>
                    </div>

                    {/* Featured Projects */}
                    <div className="mb-20">
                        <h3 className="text-3xl font-semibold text-gray-200 mb-10 flex items-center gap-3">
                            <Star className="w-7 h-7 text-yellow-400" />
                            Featured Projects
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.filter(p => p.featured).map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex flex-col bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-lg overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                                            '--tw-gradient-from': project.color.split(' ')[0].split('-')[1],
                                            '--tw-gradient-to': project.color.split(' ')[1].split('-')[1],
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        } as any}
                                    />
                                    <div className="relative p-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
                                        <div className={`w-12 h-1 bg-gradient-to-r ${project.color} rounded-full mb-4`} />

                                        <h4 className="text-xl font-semibold text-white mb-3">
                                            {project.title}
                                        </h4>

                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            <AnimatePresence>
                                                {expanded === project.title && project.tags.slice(3).map(tag => (
                                                    <motion.span
                                                        key={tag}
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </AnimatePresence>
                                            {project.tags.length > 3 && (
                                                <button onClick={() => setExpanded(expanded === project.title ? null : project.title)} className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-colors flex items-center gap-1">
                                                    {expanded === project.title ? 'Less' : `+${project.tags.length - 3}`}
                                                    <ChevronDown className={`w-3 h-3 transition-transform ${expanded === project.title ? 'rotate-180' : ''}`} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
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
                    </div>

                    {/* Other Projects */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-200 mb-6">
                            Other Projects
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.filter(p => !p.featured).map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-lg font-medium text-white">
                                            {project.title}
                                        </h4>
                                        <div className="flex gap-2">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-xs bg-gray-800/50 text-gray-400 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-gray-400 mb-4">
                            Like memories stored in the temporal lobe, each project represents
                            a learning experience and milestone in my journey.
                        </p>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:scale-105 transition-transform"
                        >
                            <Github className="w-5 h-5" />
                            View All Projects on GitHub
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;