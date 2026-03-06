import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    CalendarDays, Pill, FileText, Stethoscope, Plus, ChevronRight, MessageSquare, SendHorizontal, QrCode
} from 'lucide-react';

export default function PatientDashboard() {
    const { user } = useAuth();

    const metrics = [
        { label: 'Next Appointment', value: '—', sub: 'No upcoming', icon: CalendarDays, span: 'col-span-1 sm:col-span-2 lg:col-span-3', color: 'text-primary', iconBg: 'bg-red-50' },
        { label: 'Active Prescriptions', value: '0', sub: 'Last 30 days', icon: Pill, span: 'col-span-1 sm:col-span-1 lg:col-span-2', color: 'text-accent', iconBg: 'bg-orange-50' },
        { label: 'Total EMR Entries', value: '0', sub: 'Lifetime', icon: FileText, span: 'col-span-1 sm:col-span-1 lg:col-span-2', color: 'text-secondary', iconBg: 'bg-emerald-50' },
        { label: 'Last Doctor Visit', value: '—', sub: 'No visits yet', icon: Stethoscope, span: 'col-span-1 sm:col-span-2 lg:col-span-3', color: 'text-dark', iconBg: 'bg-slate-100' },
    ];

    return (
        <div className="page-enter max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading font-bold text-[32px] text-dark">
                        Good morning{user?.name ? `, ${user.name}` : ''}.
                    </h1>
                    <p className="font-mono text-sm text-txt-muted mt-1">
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* ── Main Content ── */}
                <div className="flex-1 space-y-6">
                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-4">
                        {metrics.map((m, i) => (
                            <div key={i} className={`${m.span} bg-white border border-border rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${m.iconBg}`}>
                                    <m.icon className={`w-5 h-5 ${m.color}`} />
                                </div>
                                <div>
                                    <p className="font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">{m.label}</p>
                                    <p className="font-heading font-bold text-2xl text-dark mt-1">{m.value}</p>
                                    <p className="font-body text-xs text-txt-muted mt-0.5">{m.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Appointments Table */}
                    <div className="bg-white border border-border shadow-sm rounded-xl overflow-hidden">
                        <div className="bg-slate-50 border-b border-border px-6 py-4 flex items-center justify-between">
                            <h3 className="font-heading font-bold text-lg text-dark">
                                Upcoming Appointments
                            </h3>
                            <Link to="/patient/book" className="flex items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-heading font-semibold transition-colors">
                                <Plus className="w-4 h-4" /> Book New
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-white">
                                        <th className="text-left px-6 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Doctor</th>
                                        <th className="text-left px-6 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Specialization</th>
                                        <th className="text-left px-6 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Date & Time</th>
                                        <th className="text-left px-6 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Status</th>
                                        <th className="text-right px-6 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr>
                                        <td colSpan={5} className="text-center py-16">
                                            <CalendarDays className="w-10 h-10 text-txt-muted/30 mx-auto mb-3" />
                                            <p className="font-heading font-semibold text-txt-primary">No upcoming appointments</p>
                                            <p className="font-body text-sm text-txt-muted mt-1">Schedule a visit with our specialists today.</p>
                                            <Link to="/patient/book" className="btn-secondary text-sm mt-4 inline-flex items-center gap-1 px-4 py-2">
                                                Book Consultation <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── Right Panel ── */}
                <div className="w-full lg:w-[320px] space-y-6 shrink-0">
                    {/* ID Card Preview */}
                    <div className="bg-gradient-to-br from-dark to-[#101b2d] rounded-xl p-6 shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
                        {/* Decorative background */}
                        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full border-4 border-white/5 group-hover:scale-110 transition-transform"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-heading font-semibold text-xs text-primary uppercase tracking-widest bg-white/10 px-2 py-1 rounded border border-white/10">
                                    Digital ID
                                </span>
                                <QrCode className="w-5 h-5 text-white/40" />
                            </div>

                            <div>
                                <p className="font-heading font-bold text-xl text-white tracking-wide">{user?.name || '—'}</p>
                                <p className="font-mono text-sm text-white/60 mt-1">{user?.patientId || 'ID-000000'}</p>
                            </div>

                            <Link to="/patient/id-card" className="mt-6 flex items-center justify-center w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-heading font-semibold rounded border border-white/20 transition-colors">
                                View Full Card
                            </Link>
                        </div>
                    </div>

                    {/* Chatbot Quick Access */}
                    <div className="bg-white border border-border shadow-sm rounded-xl overflow-hidden pointer-events-auto">
                        <div className="bg-slate-50 border-b border-border px-5 py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                <MessageSquare className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-heading font-bold text-sm text-dark">Symptom Checker</span>
                        </div>
                        <div className="p-5">
                            <p className="font-body text-xs text-txt-muted mb-4 leading-relaxed">Describe your symptoms to our medical AI assistant for instant guidance.</p>
                            <div className="flex gap-2">
                                <input type="text" className="w-full bg-slate-50 border border-border rounded text-sm px-3 py-2 outline-none focus:border-dark focus:ring-1 focus:ring-dark transition-all" placeholder="E.g. Headache and fever..." />
                                <button className="w-10 h-10 bg-primary text-white rounded flex items-center justify-center shrink-0 cursor-pointer hover:bg-primary-dark shadow-sm transition-colors">
                                    <SendHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                            <Link to="/patient/chatbot" className="w-full mt-3 flex items-center justify-center text-xs font-heading font-semibold text-primary hover:text-dark transition-colors py-2">
                                Open Full Application <ChevronRight className="w-3 h-3 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
