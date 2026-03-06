import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Menu, X, Cross, User } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

const navLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Ayurveda Care', path: '#ayurveda' },
    { label: 'Appointments', path: '/patient/book' },
];

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-[100] bg-dark h-16 flex items-center px-4 md:px-8">
            {/* Leftmost: Auth Actions */}
            <div className="flex items-center gap-2 mr-6 shrink-0">
                {isAuthenticated ? (
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 cursor-pointer transition-all hover:bg-white/15"
                        >
                            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-mono text-xs text-white hidden lg:inline">{user?.patientId || user?.name}</span>
                        </button>
                        {profileOpen && (
                            <div className="absolute left-0 top-12 bg-white border border-border rounded-xl shadow-popup p-2 w-48 z-50">
                                <div className="px-3 py-2 border-b border-border mb-1">
                                    <p className="font-heading font-semibold text-sm text-txt-primary">{user?.name}</p>
                                    <p className="font-mono text-xs text-txt-muted">{user?.role}</p>
                                </div>
                                <Link to={`/${user?.role}`} className="block px-3 py-2 text-sm text-txt-body hover:bg-surface-alt rounded" onClick={() => setProfileOpen(false)}>
                                    Dashboard
                                </Link>
                                <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-danger-subtle rounded cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Link to="/login" className="px-3 py-1.5 text-xs font-heading font-semibold text-white/80 hover:text-white transition-colors border border-white/10 rounded-md">
                            Login
                        </Link>
                        <Link to="/register" className="bg-primary text-white px-3 py-1.5 text-xs font-heading font-semibold rounded-md hover:bg-primary-dark transition-all">
                            Register
                        </Link>
                    </div>
                )}
            </div>

            {/* Logo & Name */}
            <Link to="/" className="flex items-center gap-2 shrink-0 mr-10">
                <Cross className="w-5 h-5 text-primary" strokeWidth={2.5} />
                <div className="flex flex-col leading-tight">
                    <span className="font-heading font-bold text-lg text-white tracking-tight">Sanjeevani</span>
                    <span className="text-[9px] font-heading font-semibold text-primary/80 uppercase tracking-widest -mt-0.5">AYUSH Health</span>
                </div>
            </Link>

            {/* Desktop Nav Links (Center/Left-leaning) */}
            <div className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`font-body font-medium text-sm transition-all duration-200 hover:text-primary ${location.pathname === link.path || (link.path.startsWith('#') && location.hash === link.path)
                            ? 'text-white'
                            : 'text-white/60'
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Right Side: Translator */}
            <div className="ml-auto flex items-center gap-4">
                <div className="hidden sm:block">
                    <LanguageSwitcher />
                </div>

                {/* Mobile hamburger */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white cursor-pointer">
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="absolute top-16 left-0 right-0 bg-dark border-t border-white/10 p-4 lg:hidden z-50 animate-fade-in shadow-2xl">
                    <div className="mb-4 sm:hidden">
                        <LanguageSwitcher />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className="block py-3 px-4 font-body text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
