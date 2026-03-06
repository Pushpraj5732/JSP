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
        { code: 'sa', label: 'संस्कृतम्', flag: '🇮🇳' },
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
                className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/20 hover:border-primary/50 transition-all group bg-white/5"
            >
                <Globe className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-white/80">{currentLanguage.label}</span>
                <ChevronDown className={`w-3 h-3 text-white/60 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-48 bg-white border border-border rounded-xl shadow-popup p-2 z-[100] overflow-hidden"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${i18n.language === lang.code
                                    ? 'bg-primary/5 text-primary'
                                    : 'hover:bg-surface-alt text-txt-body'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">{lang.flag}</span>
                                    <span className="text-xs font-heading font-bold uppercase tracking-widest">{lang.label}</span>
                                </div>
                                {i18n.language === lang.code && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
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
