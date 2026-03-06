import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Save, Download } from 'lucide-react';

export default function PatientProfile() {
    const { user } = useAuth();
    const [form, setForm] = useState({
        name: user?.name || '',
        dob: '',
        bloodGroup: '',
        gender: '',
        ayushCategory: '',
    });

    const update = (field: string, value: string) => setForm({ ...form, [field]: value });

    return (
        <div className="page-enter max-w-5xl mx-auto">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                {/* Personal Info */}
                <div className="card-flat p-8">
                    {/* Photo */}
                    <div className="flex items-start gap-6 mb-8">
                        <div className="w-[120px] h-[120px] bg-surface-alt border-[1.5px] border-border rounded flex items-center justify-center relative group cursor-pointer shrink-0">
                            <Camera className="w-8 h-8 text-txt-muted" />
                            <div className="absolute inset-0 bg-dark/50 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-xl text-txt-primary">{user?.name || '—'}</h3>
                            <p className="font-mono text-xs text-txt-muted mt-1">{user?.email || '—'}</p>
                            <span className={`badge mt-2 ${user?.role === 'patient' ? 'badge-green' : 'badge-blue'}`}>
                                {user?.role || 'Patient'}
                            </span>
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Full Name</label>
                            <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="input" />
                        </div>
                        <div>
                            <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Date of Birth</label>
                            <input type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} className="input" />
                        </div>
                        <div>
                            <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Blood Group</label>
                            <select value={form.bloodGroup} onChange={(e) => update('bloodGroup', e.target.value)} className="input">
                                <option value="">Select</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Gender</label>
                            <select value={form.gender} onChange={(e) => update('gender', e.target.value)} className="input">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">AYUSH Category</label>
                            <select value={form.ayushCategory} onChange={(e) => update('ayushCategory', e.target.value)} className="input">
                                <option value="">Select</option>
                                {['Ayurveda', 'Yoga & Naturopathy', 'Unani', 'Siddha', 'Homeopathy'].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button className="btn-primary cursor-pointer">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-[#FDE8E8] border border-border rounded-xl p-6">
                    <p className="font-mono text-[11px] text-txt-muted">Patient ID</p>
                    <p className="font-heading font-bold text-2xl text-txt-primary mt-1">{user?.patientId || 'SJ-000000'}</p>

                    <div className="mt-6 space-y-4">
                        <div>
                            <p className="font-mono text-[11px] text-txt-muted">Registered Since</p>
                            <p className="font-body text-sm text-txt-primary mt-0.5">—</p>
                        </div>
                        <div>
                            <p className="font-mono text-[11px] text-txt-muted">AYUSH Category</p>
                            <span className="badge badge-green mt-1">{form.ayushCategory || '—'}</span>
                        </div>
                        <div>
                            <p className="font-mono text-[11px] text-txt-muted">Account Status</p>
                            <span className="badge badge-green mt-1">Active</span>
                        </div>
                    </div>

                    <button className="btn-secondary w-full mt-8 cursor-pointer">
                        <Download className="w-4 h-4" /> Download ID Card
                    </button>
                </div>
            </div>
        </div>
    );
}
