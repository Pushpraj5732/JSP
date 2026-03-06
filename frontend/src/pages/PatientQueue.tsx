import { useState } from 'react';
import { Search, FileText, X, Plus, Save, Users } from 'lucide-react';

export default function PatientQueue() {
    const [searchQuery, setSearchQuery] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [showNewRecord, setShowNewRecord] = useState(false);

    // EMR form state
    const [emrForm, setEmrForm] = useState({
        symptoms: '',
        diagnosis: '',
        prescription: '',
        severity: 'LOW',
        treatmentNotes: '',
        followUp: '',
    });

    return (
        <div className="page-enter relative">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-heading font-bold text-[32px] text-txt-primary">Assigned Patients</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-muted" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input pl-10 py-2 text-sm"
                        placeholder=""
                    />
                </div>
            </div>

            {/* Patient List */}
            <div className="card-flat overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="table-header">
                            <th className="text-left px-5 py-3">Name</th>
                            <th className="text-left px-5 py-3">Last Visit</th>
                            <th className="text-left px-5 py-3">Appointments</th>
                            <th className="text-right px-5 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} className="text-center py-12">
                                <Users className="w-8 h-8 text-txt-muted mx-auto mb-2" />
                                <p className="font-body text-sm text-txt-muted">No patients assigned</p>
                                <p className="font-mono text-xs text-txt-muted mt-1">Patients will appear after appointment bookings</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* EMR Slide Panel */}
            {panelOpen && (
                <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l border-border shadow-popup z-50 flex flex-col animate-slide-up">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                        <h3 className="font-heading font-bold text-xl text-txt-primary">Patient Records</h3>
                        <button onClick={() => setPanelOpen(false)} className="text-txt-muted hover:text-txt-primary cursor-pointer">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5">
                        {/* Empty state for records */}
                        <div className="flex flex-col items-center justify-center py-10">
                            <FileText className="w-8 h-8 text-txt-muted mb-2" />
                            <p className="font-body text-sm text-txt-muted">No records yet</p>
                        </div>

                        {/* New Record Form */}
                        {showNewRecord && (
                            <div className="mt-4 space-y-4 border-t border-border pt-4 animate-fade-up">
                                <h4 className="font-heading font-semibold text-sm text-txt-primary">New EMR Record</h4>
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1 uppercase tracking-wider">Symptoms</label>
                                    <input value={emrForm.symptoms} onChange={(e) => setEmrForm({ ...emrForm, symptoms: e.target.value })} className="input text-sm py-2" />
                                </div>
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1 uppercase tracking-wider">Diagnosis</label>
                                    <textarea value={emrForm.diagnosis} onChange={(e) => setEmrForm({ ...emrForm, diagnosis: e.target.value })} className="textarea text-sm py-2" rows={2} />
                                </div>
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1 uppercase tracking-wider">Prescription</label>
                                    <input value={emrForm.prescription} onChange={(e) => setEmrForm({ ...emrForm, prescription: e.target.value })} className="input text-sm py-2" />
                                </div>
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1 uppercase tracking-wider">Severity</label>
                                    <select value={emrForm.severity} onChange={(e) => setEmrForm({ ...emrForm, severity: e.target.value })} className="input text-sm py-2">
                                        <option value="LOW">Low</option>
                                        <option value="MODERATE">Moderate</option>
                                        <option value="HIGH">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1 uppercase tracking-wider">Treatment Notes</label>
                                    <textarea value={emrForm.treatmentNotes} onChange={(e) => setEmrForm({ ...emrForm, treatmentNotes: e.target.value })} className="textarea text-sm py-2" rows={2} />
                                </div>
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1 uppercase tracking-wider">Follow-up Date</label>
                                    <input type="date" value={emrForm.followUp} onChange={(e) => setEmrForm({ ...emrForm, followUp: e.target.value })} className="input text-sm py-2" />
                                </div>
                                <button className="btn-primary w-full cursor-pointer">
                                    <Save className="w-4 h-4" /> Save Record
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-border">
                        <button onClick={() => setShowNewRecord(!showNewRecord)} className="btn-primary w-full cursor-pointer">
                            <Plus className="w-4 h-4" /> {showNewRecord ? 'Cancel' : 'Create New Record'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
