import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, MapPin, User, Activity, Leaf, ChevronRight, Phone, Search } from 'lucide-react';

type Category = 'all' | 'general' | 'ayush';

interface Hospital {
    _id: string;
    name: string;
    address: string;
    category: string;
    beds: number;
    phone?: string;
}

interface Doctor {
    _id: string;
    name: string;
    specialization: string;
    experience: string;
    fees: number;
    availability: string;
    phone?: string;
}

export default function HospitalDashboard() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [activeTab, setActiveTab] = useState<Category>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingHospitals, setLoadingHospitals] = useState(true);
    const [loadingDoctors, setLoadingDoctors] = useState(false);

    useEffect(() => {
        axios.get('/api/hospitals')
            .then(res => {
                setHospitals(res.data.hospitals || []);
                setFilteredHospitals(res.data.hospitals || []);
                setLoadingHospitals(false);
            })
            .catch(err => {
                console.error('Error fetching hospitals:', err);
                setLoadingHospitals(false);
            });
    }, []);

    useEffect(() => {
        let result = hospitals;
        if (activeTab !== 'all') {
            result = result.filter(h => h.category === activeTab);
        }
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            result = result.filter(h => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q));
        }
        setFilteredHospitals(result);
    }, [activeTab, searchQuery, hospitals]);

    useEffect(() => {
        if (selectedHospital) {
            setLoadingDoctors(true);
            axios.get(`/api/doctors/hospital/${selectedHospital._id}`)
                .then(res => setDoctors(res.data.doctors || []))
                .catch(err => console.error(err))
                .finally(() => setLoadingDoctors(false));
        } else {
            setDoctors([]);
        }
    }, [selectedHospital]);

    return (
        <div className="page-enter max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">

            {/* Left Panel: Hospital Directory */}
            <div className="w-full md:w-1/3 flex flex-col bg-white border border-border rounded-xl shadow-sm overflow-hidden h-full">
                <div className="p-4 border-b border-border bg-slate-50">
                    <h2 className="font-heading font-bold text-lg text-txt-primary mb-3">Hospital Directory</h2>

                    {/* Search */}
                    <div className="relative mb-3">
                        <input
                            type="text"
                            placeholder="Search hospitals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:border-primary focus:shadow-focus outline-none transition-all"
                        />
                        <Search className="w-4 h-4 text-txt-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-white rounded-lg border border-border p-1">
                        {(['all', 'general', 'ayush'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-1.5 text-xs font-heading font-semibold rounded-md capitalize transition-all ${activeTab === tab ? 'bg-dark text-white shadow-sm' : 'text-txt-muted hover:text-dark'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {loadingHospitals ? (
                        <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    ) : filteredHospitals.length > 0 ? (
                        filteredHospitals.map(hospital => (
                            <button
                                key={hospital._id}
                                onClick={() => setSelectedHospital(hospital)}
                                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${selectedHospital?._id === hospital._id
                                        ? 'bg-blue-50/50 border-primary shadow-sm'
                                        : 'bg-white border-transparent hover:border-border hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex-1 min-w-0 pr-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        {hospital.category === 'ayush' ? (
                                            <Leaf className="w-3.5 h-3.5 text-secondary shrink-0" />
                                        ) : (
                                            <Activity className="w-3.5 h-3.5 text-primary shrink-0" />
                                        )}
                                        <h3 className="font-heading font-semibold text-sm text-dark truncate">{hospital.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-txt-muted">
                                        <MapPin className="w-3 h-3 shrink-0" />
                                        <span className="truncate">{hospital.address}</span>
                                    </div>
                                </div>
                                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${selectedHospital?._id === hospital._id ? 'text-primary' : 'text-txt-muted'}`} />
                            </button>
                        ))
                    ) : (
                        <div className="text-center py-10 px-4">
                            <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="font-body text-sm text-txt-muted">No hospitals found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Hospital Details & Doctors */}
            <div className="flex-1 flex flex-col h-full bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                {selectedHospital ? (
                    <>
                        {/* Selected Hospital Header */}
                        <div className="p-6 md:p-8 border-b border-border bg-gradient-to-br from-slate-50 to-white">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider rounded-full ${selectedHospital.category === 'ayush' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {selectedHospital.category === 'ayush' ? 'AYUSH Centre' : 'General Hospital'}
                                        </span>
                                        <span className="px-2.5 py-1 text-[10px] bg-slate-100 text-txt-muted font-heading font-bold uppercase tracking-wider rounded-full">
                                            {selectedHospital.beds} Beds
                                        </span>
                                    </div>
                                    <h2 className="font-heading font-bold text-2xl text-dark mb-2">{selectedHospital.name}</h2>
                                    <div className="flex items-center gap-4 text-sm text-txt-muted">
                                        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {selectedHospital.address}</div>
                                        {selectedHospital.phone && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {selectedHospital.phone}</div>}
                                    </div>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center shrink-0">
                                    <Building2 className={`w-8 h-8 ${selectedHospital.category === 'ayush' ? 'text-secondary' : 'text-primary'}`} />
                                </div>
                            </div>
                        </div>

                        {/* Doctors Roster */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
                            <h3 className="font-heading font-bold text-lg text-dark mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Medical Roster
                                <span className="ml-auto text-xs font-normal text-txt-muted">{doctors.length} specialists found</span>
                            </h3>

                            {loadingDoctors ? (
                                <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                            ) : doctors.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {doctors.map(doctor => (
                                        <div key={doctor._id} className="bg-white border text-left border-border rounded-xl p-4 hover:shadow-card transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="font-heading font-bold text-primary">{doctor.name.charAt(doctor.name.toUpperCase().startsWith('DR.') ? 4 : 0)}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-heading font-bold text-[15px] text-dark truncate">{doctor.name}</h4>
                                                    <p className="text-xs font-medium text-primary mb-2 truncate">{doctor.specialization}</p>

                                                    <div className="grid grid-cols-2 gap-y-1 text-xs text-txt-muted mb-3">
                                                        <div className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> Exp: {doctor.experience}</div>
                                                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">₹{doctor.fees} / visit</div>
                                                    </div>

                                                    <div className="bg-slate-50 border border-border/50 rounded flex items-center gap-2 px-2.5 py-1.5 mt-auto">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></div>
                                                        <span className="text-[11px] font-mono truncate">{doctor.availability}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-dashed border-border rounded-xl flex flex-col items-center justify-center py-16 text-center">
                                    <User className="w-10 h-10 text-slate-300 mb-3" />
                                    <p className="font-heading font-semibold text-dark">No Doctors Assigned</p>
                                    <p className="font-body text-sm text-txt-muted mt-1 max-w-sm">There are currently no doctors actively mapped to this hospital in the system.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
                        <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                            <Building2 className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="font-heading font-bold text-2xl text-txt-primary mb-2">Hospital Directory</h2>
                        <p className="font-body text-sm text-txt-muted max-w-md">
                            Select a hospital from the left panel to view its detailed roster and available medical specialists.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
