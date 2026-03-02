import { motion } from 'framer-motion';
import { Leaf, Menu, X, User, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Platform', path: '/' },
        { name: 'Philosophy', path: '/' },
        { name: 'AYUSH', path: '/' },
        { name: 'Dashboards', path: '/patient' },
    ];

    return (
        <nav className={`fixed top-0 inset-x-0 z-[90] transition-all duration-700 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-2xl border-b border-parchment-accent shadow-sm' : 'py-8'
            }`}>
            <div className="editorial-layout flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-forest rounded-2xl flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-forest/20">
                        <Leaf className="text-parchment w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif font-bold text-2xl tracking-tighter text-forest-dark leading-none">VaidyaConnect</span>
                        <span className="text-[8px] font-sans font-bold uppercase tracking-[0.4em] text-terracotta mt-1">Heritage Gateway</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-[10px] font-sans font-bold text-text-secondary hover:text-forest transition-colors uppercase tracking-[0.3em] relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-px bg-turmeric group-hover:w-full transition-all duration-500" />
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/login" className="hidden sm:flex btn-ghost text-[10px] font-bold uppercase tracking-widest items-center gap-3 group">
                        <User className="w-4 h-4 group-hover:text-forest transition-colors" /> Sign In
                    </Link>
                    <Link to="/register" className="btn-primary !py-3 !px-10 !rounded-full text-[10px] shadow-lg shadow-forest/10 group">
                        Get Started <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="md:hidden text-forest-dark p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <div className="hidden lg:block ml-4">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Mobile Menu: Artisanal Overlap */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-parchment-accent overflow-hidden"
                >
                    <div className="p-12 space-y-10 flex flex-col items-center">
                        {navLinks.map((item, i) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-serif font-bold text-text-primary hover:text-forest transition-colors"
                            >
                                <span className="text-turmeric text-sm italic mr-2">0{i + 1}</span> {item.name}
                            </Link>
                        ))}
                        <div className="w-full h-px bg-parchment-accent" />
                        <div className="flex flex-col w-full gap-4">
                            <Link to="/register" onClick={() => setIsOpen(false)} className="w-full btn-primary !py-5">Get Started</Link>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full btn-secondary !py-5">Sign In</Link>
                        </div>
                        <div className="pt-4">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
