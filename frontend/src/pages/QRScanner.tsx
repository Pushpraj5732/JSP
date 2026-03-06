import { useState } from 'react';
import { ScanLine, X, FileText } from 'lucide-react';

export default function QRScanner() {
    const [showManual, setShowManual] = useState(false);
    const [payload, setPayload] = useState('');
    const [result, setResult] = useState<null | { name: string }>(null);
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'prescriptions', label: 'Prescriptions' },
        { key: 'appointments', label: 'Appointments' },
        { key: 'treatments', label: 'Treatments' },
    ];

    return (
        <div className="page-enter max-w-2xl mx-auto text-center">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-8">Patient QR Scanner</h1>

            {/* Scan Area */}
            <div className="w-full max-w-[400px] mx-auto aspect-square border-2 border-dashed border-border rounded-xl bg-surface-alt flex flex-col items-center justify-center">
                <ScanLine className="w-12 h-12 text-txt-muted mb-4" />
                <p className="font-body text-sm text-txt-muted">Point camera at patient's QR</p>
            </div>

            {/* Manual Input */}
            <button
                onClick={() => setShowManual(!showManual)}
                className="btn-ghost text-sm mt-4 mx-auto cursor-pointer"
            >
                Or paste encrypted payload manually
            </button>

            {showManual && (
                <div className="mt-3 max-w-[400px] mx-auto animate-fade-up">
                    <textarea
                        value={payload}
                        onChange={(e) => setPayload(e.target.value)}
                        className="textarea text-sm"
                        rows={3}
                    />
                    <button className="btn-primary w-full mt-2 cursor-pointer">Decrypt</button>
                </div>
            )}

            {/* Result Modal */}
            {result && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-border rounded-xl max-w-[600px] w-full overflow-hidden animate-slide-up">
                        {/* Header */}
                        <div className="bg-dark px-5 py-4 flex items-center justify-between">
                            <h3 className="font-heading font-bold text-xl text-white">{result.name}</h3>
                            <button onClick={() => setResult(null)} className="text-white/60 hover:text-dark cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-border px-5">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-3 py-3 font-heading font-semibold text-xs transition-all cursor-pointer ${activeTab === tab.key
                                        ? 'text-txt-primary border-b-2 border-primary'
                                        : 'text-txt-muted hover:text-txt-primary'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-5 min-h-[200px]">
                            <div className="flex flex-col items-center justify-center py-8">
                                <FileText className="w-8 h-8 text-txt-muted mb-2" />
                                <p className="font-body text-sm text-txt-muted">No data available</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-border bg-surface-alt">
                            <p className="font-mono text-[11px] text-txt-muted">
                                This access has been logged • {new Date().toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
