import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthProps {
    isLogin?: boolean;
}

const Auth = ({ isLogin: initialIsLogin = true }: AuthProps) => {
    const [isLogin, setIsLogin] = useState(initialIsLogin);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'patient',
        name: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Please fill all fields');
            return;
        }

        // Mock authentication logic
        const mockUsers = [
            { email: 'patient@example.com', password: 'patient123', role: 'patient', name: 'John Patient' },
            { email: 'doctor@example.com', password: 'doctor123', role: 'doctor', name: 'Dr. Smith' },
            { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' }
        ];

        const user = mockUsers.find(u =>
            u.email === formData.email &&
            u.password === formData.password &&
            u.role === formData.role
        );

        if (user || formData.password === 'demo123') { // Allow demo123 for any email
            const activeUser = user || {
                email: formData.email,
                role: formData.role,
                name: formData.email.split('@')[0]
            };
            localStorage.setItem('user', JSON.stringify(activeUser));
            navigate(`/${activeUser.role}`);
        } else {
            setError('Invalid credentials for selected role');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-parchment overflow-hidden pt-20 relative">
            {/* Background Looping SVG Element */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] looper-bg z-0">
                <svg width="100%" height="100%" viewBox="0 0 1200 800" className="w-full h-full">
                    <motion.path
                        d="M0 200 Q 300 0 600 200 T 1200 200"
                        fill="none"
                        stroke="#3D6B47"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </div>

            {/* Visual Column */}
            <div className="hidden lg:block lg:col-span-5 bg-forest-dark relative overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.04] bg-grain-overlay mix-blend-overlay" />
                <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 space-y-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="w-24 h-24 bg-turmeric flex items-center justify-center rounded-3xl -rotate-12 group-hover:rotate-0 transition-transform duration-1000 shadow-2xl"
                    >
                        <Leaf className="text-forest-dark w-12 h-12" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 text-turmeric/40 mb-4">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Government Certified Node</span>
                        </div>
                        <h1 className="text-white text-6xl leading-[1.1]">
                            Welcome to <br />
                            <span className="italic text-turmeric underline decoration-white/10 underline-offset-8">Ancient</span> Care.
                        </h1>
                        <p className="text-parchment/60 font-serif text-2xl italic leading-relaxed max-w-sm">
                            "Connecting the heritage of Bharat with the digital pulse of wellness."
                        </p>
                    </motion.div>
                </div>

                {/* Hand-drawn element feel */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/5 rounded-full blur-xl animate-pulse" />
                <div className="absolute top-20 right-10 w-4 h-4 bg-turmeric/20 rounded-full" />
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 flex items-center justify-center p-8 sm:p-20 relative z-10">
                <div className="w-full max-w-md space-y-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-forest transition-colors transition-transform hover:-translate-x-2">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Gateway
                    </Link>

                    <header className="space-y-4">
                        <h2 className="text-5xl text-forest-dark tracking-tighter">
                            {isLogin ? 'Sign In' : 'Create Account'}<span className="text-turmeric text-2xl italic ml-2">.</span>
                        </h2>
                        <p className="text-text-secondary font-serif text-xl leading-relaxed">
                            {isLogin ? "Welcome back to your health journey. Proceed to your portal." : "Join the unified digital infrastructure for holistic Bharat."}
                        </p>
                    </header>

                    <form onSubmit={handleAuth} className="space-y-8">
                        {!isLogin && (
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary ml-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white border border-parchment-accent rounded-2xl px-8 py-5 focus:ring-4 focus:ring-forest/5 focus:border-forest outline-none transition-all duration-300 shadow-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white border border-parchment-accent rounded-2xl px-8 py-5 focus:ring-4 focus:ring-forest/5 focus:border-forest outline-none transition-all duration-300 shadow-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary ml-1">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-white border border-parchment-accent rounded-2xl px-8 py-5 focus:ring-4 focus:ring-forest/5 focus:border-forest outline-none transition-all duration-300 shadow-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {isLogin && (
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary ml-1">Role</label>
                                <select
                                    className="w-full bg-white border border-parchment-accent rounded-2xl px-8 py-5 focus:ring-4 focus:ring-forest/5 focus:border-forest outline-none transition-all duration-300 shadow-sm appearance-none"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="patient">Patient Portal</option>
                                    <option value="doctor">Practitioner Portal</option>
                                    <option value="admin">System Administrator</option>
                                </select>
                            </div>
                        )}

                        {error && <p className="text-alert text-xs font-bold leading-relaxed">{error}</p>}

                        <button type="submit" className="w-full btn-primary group !py-6 shadow-2xl shadow-forest/20">
                            {isLogin ? 'Enter Gateway Portal' : 'Register Secure Profile'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 text-[10px] font-bold text-text-secondary/40 uppercase tracking-[0.3em]">
                            <div className="flex-1 h-px bg-parchment-accent" />
                            <span>Demo Credentials</span>
                            <div className="flex-1 h-px bg-parchment-accent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { r: 'Patient', e: 'patient@example.com' },
                                { r: 'Doctor', e: 'doctor@example.com' },
                                { r: 'Admin', e: 'admin@example.com' }
                            ].map(credential => (
                                <button
                                    key={credential.r}
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        email: credential.e,
                                        password: credential.r.toLowerCase() + '123',
                                        role: credential.r.toLowerCase()
                                    })}
                                    className="p-4 border border-parchment-accent rounded-xl hover:bg-white transition-all text-left"
                                >
                                    <p className="text-[8px] font-bold uppercase text-terracotta mb-1">{credential.r}</p>
                                    <p className="text-[10px] font-sans font-medium text-text-secondary truncate">{credential.e}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center pt-8 border-t border-parchment-accent">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[10px] font-sans font-bold text-text-secondary hover:text-forest transition-colors flex items-center gap-4 mx-auto uppercase tracking-widest"
                        >
                            {isLogin ? "Don't have an account? Join Holistic Bharat" : "Already have a profile? Sign in"}
                            <div className="w-8 h-px bg-current transition-all" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
