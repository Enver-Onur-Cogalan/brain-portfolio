import { motion } from "framer-motion";
import { ChevronDown, Brain } from 'lucide-react';

const Hero = () => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            // DEĞİŞİKLİK: snap-start eklendi ve min-h-screen -> h-screen oldu
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden snap-start"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-pink-900/20" />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-4"
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
                    <Brain className="w-24 h-24 mx-auto text-brain-400" />
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                    <span className="gradient-text">Neural Portfolio</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    Exploring the intersection of Biology & Technology
                </p>

                <motion.p
                    className="text-lg text-gray-400 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Navigate through the lobes of my digital brain
                </motion.p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
                onClick={scrollToAbout}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-brain-400 transition-colors"
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
                    <span className="text-sm">Scroll to explore</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.button>
        </section>
    );
};

export default Hero;
