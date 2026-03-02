import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Plus, FileText, Video, Users, Clock, Bell, Search, ChevronRight, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-parchment-light transition-all duration-700 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-turmeric/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

            {/* Editorial Header */}
            <header className="fixed top-0 inset-x-0 h-20 bg-white/50 backdrop-blur-xl border-b border-parchment-accent z-40 px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="font-serif font-bold text-2xl text-forest-dark">VaidyaConnect</Link>
                    <span className="w-px h-6 bg-parchment-accent mx-2" />
                    <span className="font-sans font-bold text-xs uppercase tracking-widest text-text-secondary">Practitioner Portal</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input type="text" placeholder="Search patients..." className="bg-parchment border border-parchment-accent rounded-full pl-10 pr-4 py-2 text-xs outline-none focus:border-forest transition-all" />
                    </div>
                    <button className="p-2 text-text-secondary hover:text-forest transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3 pl-6 border-l border-parchment-accent">
                        <div className="text-right">
                            <p className="text-xs font-bold text-forest-dark uppercase tracking-widest leading-none">Dr. Ananya Sharma</p>
                            <p className="text-[10px] text-text-secondary mt-1">Ayurvedic MD</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-turmeric text-forest-dark flex items-center justify-center font-serif font-bold text-lg border-2 border-white shadow-sm">
                            AS
                        </div>
                    </div>
                </div>
            </header>

            <div className="pt-20 flex min-h-screen">
                {/* Minimal Floating Sidebar */}
                <nav className="fixed left-8 top-32 w-16 bg-forest-dark rounded-full p-2 space-y-4 shadow-xl z-30">
                    {[
                        { icon: PlayCircle, label: 'Queue', active: true, path: '/doctor' },
                        { icon: Users, label: 'Patients', path: '/doctor' },
                        { icon: Clock, label: 'Schedule', path: '/doctor' },
                        { icon: FileText, label: 'Records', path: '/emr' },
                        { icon: Video, label: 'Telehealth', path: '/doctor' },
                    ].map((item, i) => (
                        <Link
                            key={i}
                            to={item.path}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group relative ${item.active ? 'bg-turmeric text-forest-dark' : 'text-parchment/60 hover:text-parchment'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="absolute left-20 px-3 py-1 bg-forest-dark text-parchment text-[10px] font-bold rounded-md uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                <main className="flex-1 ml-32 p-12 space-y-16 max-w-[1600px]">
                    {/* Hero: Editorial Style */}
                    <div className="asymmetric-grid !items-end">
                        <div className="lg:col-span-8">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="flex items-center gap-4 text-forest-dark mb-4">
                                    <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Overview</span>
                                </div>
                                <h1 className="text-6xl">Your <span className="italic text-forest underline decoration-terracotta/20 underline-offset-8">Focus</span> Today.</h1>
                                <p className="text-text-secondary text-xl max-w-xl font-serif mt-6">
                                    {selectedPatient ? `Currently reviewing clinical history for ${selectedPatient}.` : '8 consultations scheduled across Ayurveda and Siddha departments. 2 priority triage alerts remaining.'}
                                </p>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-4 flex justify-end">
                            <button className="btn-primary !rounded-full py-4 px-10 group shadow-xl">
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> New Consultation
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Patient Queue: Editorial list */}
                        <div className="lg:col-span-8 space-y-10">
                            <header className="flex justify-between items-center border-b border-parchment-accent pb-6">
                                <h3 className="text-3xl font-serif">Awaiting <span className="italic text-terracotta">Consultation</span></h3>
                                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Live Queue &bull; 3 Active</span>
                            </header>

                            <div className="space-y-6">
                                {[
                                    { name: 'Ananya Mehta', time: '10:00 AM', reason: 'Vata Imbalance Triage', priority: 'High', color: 'border-alert', colorBg: 'bg-alert/5' },
                                    { name: 'Rajiv Patel', time: '10:45 AM', reason: 'Post-Panchakarma Review', priority: 'Medium', color: 'border-turmeric', colorBg: 'bg-turmeric/5' },
                                    { name: 'Meera Das', time: '11:30 AM', reason: 'Siddha Diet Consultation', priority: 'Low', color: 'border-forest', colorBg: 'bg-forest/5' },
                                ].map((p, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className={`p-8 rounded-editorial border-l-8 ${p.color} ${p.colorBg || 'bg-white'} shadow-sm flex items-center justify-between cursor-pointer group transition-all duration-500 hover:shadow-2xl hover:bg-white`}
                                        onClick={() => setSelectedPatient(p.name)}
                                    >
                                        <div className="flex items-center gap-10">
                                            <div className="w-20 h-20 bg-parchment rounded-2xl flex flex-col items-center justify-center font-serif font-bold text-forest-dark shadow-inner">
                                                <span className="text-[8px] text-text-secondary mb-1">TIME</span>
                                                {p.time.split(' ')[0]}
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-bold group-hover:text-forest transition-colors">{p.name}</h4>
                                                <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] mt-2">{p.reason}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary block mb-1">Status</span>
                                                <span className={`text-[10px] font-bold uppercase ${p.priority === 'High' ? 'text-alert' : 'text-forest'}`}>{p.priority} Priority</span>
                                            </div>
                                            <button className="w-12 h-12 bg-parchment-dark rounded-full flex items-center justify-center group-hover:bg-forest group-hover:text-parchment transition-all">
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Side Panel: Metrics & Reports */}
                        <div className="lg:col-span-4 space-y-10 self-start sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="card-premium bg-forest-dark text-parchment !p-10 space-y-12 overflow-visible"
                            >
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center rotate-12 pointer-events-none">
                                    <Activity className="w-10 h-10 text-turmeric opacity-50" />
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-turmeric uppercase tracking-[0.3em] text-[10px] font-bold">Daily Statistics</h4>
                                    <div className="space-y-8 pt-6">
                                        {[
                                            { label: 'Total Consultations', value: '12', sub: 'Today' },
                                            { label: 'Avg. Assessment', value: '4.2m', sub: 'Triage Response' },
                                            { label: 'Practitioner Rating', value: '4.9', sub: 'Vaidya Hub Score' },
                                        ].map((stat, i) => (
                                            <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4">
                                                <div className="space-y-1">
                                                    <span className="text-sm font-serif text-parchment/60 uppercase tracking-widest">{stat.label}</span>
                                                    <p className="text-[10px] text-turmeric uppercase font-bold tracking-widest">{stat.sub}</p>
                                                </div>
                                                <span className="text-4xl font-bold">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <div className="card-premium bg-white !p-10 relative overflow-visible transform rotate-1">
                                <div className="absolute top-0 right-10 w-12 h-12 bg-parchment rounded-b-xl flex items-center justify-center shadow-lg">
                                    <FileText className="w-5 h-5 text-terracotta" />
                                </div>
                                <h4 className="text-forest uppercase tracking-[0.3em] text-[10px] font-bold mb-8">Recent Alerts</h4>
                                <div className="space-y-6">
                                    {[1, 2].map(i => (
                                        <div key={i} className="flex items-start gap-4 text-sm text-text-primary group cursor-pointer">
                                            <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0" />
                                            <div>
                                                <p className="font-bold underline decoration-success/20 underline-offset-4">Lab results: Rajiv P.</p>
                                                <p className="text-[10px] text-text-secondary uppercase tracking-widest mt-1">Uploaded 2h ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorDashboard;
