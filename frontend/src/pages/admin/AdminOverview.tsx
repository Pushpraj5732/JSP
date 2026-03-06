import { Users, Stethoscope, CalendarDays, MessageSquare, ScrollText, Clock } from 'lucide-react';

export default function AdminOverview() {
    const kpis = [
        { label: 'Total Patients', value: '0', icon: Users, bg: 'bg-[#FDE8E8]' },
        { label: 'Total Doctors', value: '0', icon: Stethoscope, bg: 'bg-[#D4EDDA]' },
        { label: 'Appointments Today', value: '0', icon: CalendarDays, bg: 'bg-[#FEF3CD]' },
        { label: 'Chatbot Sessions', value: '0', icon: MessageSquare, bg: 'bg-[#D6EAF8]' },
    ];

    return (
        <div className="page-enter">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-8">Admin Overview</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {kpis.map((kpi, i) => (
                    <div key={i} className={`${kpi.bg} border border-border rounded-xl p-5 stagger-${i + 1} page-enter`}>
                        <div className="w-10 h-10 bg-white/60 rounded-lg flex items-center justify-center mb-3">
                            <kpi.icon className="w-5 h-5 text-txt-primary" />
                        </div>
                        <p className="font-heading font-bold text-[48px] text-txt-primary leading-none">{kpi.value}</p>
                        <p className="font-mono text-xs text-txt-muted mt-1">{kpi.label}</p>
                    </div>
                ))}
            </div>

            {/* Two Column */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
                {/* Recent Users */}
                <div className="card-flat overflow-hidden">
                    <div className="bg-dark px-5 py-3">
                        <span className="font-heading font-semibold text-[11px] text-white uppercase tracking-wider">
                            Recent Users
                        </span>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left px-5 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Name</th>
                                <th className="text-left px-5 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Role</th>
                                <th className="text-left px-5 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Registered</th>
                                <th className="text-left px-5 py-3 font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4} className="text-center py-12">
                                    <Users className="w-8 h-8 text-txt-muted mx-auto mb-2" />
                                    <p className="font-body text-sm text-txt-muted">No users registered yet</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* System Events */}
                <div className="card-flat">
                    <div className="flex items-center gap-2 mb-5">
                        <ScrollText className="w-4 h-4 text-primary" />
                        <h3 className="font-heading font-semibold text-lg text-txt-primary">System Events</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center py-10">
                        <Clock className="w-8 h-8 text-txt-muted mb-2" />
                        <p className="font-body text-sm text-txt-muted">No recent events</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
