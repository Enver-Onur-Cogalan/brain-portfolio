import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-300' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-400' },
    ];


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset status after 3 secons
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const inputVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section
            id="contact"
            className="h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-950 via-green-950/20 to-gray-950 snap-start flex flex-col justify-center items-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-6xl mx-auto"
            >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                        <Mail className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Get In Touch
                        </h2>
                        <p className="text-gray-400 mt-2">Occipital Lobe • Visual Processing & Connection</p>
                    </div>
                </div>

                {/* Main Contact Card  */}
                <div className="grid lg:grid-cols-12 gap-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-green-500/10">
                    {/* Left Side Info */}
                    <motion.div
                        className="lg:col-span-5 flex flex-col justify-between"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                Let's build the future, <span className="text-green-400">together.</span>
                            </h3>
                            <p className="text-gray-300 mb-8">
                                Have an idea? A project? Or just want to talk about tech? My inbox is always open.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-lg"><Mail className="w-5 h-5 text-green-400" /></div>
                                <a href="mailto:eonurcogalan@gmail.com" className="text-gray-200 hover:text-green-400 transition-colors">eonurcogalan@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-lg"><MapPin className="w-5 h-5 text-green-400" /></div>
                                <p className="text-gray-200">Izmir, TR</p>
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-gray-800">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 bg-gray-800/50 rounded-lg text-gray-400 transition-all duration-300 ${link.color} hover:scale-110`}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <link.icon className="w-6 h-6" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}

                    <motion.div
                        className="lg:col-span-7"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <motion.input variants={inputVariant} type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Name" />
                                <motion.input variants={inputVariant} type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="Email" />
                            </div>
                            <motion.input variants={inputVariant} type="text" name="subject" value={formData.subject} onChange={handleChange} required className="form-input" placeholder="Subject" />
                            <motion.textarea variants={inputVariant} name="message" value={formData.message} onChange={handleChange} required rows={5} className="form-input" placeholder="Your Message..." />

                            <motion.button
                                variants={inputVariant}
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-lg
                                    ${isSubmitting
                                        ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                        : submitStatus === 'success'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/25'
                                    }`
                                }
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                                        <span>Message Sent!</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className='w-5 h-5' />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;