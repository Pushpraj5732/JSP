import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
        { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    ];

    const handleLanguageChange = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem('i18nextLng', code);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-parchment-accent hover:border-forest/30 transition-all group"
            >
                <Globe className="w-4 h-4 text-forest/40 group-hover:text-forest transition-colors" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-text-secondary">{currentLanguage.label}</span>
                <ChevronDown className={`w-3 h-3 text-text-secondary transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-48 bg-white/90 backdrop-blur-xl border border-parchment-accent rounded-2xl shadow-2xl p-2 z-[100] overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-[0.03] bg-grain-overlay pointer-events-none" />
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${i18n.language === lang.code
                                    ? 'bg-forest/5 text-forest'
                                    : 'hover:bg-parchment-dark text-text-secondary'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">{lang.flag}</span>
                                    <span className="text-xs font-sans font-bold uppercase tracking-widest">{lang.label}</span>
                                </div>
                                {i18n.language === lang.code && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-turmeric shrink-0" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
