import { useState } from 'react';
import { ScrollText, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminAuditLog() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [logs] = useState<any[]>([]);
    const [eventFilter, setEventFilter] = useState('ALL');

    const eventTypes = ['ALL', 'LOGIN', 'EMR_CREATE', 'QR_DECRYPT', 'STATUS_CHANGE'];

    const eventColor = (type: string) => {
        switch (type) {
            case 'QR_DECRYPT': return 'badge-red';
            case 'EMR_CREATE': return 'badge-green';
            case 'LOGIN': return 'badge-orange';
            case 'STATUS_CHANGE': return 'badge-blue';
            default: return 'badge-navy';
        }
    };

    return (
        <div className="page-enter">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-6">Audit Log</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex gap-2">
                    <input type="date" className="input py-2 text-sm w-auto" />
                    <span className="font-body text-sm text-txt-muted self-center">to</span>
                    <input type="date" className="input py-2 text-sm w-auto" />
                </div>
                <div className="flex gap-1.5 ml-auto flex-wrap">
                    {eventTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setEventFilter(type)}
                            className={`px-3 py-1.5 rounded text-xs font-heading font-semibold transition-all cursor-pointer border ${eventFilter === type
                                ? 'bg-dark text-white border-dark'
                                : 'bg-white text-txt-muted border-border hover:border-dark/30'
                                }`}
                        >
                            {type.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Audit Log Table */}
            <div className="card-flat overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="table-header">
                                <th className="text-left px-5 py-3">Timestamp</th>
                                <th className="text-left px-5 py-3">Actor ID</th>
                                <th className="text-left px-5 py-3">Action</th>
                                <th className="text-left px-5 py-3">Target ID</th>
                                <th className="text-right px-5 py-3">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16">
                                        <ScrollText className="w-10 h-10 text-txt-muted mx-auto mb-3" />
                                        <p className="font-body text-sm text-txt-muted">No audit entries found</p>
                                        <p className="font-mono text-xs text-txt-muted mt-1">System events will be logged here</p>
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log: any) => (
                                    <>
                                        <tr key={log.id} className="table-row">
                                            <td className="px-5 py-3 font-mono text-[11px] text-txt-muted">{log.timestamp}</td>
                                            <td className="px-5 py-3 font-mono text-xs text-txt-body">{log.actorId}</td>
                                            <td className="px-5 py-3">
                                                <span className={`badge ${eventColor(log.action)} text-[10px]`}>{log.action}</span>
                                            </td>
                                            <td className="px-5 py-3 font-mono text-xs text-txt-body">{log.targetId}</td>
                                            <td className="px-5 py-3 text-right">
                                                <button
                                                    onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                                                    className="text-txt-muted hover:text-txt-primary cursor-pointer"
                                                >
                                                    {expanded === log.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                </button>
                                            </td>
                                        </tr>
                                        {expanded === log.id && (
                                            <tr key={`${log.id}-meta`}>
                                                <td colSpan={5} className="px-5 py-3">
                                                    <div className="bg-dark rounded-lg p-4 animate-fade-up">
                                                        <pre className="font-mono text-[11px] text-secondary-subtle whitespace-pre-wrap">
                                                            {JSON.stringify(log.metadata, null, 2)}
                                                        </pre>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
