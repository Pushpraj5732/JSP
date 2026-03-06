import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface EmrRecord {
    id: string;
    date: string;
    doctor: string;
    diagnosis: string;
    symptoms: string[];
    prescription: string[];
    severity: 'HIGH' | 'MODERATE' | 'LOW';
    treatmentNotes: string;
    followUp?: string;
}

export default function EmrViewer() {
    const [filter, setFilter] = useState<string>('ALL');
    const [expanded, setExpanded] = useState<string | null>(null);
    const [records] = useState<EmrRecord[]>([]);

    const severityBar = (s: string) => {
        if (s === 'HIGH') return 'border-l-brand-red bg-primary';
        if (s === 'MODERATE') return 'border-l-brand-orange bg-accent';
        return 'border-l-brand-green bg-secondary';
    };

    const severityBadge = (s: string) => {
        if (s === 'HIGH') return 'badge-red';
        if (s === 'MODERATE') return 'badge-orange';
        return 'badge-green';
    };

    const filters = ['ALL', 'LOW', 'MODERATE', 'HIGH'];

    return (
        <div className="page-enter max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-6">Medical Records</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex gap-2 items-center">
                    <input type="date" className="input py-2 text-sm w-auto" />
                    <span className="font-body text-sm text-txt-muted">to</span>
                    <input type="date" className="input py-2 text-sm w-auto" />
                </div>
                <div className="flex gap-1.5 ml-auto">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded text-xs font-heading font-semibold transition-all cursor-pointer border ${filter === f
                                ? 'bg-dark text-white border-dark'
                                : 'bg-white text-txt-muted border-border hover:border-dark/30'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Records */}
            {records.length === 0 ? (
                <div className="card-flat flex flex-col items-center justify-center py-16">
                    <FileText className="w-10 h-10 text-txt-muted mb-3" />
                    <p className="font-body text-sm text-txt-muted">No medical records found</p>
                    <p className="font-mono text-xs text-txt-muted mt-1">Records will appear here after doctor visits</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {records
                        .filter((r) => filter === 'ALL' || r.severity === filter)
                        .map((record) => (
                            <div key={record.id} className="card-flat overflow-hidden relative">
                                {/* Severity Bar */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${severityBar(record.severity)}`} />

                                {/* Header */}
                                <div className="flex items-start justify-between pl-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="font-mono text-xs text-txt-muted">{record.date}</p>
                                            <span className={`badge ${severityBadge(record.severity)} text-[10px]`}>{record.severity}</span>
                                        </div>
                                        <p className="font-heading font-semibold text-[15px] text-txt-primary">{record.doctor}</p>
                                    </div>
                                    <button
                                        onClick={() => setExpanded(expanded === record.id ? null : record.id)}
                                        className="text-txt-muted hover:text-txt-primary cursor-pointer"
                                    >
                                        {expanded === record.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Expanded Content */}
                                {expanded === record.id && (
                                    <div className="pl-4 mt-4 pt-4 border-t border-border space-y-4 animate-fade-up">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider mb-1">Diagnosis</p>
                                                <p className="font-body text-sm text-txt-primary">{record.diagnosis}</p>
                                            </div>
                                            <div>
                                                <p className="font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider mb-1">Symptoms</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {record.symptoms.map((s, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-surface-alt border border-border rounded text-xs font-body text-txt-body">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider mb-1">Prescription</p>
                                            <ul className="space-y-1">
                                                {record.prescription.map((p, i) => (
                                                    <li key={i} className="font-mono text-sm text-txt-body">• {p}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        {record.treatmentNotes && (
                                            <div className="bg-surface-alt border-l-[3px] border-dark px-4 py-3 rounded-r">
                                                <p className="font-heading font-semibold text-xs text-txt-muted uppercase tracking-wider mb-1">AYUSH Treatment Notes</p>
                                                <p className="font-body text-sm text-txt-body italic">{record.treatmentNotes}</p>
                                            </div>
                                        )}
                                        {record.followUp && (
                                            <div className="flex justify-end">
                                                <span className="badge badge-blue text-xs">Follow-up: {record.followUp}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
