import { motion } from 'framer-motion';
import { Calendar, Download, Pill, FileText, ChevronRight, Activity, Clock, Bell, Settings, Leaf, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
    return (
        <div className="min-h-screen bg-parchment-light transition-all duration-700 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

            {/* Editorial Header */}
            <header className="fixed top-0 inset-x-0 h-20 bg-white/50 backdrop-blur-xl border-b border-parchment-accent z-40 px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="font-serif font-bold text-2xl text-forest-dark">VaidyaConnect</Link>
                    <span className="w-px h-6 bg-parchment-accent mx-2" />
                    <span className="font-sans font-bold text-xs uppercase tracking-widest text-text-secondary">Patient Portal</span>
                </div>

                <div className="flex items-center gap-6">
                    <button className="relative p-2 text-text-secondary hover:text-forest transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-alert rounded-full border-2 border-white" />
                    </button>
                    <div className="flex items-center gap-3 pl-6 border-l border-parchment-accent">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-forest-dark uppercase tracking-widest leading-none">Ananya Mehta</p>
                            <p className="text-[10px] text-text-secondary mt-1">VCHN-008272</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-forest text-parchment flex items-center justify-center font-serif font-bold text-lg border-2 border-white shadow-sm">
                            AM
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="pt-20 flex min-h-screen">
                {/* Minimal Floating Sidebar */}
                <nav className="fixed left-8 top-32 w-20 bg-white/80 backdrop-blur-md border border-parchment-accent rounded-full p-2 space-y-4 shadow-xl z-30">
                    {[
                        { icon: Activity, label: 'Overview', active: true, path: '/patient' },
                        { icon: Calendar, label: 'Appts', path: '/patient/book' },
                        { icon: FileText, label: 'Reports', path: '/emr' },
                        { icon: Pill, label: 'Rx', path: '/patient' },
                        { icon: Settings, label: 'Prefs', path: '/patient' },
                    ].map((item, i) => (
                        <Link
                            key={i}
                            to={item.path}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group relative ${item.active ? 'bg-forest text-parchment' : 'text-text-secondary hover:bg-parchment'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="absolute left-24 px-3 py-1 bg-forest-dark text-parchment text-[10px] font-bold rounded-md uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                <main className="flex-1 ml-40 p-12 space-y-16 max-w-[1600px]">
                    {/* Welcome Message: Editorial style */}
                    <div className="asymmetric-grid !items-end">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-3 text-terracotta mb-2">
                                    <Leaf className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Daily Wellness Pulse</span>
                                </div>
                                <h1 className="text-6xl">Pranam, <span className="italic text-forest underline decoration-turmeric/20 underline-offset-8">Ananya</span>.</h1>
                                <p className="text-text-secondary text-xl max-w-xl font-serif">Your health journey continues today. The seasonal transitions suggest staying mindful of your Vata levels.</p>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-4 flex justify-end">
                            <Link to="/" className="btn-gold !rounded-full py-3.5 px-10 group">
                                Instant Triage <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Metrics Row: Asymmetric layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Next Appt', value: '24 Oct', sub: 'with Dr. Sharma', color: 'bg-forest', icon: Clock },
                            { label: 'Dosha Level', value: 'Vata+', sub: 'Mild Elevation', color: 'bg-terracotta', icon: Activity },
                            { label: 'Medicines', value: '03 Left', sub: 'Refill in 2 days', color: 'bg-turmeric', icon: Pill },
                            { label: 'Health Score', value: '84/100', sub: 'Improving weekly', color: 'bg-forest-dark', icon: Heart },
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="card-premium !p-8 group"
                                style={{ transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` }}
                            >
                                <div className="flex justify-between items-start mb-10 w-full">
                                    <div className={`p-4 rounded-xl ${m.color} text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                                        <m.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary">{m.label}</span>
                                </div>
                                <h3 className="text-4xl mb-2">{m.value}</h3>
                                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{m.sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Asymmetrical Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Appointments Timeline */}
                        <div className="lg:col-span-8 space-y-10">
                            <div className="flex justify-between items-center border-b border-parchment-accent pb-6">
                                <h2 className="text-4xl">Upcoming <span className="italic text-forest">Schedule</span></h2>
                                <Link to="/patient/book" className="text-[10px] font-bold text-forest uppercase tracking-[0.2em] hover:underline">Manage All</Link>
                            </div>

                            <div className="space-y-8 relative">
                                {/* Vertical connection line */}
                                <div className="absolute left-12 top-0 bottom-0 w-px bg-parchment-accent" />

                                {[
                                    { date: 'OCT 24', time: '10:00 AM', doctor: 'Dr. Ananya Sharma', type: 'Ayurveda', status: 'Confirmed' },
                                    { date: 'NOV 12', time: '02:30 PM', doctor: 'Dr. Rahul Varma', type: 'Yoga & Naturopathy', status: 'Pending' },
                                ].map((apt, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-12 relative z-10"
                                    >
                                        <div className="w-24 h-24 bg-parchment border border-parchment-accent rounded-full flex flex-col items-center justify-center shrink-0 shadow-sm group hover:border-forest transition-colors">
                                            <span className="text-[8px] font-bold text-text-secondary mb-1">DATE</span>
                                            <span className="font-serif font-bold text-lg text-forest-dark">{apt.date}</span>
                                        </div>

                                        <div className="flex-1 bg-white p-8 rounded-editorial border border-parchment-accent shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
                                            <div>
                                                <h4 className="text-2xl mb-1">{apt.doctor}</h4>
                                                <p className="text-xs font-sans text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                                    {apt.type} &bull; <Clock className="w-3 h-3 text-turmeric" /> {apt.time}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border ${apt.status === 'Confirmed' ? 'border-forest/20 bg-forest/5 text-forest' : 'border-turmeric/20 bg-turmeric/5 text-turmeric-dark'
                                                    }`}>
                                                    {apt.status.toUpperCase()}
                                                </span>
                                                <button className="p-3 bg-parchment rounded-full text-text-secondary hover:bg-forest hover:text-parchment transition-all">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Side Panel: Artisanal Insight Card */}
                        <div className="lg:col-span-4 self-start sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, rotate: 2 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                className="card-premium bg-forest-dark text-parchment !p-10 space-y-12 overflow-visible"
                            >
                                {/* Decorative "sticker" feel */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-turmeric rounded-full flex items-center justify-center text-forest-dark border-4 border-parchment-light shadow-2xl rotate-12">
                                    <Leaf className="w-8 h-8" />
                                </div>

                                <div className="space-y-6">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-parchment/50">Digital EMR Insight</span>
                                    <h3 className="text-white text-4xl leading-tight">Panchakarma <span className="italic">Readiness</span></h3>
                                    <p className="text-parchment/70 text-base leading-relaxed font-serif">
                                        Based on your recent Vata+ indicators and metabolic pulse, your body is showing optimal conditions for beginning basic Shodhana therapy.
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/10 space-y-6">
                                    <Link to="/emr" className="flex items-center justify-between group text-parchment hover:text-turmeric transition-colors">
                                        <span className="text-xs font-bold uppercase tracking-widest">Open Full EMR Report</span>
                                        <Download className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/patient/book" className="flex items-center justify-between group text-parchment hover:text-turmeric transition-colors">
                                        <span className="text-xs font-bold uppercase tracking-widest">Consult a Vaidya</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientDashboard;
