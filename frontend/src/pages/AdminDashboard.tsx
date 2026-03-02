import { motion } from 'framer-motion';
import { Users, Clock, Activity, TrendingUp, ShieldCheck, Globe, Database, Bell, LayoutPanelLeft, Layers, PieChart, ShieldAlert } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';

const revenueData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 5000 },
    { month: 'Apr', amount: 4500 },
    { month: 'May', amount: 6000 },
    { month: 'Jun', amount: 5500 },
];

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-parchment-light transition-all duration-700 relative overflow-hidden">
            {/* Background Texture: Minimalist looping accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-forest/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-turmeric/5 rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/2" />

            {/* Editorial Header */}
            <header className="fixed top-0 inset-x-0 h-20 bg-forest-dark border-b border-white/10 z-40 px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="font-serif font-bold text-2xl text-parchment">VaidyaConnect</Link>
                    <span className="w-px h-6 bg-white/10 mx-2" />
                    <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-turmeric">System Administration</span>
                </div>

                <div className="flex items-center gap-6">
                    <button className="p-2 text-parchment/60 hover:text-parchment transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-alert rounded-full" />
                    </button>
                    <div className="flex items-center gap-3 pl-6 border-l border-white/10 text-parchment">
                        <div className="text-right">
                            <p className="text-xs font-bold uppercase tracking-widest leading-none">Admin Authority</p>
                            <p className="text-[10px] text-parchment/40 mt-1">Gujarat Health Div.</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-parchment text-forest-dark flex items-center justify-center font-serif font-bold text-lg border-2 border-white/20 shadow-xl">
                            GA
                        </div>
                    </div>
                </div>
            </header>

            <div className="pt-20 flex min-h-screen">
                {/* Minimal Floating Sidebar */}
                <nav className="fixed left-8 top-32 w-20 bg-white/90 backdrop-blur-xl border border-parchment-accent rounded-full p-2 space-y-4 shadow-2xl z-30">
                    {[
                        { icon: LayoutPanelLeft, label: 'Control', active: true, path: '/admin' },
                        { icon: Users, label: 'System', path: '/admin' },
                        { icon: Globe, label: 'Regional', path: '/admin' },
                        { icon: Database, label: 'Storage', path: '/admin' },
                        { icon: ShieldCheck, label: 'Sec', path: '/admin' },
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
                    {/* Hero Section: High Impact Editorial */}
                    <div className="asymmetric-grid !items-end">
                        <div className="lg:col-span-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="flex items-center gap-4 text-terracotta mb-6">
                                    <Layers className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Network Intelligence Hub</span>
                                </div>
                                <h1 className="text-6xl md:text-7xl">Pulse of the <span className="italic text-forest underline decoration-turmeric/30 underline-offset-8">Heritage</span>.</h1>
                                <p className="text-text-secondary text-xl max-w-2xl font-serif mt-8 leading-relaxed">
                                    Monitoring real-time health infrastructure across Bharat's digital AYUSH gateway. System status is currently stable with optimal performance indicators.
                                </p>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-4 flex justify-end gap-6">
                            <button className="btn-secondary !rounded-full py-4 px-10">Export CSV</button>
                            <button className="btn-primary !rounded-full py-4 px-10 shadow-xl">System Snapshot</button>
                        </div>
                    </div>

                    {/* High Level Metrics: Editorial Spread */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { label: 'Total Patients', value: '42,802', growth: '+12%', icon: Users, color: 'bg-forest' },
                            { label: 'Network Latency', value: '4.2ms', growth: '-0.5ms', icon: Clock, color: 'bg-terracotta' },
                            { label: 'Active Facilities', value: '184', growth: '+3 New', icon: Globe, color: 'bg-turmeric' },
                            { label: 'System Uptime', value: '99.9%', growth: 'Stable', icon: Activity, color: 'bg-forest-dark' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="card-premium !p-10 group relative overflow-visible"
                                style={{ transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` }}
                            >
                                <div className="flex justify-between items-start mb-12 w-full">
                                    <div className={`p-4 rounded-2xl ${stat.color} text-parchment shadow-2xl group-hover:rotate-12 transition-transform`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary">{stat.label}</span>
                                        <p className="text-[10px] font-bold text-success mt-1">{stat.growth}</p>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <h3 className="text-5xl">{stat.value}</h3>
                                    <TrendingUp className="w-5 h-5 text-success animate-pulse" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Analytics: Full Spread Editorial */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
                        <div className="lg:col-span-12 card-premium !p-16 space-y-16 bg-white relative overflow-visible">
                            {/* Decorative hand-drawn element */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 border border-forest/10 rounded-full animate-pulse-slow pointer-events-none" />

                            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-text-secondary">
                                        <PieChart className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Infrastructure Usage Analysis</span>
                                    </div>
                                    <h3 className="text-4xl">System <span className="italic text-forest">Activity</span> Trends</h3>
                                    <p className="text-text-secondary max-w-xl text-lg font-serif">
                                        A visual representation of platform engagement across the national AYUSH network over the previous quarter.
                                    </p>
                                </div>

                                <div className="flex gap-12 bg-parchment p-8 rounded-editorial border border-parchment-accent group">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-2">Network Health</p>
                                        <h4 className="text-3xl text-forest">98% <span className="text-sm font-serif italic">Operational</span></h4>
                                    </div>
                                    <div className="w-px h-12 bg-parchment-dark self-center" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-2">Total Load</p>
                                        <h4 className="text-3xl text-terracotta">2.4m <span className="text-sm font-serif italic">Queries</span></h4>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[450px] w-full pt-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3D6B47" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3D6B47" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#EDE7DD" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#5C5147', fontWeight: 'bold' }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#5C5147' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1C2B1E',
                                                border: 'none',
                                                borderRadius: '24px',
                                                color: '#F7F3EE',
                                                padding: '20px',
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                                            }}
                                            itemStyle={{ color: '#F7F3EE', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#3D6B47"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorAmt)"
                                            animationDuration={3000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Visual Breakdown Side-by-Side: Overlapping Feel */}
                        <div className="lg:col-span-12 flex flex-col md:flex-row gap-12">
                            <div className="flex-1 card-premium !p-12 space-y-10 group bg-parchment-dark border-none">
                                <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center mb-6">
                                    <ShieldAlert className="w-6 h-6 text-alert" />
                                </div>
                                <h4 className="text-3xl">Active <span className="italic">Threat</span> Monitoring</h4>
                                <p className="text-text-secondary leading-relaxed font-serif">
                                    Real-time security auditing across all node endpoints. No protocol violations detected in the last 24-hour cycle.
                                </p>
                                <button className="text-xs font-bold uppercase tracking-widest text-forest group-hover:underline">Review Security Logs</button>
                            </div>
                            <div className="flex-1 card-premium !p-12 space-y-10 group bg-terracotta text-parchment border-none">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                                    <LayoutPanelLeft className="w-6 h-6 text-turmeric" />
                                </div>
                                <h4 className="text-3xl text-white">Network <span className="italic">Optimization</span></h4>
                                <p className="text-parchment/70 leading-relaxed font-serif">
                                    Predictive balancing of regional node resources based on historical AYUSH facility demand cycles.
                                </p>
                                <button className="text-xs font-bold uppercase tracking-widest text-turmeric group-hover:underline">Adjust Allocation</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
