import { useState } from 'react';
import { Save, FileText } from 'lucide-react';

export default function EmrEditor() {
    const [records] = useState<any[]>([]);
    const [form, setForm] = useState({
        patientId: '',
        symptoms: '',
        diagnosis: '',
        prescription: '',
        severity: 'LOW',
        treatmentNotes: '',
        followUp: '',
    });

    const update = (field: string, value: string) => setForm({ ...form, [field]: value });

    return (
        <div className="page-enter max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-8">EMR Editor</h1>

            {/* New Record Form */}
            <div className="card-flat p-6 mb-8">
                <h3 className="font-heading font-semibold text-lg text-txt-primary mb-5">Create New Record</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Patient ID</label>
                        <input type="text" value={form.patientId} onChange={(e) => update('patientId', e.target.value)} className="input" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Symptoms</label>
                        <input type="text" value={form.symptoms} onChange={(e) => update('symptoms', e.target.value)} className="input" placeholder="" />
                        <p className="font-mono text-[10px] text-txt-muted mt-1">Separate multiple symptoms with commas</p>
                    </div>

                    <div>
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Diagnosis</label>
                        <textarea value={form.diagnosis} onChange={(e) => update('diagnosis', e.target.value)} className="textarea" rows={3} />
                    </div>

                    <div>
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Prescription</label>
                        <textarea value={form.prescription} onChange={(e) => update('prescription', e.target.value)} className="textarea" rows={3} />
                    </div>

                    <div>
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Severity</label>
                        <select value={form.severity} onChange={(e) => update('severity', e.target.value)} className="input">
                            <option value="LOW">Low</option>
                            <option value="MODERATE">Moderate</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Follow-up Date</label>
                        <input type="date" value={form.followUp} onChange={(e) => update('followUp', e.target.value)} className="input" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">AYUSH Treatment Notes</label>
                        <textarea value={form.treatmentNotes} onChange={(e) => update('treatmentNotes', e.target.value)} className="textarea" rows={3} />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="btn-primary cursor-pointer">
                        <Save className="w-4 h-4" /> Save Record
                    </button>
                </div>
            </div>

            {/* Recent Records */}
            <h3 className="font-heading font-semibold text-lg text-txt-primary mb-4">Recent Records</h3>
            {records.length === 0 ? (
                <div className="card-flat flex flex-col items-center justify-center py-12">
                    <FileText className="w-8 h-8 text-txt-muted mb-2" />
                    <p className="font-body text-sm text-txt-muted">No records created yet</p>
                </div>
            ) : null}
        </div>
    );
}
