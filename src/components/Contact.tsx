import { AnimatePresence, motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "../locales/translations";
import useUI from "../store/useUI";

const Contact = () => {
    const { t } = useTranslation();
    const { isDarkMode, language } = useUI();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub', color: isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-900' },
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

    const textVariants = {
        exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
        enter: { y: 20, opacity: 0 },
        center: { y: 0, opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <section
            id="contact"
            className={`min-h-screen py-20 px-4 sm:px-8 lg:px-16 snap-start flex flex-col justify-center items-center ${isDarkMode
                ? 'bg-gradient-to-b from-gray-950 via-green-950/20 to-gray-950'
                : 'bg-gradient-to-b from-gray-50 via-green-200/20 to-gray-50'
                }`}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-6xl mx-auto"
            >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8 sm:mb-12">
                    <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg">
                        <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                    </div>
                    <div>
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={language + '-contact-title'}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className={`text-3xl sm:text-4xl md:text-5xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                        }`}
                                >
                                    {t('contact.title')}
                                </motion.h2>
                            </AnimatePresence>
                        </div>
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={language + '-contact-subtitle'}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className={`mt-2 text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                >
                                    {t('contact.subtitle')}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Main Contact Card  */}
                <div className={`grid lg:grid-cols-12 gap-6 sm:gap-8 backdrop-blur-sm border rounded-2xl p-6 sm:p-8 shadow-2xl ${isDarkMode
                    ? 'bg-gray-900/50 border-gray-800 shadow-green-500/10'
                    : 'bg-white/50 border-gray-200 shadow-green-400/10'
                    }`}>
                    {/* Left Side Info */}
                    <motion.div
                        className="lg:col-span-5 flex flex-col justify-between"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div>
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h3
                                        key={language + '-contact-heading'}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className={`text-2xl sm:text-3xl font-bold mb-4 leading-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}
                                    >
                                        {t('contact.heading')} <span className="text-green-400">{t('contact.headingAccent')}</span>
                                    </motion.h3>
                                </AnimatePresence>
                            </div>
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={language + '-contact-desc'}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className={`mb-6 sm:mb-8 text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}
                                    >
                                        {t('contact.description')}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                </div>
                                <a
                                    href="mailto:eonurcogalan@gmail.com"
                                    className={`text-sm sm:text-base transition-colors ${isDarkMode
                                        ? 'text-gray-200 hover:text-green-400'
                                        : 'text-gray-800 hover:text-green-500'
                                        }`}>
                                    eonurcogalan@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                </div>
                                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                    Izmir, TR
                                </p>
                            </div>
                            <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
                                }`}>
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110 ${isDarkMode
                                            ? 'bg-gray-800/50 text-gray-400'
                                            : 'bg-gray-200/50 text-gray-600'
                                            } ${link.color}`}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <link.icon className="w-5 h-5 sm:w-6 sm:h-6" />
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
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                <motion.input
                                    variants={inputVariant}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder={t('contact.form.name')}
                                />
                                <motion.input
                                    variants={inputVariant}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder={t('contact.form.email')}
                                />
                            </div>
                            <motion.input
                                variants={inputVariant}
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder={t('contact.form.subject')}
                            />
                            <motion.textarea
                                variants={inputVariant}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="form-input"
                                placeholder={t('contact.form.message')}
                            />

                            <motion.button
                                variants={inputVariant}
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg
                                    ${isSubmitting
                                        ? isDarkMode
                                            ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : submitStatus === 'success'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/25'
                                    }`
                                }
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${isDarkMode ? 'border-gray-400' : 'border-gray-500'
                                            }`} />
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={language + '-sending'}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                {t('contact.form.sending')}
                                            </motion.span>
                                        </AnimatePresence>
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={language + '-sent'}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                {t('contact.form.sent')}
                                            </motion.span>
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <>
                                        <Send className='w-5 h-5' />
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={language + '-send'}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                {t('contact.form.send')}
                                            </motion.span>
                                        </AnimatePresence>
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