import { useAuth } from '../context/AuthContext';
import { Download, Share2, QrCode } from 'lucide-react';

export default function PatientIDCard() {
    const { user } = useAuth();

    return (
        <div className="page-enter max-w-3xl mx-auto">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-8">Health ID Card</h1>

            {/* Card Preview */}
            <div className="mx-auto max-w-[680px]">
                <div className="bg-dark rounded-2xl p-8 border border-dark relative"
                    style={{ boxShadow: '6px 6px 0px #D9383E' }}
                >
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                <span className="text-white text-xs font-heading font-bold">S</span>
                            </div>
                            <span className="font-heading font-semibold text-sm text-white/80">Sanjeevani</span>
                        </div>
                        <span className="font-heading font-semibold text-[11px] text-white/40 uppercase tracking-wider">
                            AYUSH Health ID
                        </span>
                    </div>

                    {/* Name & ID */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-heading font-bold text-[28px] text-white leading-tight">
                                {user?.name || '—'}
                            </h2>
                            <p className="font-mono text-sm text-white/40 mt-1">
                                {user?.patientId || 'SJ-000000'}
                            </p>
                        </div>
                        {/* Photo placeholder */}
                        <div className="w-[72px] h-[72px] bg-white/10 border border-white/20 rounded shrink-0" />
                    </div>

                    {/* Info Row */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div>
                            <p className="font-mono text-[11px] text-white/30 uppercase">DOB</p>
                            <p className="font-mono text-sm text-white/70 mt-0.5">—</p>
                        </div>
                        <div>
                            <p className="font-mono text-[11px] text-white/30 uppercase">Blood Group</p>
                            <span className="inline-block mt-0.5 px-2 py-0.5 bg-white/10 text-white/70 rounded text-xs font-mono">
                                —
                            </span>
                        </div>
                        <div>
                            <p className="font-mono text-[11px] text-white/30 uppercase">AYUSH Category</p>
                            <p className="font-mono text-sm text-white/70 mt-0.5">—</p>
                        </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-end justify-between"
                        style={{ background: 'rgba(217,56,62,0.06)', margin: '0 -32px -32px', padding: '16px 32px 24px', borderRadius: '0 0 16px 16px' }}
                    >
                        <p className="font-mono text-[10px] text-white/30 max-w-[60%]">
                            This digital health ID is issued by Sanjeevani AYUSH Healthcare Platform. Scan QR for patient history.
                        </p>
                        <div className="text-right">
                            <div className="w-[80px] h-[80px] bg-white rounded flex items-center justify-center">
                                <QrCode className="w-10 h-10 text-dark" />
                            </div>
                            <p className="font-mono text-[9px] text-white/30 mt-1">Scan for History</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6 justify-center">
                    <button className="btn-primary cursor-pointer">
                        <Download className="w-4 h-4" /> Download PNG
                    </button>
                    <button className="btn-secondary cursor-pointer">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button className="btn-ghost text-sm cursor-pointer">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                </div>
            </div>

            {/* QR Detail Section */}
            <div className="card-flat mt-8 p-6">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                    <div className="w-[200px] h-[200px] bg-surface-alt border border-border rounded-lg flex items-center justify-center mx-auto md:mx-0">
                        <QrCode className="w-20 h-20 text-txt-muted" />
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold text-[15px] text-txt-primary mb-3">Encoded Information</h3>
                        <ul className="space-y-2">
                            {[
                                'Prescription history',
                                'Past symptoms',
                                'Severity logs',
                                'Doctor visit records',
                                'Ongoing treatments',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 font-body text-sm text-txt-body">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="font-mono text-[11px] text-txt-muted mt-4">Last updated: —</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
