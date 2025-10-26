import { motion } from "framer-motion";
import { Code, Database, Beaker, Cpu } from "lucide-react";

const Skills = () => {
    const skillCategories = [
        {
            icon: Code,
            color: 'from-blue-500 to-cyan-500',
            skills: [
                { name: 'React/Next.js', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'Three.js/R3F', level: 75 },
                { name: 'Tailwind CSS', level: 95 },
            ],
        },
        {
            icon: Database,
            title: 'Backend & Database',
            color: 'from-purple-500 to-pink-500',
            skills: [
                { name: 'Node.js/Express', level: 80 },
                { name: 'PostgreSQL', level: 75 },
                { name: 'MongoDB', level: 70 },
                { name: 'GraphQL', level: 65 },
            ],
        },
        {
            icon: Beaker,
            title: 'Biology & Science',
            color: 'from-green-500 to-emerald-500',
            skills: [
                { name: 'Molecular Biology', level: 85 },
                { name: 'Bioinformatics', level: 70 },
                { name: 'Data Analysis', level: 80 },
                { name: 'Scientific Writing', level: 90 },
            ],
        },
        {
            icon: Cpu,
            title: 'Tools & Technologies',
            color: 'from-orange-500 to-red-500',
            skills: [
                { name: 'Git/GitHub', level: 90 },
                { name: 'Docker', level: 70 },
                { name: 'AWS/Cloud', level: 65 },
                { name: 'CI/CD', level: 75 },
            ],
        },
    ];

    return (
        <section
            id="skills"
            className="h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent snap-start flex flex-col justfiy-center"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                            <Cpu className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Skills & Experience
                            </h2>
                            <p className="text-gray-400 mt-2">Parietal Lobe • Data Processing & Analysis</p>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {skillCategories.map((category, categoryIndex) => {
                            const Icon = category.icon;
                            return (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ delay: categoryIndex * 0.1 }}
                                    className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800"
                                >
                                    {/* Category Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {category.title}
                                        </h3>
                                    </div>

                                    {/* Skills List */}
                                    <div className="space-y-4">
                                        {category.skills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                                            >
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-gray-300">{skill.name}</span>
                                                    <span className="text-sm text-gray-400">{skill.level}%</span>
                                                </div>
                                                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                                    <motion.div
                                                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ amount: 0.8 }}
                                                        transition={{
                                                            duration: 1,
                                                            delay: categoryIndex * 0.1 + index * 0.05,
                                                            ease: 'easeOut'
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.8 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-gray-400">
                            Like the parietal lobe processes sensory information,
                            I synthesize diverse technical skills to create cohesive solutions.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;