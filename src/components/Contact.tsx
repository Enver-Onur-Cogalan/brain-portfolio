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

    const contactInfo = [
        { icon: Mail, value: 'hello@example.com', label: 'Email' },
        { icon: MapPin, value: 'San Francisco, CA', label: 'Location' },
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

    return (
        <section
            id="contact"
            className="h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-green-950/10 to-gray-950 snap-start flex flex-col justify-center"
        >
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}
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

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors"
                                            placeholder="Let's collaborate!"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
                                                ${isSubmitting
                                                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                                : submitStatus === 'success'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/25'
                                            }`
                                        }
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : submitStatus === 'success' ? (
                                            <>
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                    ✓
                                                </div>
                                                Message Sent!
                                            </>
                                        ) : (
                                            <>
                                                <Send className='w-5 h-5' />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Bio Card */}
                            <div className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-gray-800">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    Let's Create Something Amazing
                                </h3>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    Whether you have a project in mind, need technical consultation,
                                    or just want to connect and discuss the fascinating intersection
                                    of biology and technology, I'd love to hear from you!
                                </p>

                                {/* Contact Details */}
                                <div className="space-y-4">
                                    {contactInfo.map((info) => {
                                        const Icon = info.icon;
                                        return (
                                            <div key={info.label} className="flex items-center gap-4">
                                                <div className="p-2 bg-green-500/10 rounded-lg">
                                                    <Icon className="w-5 h-5 text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">{info.label}</p>
                                                    <p className="text-gray-200">{info.value}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
                                <h4 className="text-lg font-semibold text-white mb-4">
                                    Connect on Social
                                </h4>
                                <div className="flex gap-4">
                                    {socialLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <motion.a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-3 bg-gray-800/50 rounded-lg text-gray-400 transition-all duration-300 ${link.color} hover:scale-110`}
                                                whileHover={{ y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Icon className="w-6 h-6" />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Available Status */}
                            <motion.div
                                className="p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-800/50"
                                animate={{
                                    boxShadow: [
                                        '0 0 0 0 rgba(34, 197, 94, 0)',
                                        '0 0 0 10px rgba(34, 197, 94, 0.1)',
                                        '0 0 0 0 rgba(34, 197, 94, 0)',
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Currently Available</p>
                                        <p className="text-gray-400 text-sm">Open to new opportunities and collaborations</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Footer Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.8 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-gray-400 italic">
                            "Like the occipital lobe processing visual information,
                            let's visualize and bring your ideas to life."
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;