import useUI from "../store/useUI";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',

        // Hero Section
        'hero.title': 'Neural Portfolio',
        'hero.subtitle': 'Exploring the intersection of Biology & Technology',
        'hero.description': 'Navigate through the lobes of my digital brain',
        'hero.scroll': 'Scroll to explore',

        // About Section
        'about.title': 'About Me',
        'about.subtitle': 'Frontal Lobe • Problem Solving & Planning',
        'about.heading': 'Biology Meets Code',
        'about.p1': 'With a background in biology and a passion for technology, I bring a unique perspective to software development. Just as the frontal lobe orchestrates complex decision-making and planning, I approach each project with strategic thinking and creative problem-solving.',
        'about.p2': 'My journey from studying cellular mechanisms to building digital ecosystems has taught me that the best solutions often come from understanding systems at multiple levels - from the microscopic details to the big picture.',
        'about.metrics': 'Key Metrics',
        'about.experience': 'Years of Experience',
        'about.projects': 'Projects Completed',
        'about.coffee': 'Cups of Coffee',
        'about.quote': 'The brain is the most complex structure in the universe. Code is how we teach sand to think. Together, they represent the ultimate frontier of human understanding.',

        // Skills Section
        'skills.title': 'Skills & Expertise',
        'skills.subtitle': 'Parietal Lobe • Data Processing & Analysis',
        'skills.category.frontend': 'Frontend Development',
        'skills.category.backend': 'Backend & Database',
        'skills.category.biology': 'Biology & Science',
        'skills.category.tools': 'Tools & Technologies',
        'skills.description': 'Like the parietal lobe processes sensory information, I synthesize diverse technical skills to create cohesive solutions.',

        // Projects Section
        'projects.title': 'Featured Projects',
        'projects.subtitle': 'Temporal Lobe • Memory & Recognition',
        'projects.work': 'Projects & Work',
        'projects.workSubtitle': 'Temporal Lobe • Memory & Experience',

        // Contact Section
        'contact.title': 'Get In Touch',
        'contact.subtitle': 'Occipital Lobe • Visual Processing & Connection',
        'contact.heading': "Let's build the future,",
        'contact.headingAccent': 'together.',
        'contact.description': 'Have an idea? A project? Or just want to talk about tech? My inbox is always open.',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Your Message...',
        'contact.form.send': 'Send Message',
        'contact.form.sending': 'Sending...',
        'contact.form.sent': 'Message Sent!',

        // Loading
        'loading.text': 'Loading Neural Network...',

        // Theme
        'theme.light': 'Light Mode',
        'theme.dark': 'Dark Mode',
    },
    tr: {
        // Navigasyon
        'nav.home': 'Ana Sayfa',
        'nav.about': 'Hakkımda',
        'nav.skills': 'Yetenekler',
        'nav.projects': 'Projeler',
        'nav.contact': 'İletişim',

        // Hero Bölümü
        'hero.title': 'Nöral Portföy',
        'hero.subtitle': 'Biyoloji ve Teknolojinin Kesişimi',
        'hero.description': 'Dijital beynimin loblarında gezinin',
        'hero.scroll': 'Keşfetmek için kaydırın',

        // Hakkımda Bölümü
        'about.title': 'Hakkımda',
        'about.subtitle': 'Frontal Lob • Problem Çözme ve Planlama',
        'about.heading': 'Biyoloji ve Kod Buluşuyor',
        'about.p1': 'Biyoloji geçmişim ve teknolojiye olan tutkumla, yazılım geliştirmeye benzersiz bir bakış açısı getiriyorum. Frontal lob, karmaşık karar verme ve planlamayı yönettiği gibi, her projeye stratejik düşünme ve yaratıcı problem çözme ile yaklaşıyorum.',
        'about.p2': 'Hücresel mekanizmaları incelemekten dijital ekosistemler inşa etmeye uzanan yolculuğum, en iyi çözümlerin genellikle sistemleri birden fazla seviyede anlamaktan geldiğini öğretti - mikroskobik detaylardan büyük resme kadar.',
        'about.metrics': 'Temel Metrikler',
        'about.experience': 'Yıllık Deneyim',
        'about.projects': 'Tamamlanan Proje',
        'about.coffee': 'Kahve Fincanı',
        'about.quote': 'Beyin, evrendeki en karmaşık yapıdır. Kod, kuma düşünmeyi öğretme şeklimizdir. Birlikte, insan anlayışının nihai sınırını temsil ederler.',

        // Yetenekler Bölümü
        'skills.title': 'Yetenekler ve Uzmanlık',
        'skills.subtitle': 'Parietal Lob • İşleme ve Entegrasyon',
        'skills.category.frontend': 'Frontend Geliştirme',
        'skills.category.backend': 'Backend ve Veritabanı',
        'skills.category.biology': 'Biyoloji ve Bilim',
        'skills.category.tools': 'Araçlar ve Teknolojiler',
        'skills.description': 'Parietal lob duyusal bilgiyi işlediği gibi, ben de çeşitli teknik becerileri sentezleyerek uyumlu çözümler oluşturuyorum.',

        // Projeler
        'projects.title': 'Öne Çıkan Projeler',
        'projects.subtitle': 'Temporal Lob • Hafıza ve Tanıma',
        'projects.work': 'Projeler ve Çalışmalar',
        'projects.workSubtitle': 'Temporal Lob • Hafıza ve Deneyim',

        // İletişim
        'contact.title': 'İletişime Geçin',
        'contact.subtitle': 'Occipital Lob • Görsel İşleme ve Bağlantı',
        'contact.heading': 'Geleceği birlikte',
        'contact.headingAccent': 'inşa edelim.',
        'contact.description': 'Bir fikriniz mi var? Bir projeniz mi? Ya da sadece teknoloji hakkında konuşmak mı istiyorsunuz? Gelen kutum her zaman açık.',
        'contact.form.name': 'İsim',
        'contact.form.email': 'E-posta',
        'contact.form.subject': 'Konu',
        'contact.form.message': 'Mesajınız...',
        'contact.form.send': 'Mesaj Gönder',
        'contact.form.sending': 'Gönderiliyor...',
        'contact.form.sent': 'Mesaj Gönderildi!',

        // Yükleme
        'loading.text': 'Nöral Ağ Yükleniyor...',

        // Tema
        'theme.light': 'Aydınlık Mod',
        'theme.dark': 'Karanlık Mod',
    }
};

export const useTranslation = () => {
    const { language } = useUI();

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    return { t, language };
};