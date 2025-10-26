import { motion } from "framer-motion";
import { User, Award, Target, Coffee } from "lucide-react";

const About = () => {
    const stats = [
        { icon: Award, label: 'Years of Experience', value: '5+' },
        { icon: Target, label: 'Projects Completed', value: '50+' },
        { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
    ];

    return (
        // DEĞİŞİKLİK: min-h-screen yerine h-screen, snap-start ve flex ekledik.
        <section
            id="about"
            className="h-screen w-full flex flex-col justify-center py-32 px-4 md:px-8 lg:px-16 snap-start"
        >
            <div className="max-w-5xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-brain-500/20 rounded-lg">
                            <User className="w-8 h-8 text-brain-400" />
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                About Me
                            </h2>
                            <p className="text-gray-400 mt-2">Frontal Lobe • Problem Solving & Planning</p>
                        </div>
                    </div>

                    {/* Glassmorphism Kart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-xl overflow-hidden"
                    >
                        <div className="grid md:grid-cols-5">
                            <div className="md:col-span-3 p-8 md:p-12">
                                <h3 className="text-2xl font-semibold text-brain-300 mb-6">
                                    Biology Meets Code
                                </h3>
                                <div className="space-y-4 text-gray-300/90 leading-relaxed">
                                    <p>
                                        With a background in biology and a passion for technology, I bring a unique
                                        perspective to software development. Just as the frontal lobe orchestrates
                                        complex decision-making and planning, I approach each project with strategic
                                        thinking and creative problem-solving.
                                    </p>
                                    <p>
                                        My journey from studying cellular mechanisms to building digital ecosystems
                                        has taught me that the best solutions often come from understanding systems
                                        at multiple levels - from the microscopic details to the big picture.
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-2 p-8 md:p-12 bg-gray-900/30 border-t md:border-t-0 md:border-l border-gray-800">
                                <h4 className="text-lg font-semibold text-gray-200 mb-8">Key Metrics</h4>
                                <div className="space-y-8">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={stat.label}
                                                className="flex items-center gap-4"
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="p-3 bg-gradient-to-br from-brain-500/20 to-purple-500/20 rounded-lg">
                                                    <Icon className="w-6 h-6 text-brain-400" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* YENİ: Alıntı Bölümü */}
                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.8 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-16 text-center max-w-3xl mx-auto"
                    >
                        <p className="text-xl text-gray-400 italic leading-relaxed">
                            "The brain is the most complex structure in the universe. Code is how we teach sand to think. Together, they represent the ultimate frontier of human understanding."
                        </p>
                    </motion.blockquote>
                </motion.div>
            </div>
        </section>
    );
};

export default About;