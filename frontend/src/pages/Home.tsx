import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmergencyTriage from '../components/EmergencyTriage';

const Home = () => {
    return (
        <div className="relative min-h-screen">

            <main className="page-transition">
                {/* Editorial Hero Section */}
                <section id="platform" className="min-h-screen flex items-center relative overflow-hidden pt-32 pb-20">
                    {/* Artisanal Looping Line Decoration */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 looper-bg">
                        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="w-full h-full">
                            <motion.path
                                d="M-100 400 Q 300 100 600 400 T 1300 400"
                                fill="none"
                                stroke="#3D6B47"
                                strokeWidth="1"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>
                    </div>

                    <div className="editorial-layout grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                        <div className="lg:col-span-8 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="w-12 h-px bg-terracotta" />
                                    <span className="text-terracotta font-sans font-bold uppercase tracking-[0.3em] text-xs">
                                        National AYUSH Gateway
                                    </span>
                                </div>
                                <h1 className="text-text-primary">
                                    Ancient <span className="italic text-forest underline decoration-turmeric/30 underline-offset-8">Wisdom</span>. <br />
                                    Modern Care <span className="text-forest text-6xl md:text-8xl">.</span>
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="flex flex-col md:flex-row gap-8 items-start md:items-center"
                            >
                                <Link to="/register" className="btn-gold !px-12 group">
                                    Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ml-4" />
                                </Link>

                                <div className="max-w-xs">
                                    <p className="text-sm text-text-secondary italic font-serif leading-relaxed">
                                        Empowering Bharat through a unified digital medicinal heritage. Built for the citizens, by health visionaries.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-4 relative flex justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5 }}
                                className="card-premium aspect-[4/5] w-full max-w-sm gradient-mesh !p-0 overflow-hidden"
                                style={{ transform: 'rotate(-2deg)' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
                                    alt="heritage"
                                    className="w-full h-full object-cover opacity-90 mix-blend-multiply transition-transform hover:scale-105 duration-[5s]"
                                />
                                <div className="absolute inset-x-8 bottom-12">
                                    <div className="h-px bg-white/30 mb-6 w-12" />
                                    <p className="font-serif italic text-white text-2xl leading-snug">"Heal yourself with the power of nature and tradition."</p>
                                </div>
                            </motion.div>

                            {/* Hand-drawn element feel */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-forest/10 rounded-full animate-pulse pointer-events-none" />
                        </div>
                    </div>

                    {/* Editorial background text */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-serif font-bold text-parchment-accent/20 select-none -z-10 tracking-tighter whitespace-nowrap overflow-hidden">
                        AYUSH•CARE•HERITAGE•BHAARAT
                    </div>
                </section>

                {/* Integration: Emergency Triage */}
                <div id="ayush" className="bg-white border-y border-parchment-accent relative z-10 py-10">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-8">
                        <h3 className="text-2xl font-serif italic text-forest-dark">Symptom Assessment</h3>
                    </div>
                    <EmergencyTriage />
                </div>

                {/* Philosophy / Features Section */}
                <section id="philosophy" className="editorial-layout py-30 space-y-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="max-w-2xl">
                            <h2 className="mb-6">The Pillars of <span className="italic text-terracotta">Holistic</span> Wellness.</h2>
                            <p className="text-text-secondary text-xl font-serif leading-relaxed">
                                Integrating centuries of Indian medicinal heritage with cutting-edge digital infrastructure to provide a unified health experience.
                            </p>
                        </div>
                        <Link to="/about" className="btn-secondary !rounded-full !px-10">Learn More</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: 'Unified EMR', desc: 'Secure, paperless medical records accessible across every AYUSH branch nationwide.', icon: <ShieldCheck /> },
                            { title: 'Vernacular AI', desc: 'Consult in your native language with our symptom checker fluent in 12+ Indian tongues.', icon: <Globe /> },
                            { title: 'Heritage Certified', desc: 'Every practitioner and facility is verified by government health authorities.', icon: <Leaf /> },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="card-premium !rounded-editorial group"
                            >
                                <div className="w-16 h-16 bg-parchment-dark text-forest rounded-2xl flex items-center justify-center mb-10 group-hover:bg-forest group-hover:text-parchment transition-all duration-500">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl mb-4">{f.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
