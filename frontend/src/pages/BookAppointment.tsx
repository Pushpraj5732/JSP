import { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, Leaf, User, Building2, MapPin, Activity } from 'lucide-react';
import axios from 'axios';

type HospitalType = 'general' | 'ayush' | '';

interface Hospital {
    _id: string;
    name: string;
    address: string;
    category: string;
    beds: number;
}

interface Doctor {
    _id: string;
    name: string;
    specialization: string;
    experience: string;
    fees: number;
    availability: string;
}

export default function BookAppointment() {
    const [step, setStep] = useState(1);

    // Selections
    const [selectedType, setSelectedType] = useState<HospitalType>('');
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // Data states
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loadingHospitals, setLoadingHospitals] = useState(false);
    const [loadingDoctors, setLoadingDoctors] = useState(false);

    const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

    // Fetch hospitals when type changes
    useEffect(() => {
        if (selectedType) {
            setLoadingHospitals(true);
            axios.get(`/api/hospitals?category=${selectedType}`)
                .then(res => setHospitals(res.data.hospitals || []))
                .catch(err => console.error(err))
                .finally(() => setLoadingHospitals(false));
        }
    }, [selectedType]);

    // Fetch doctors when hospital changes
    useEffect(() => {
        if (selectedHospital) {
            setLoadingDoctors(true);
            axios.get(`/api/doctors/hospital/${selectedHospital._id}`)
                .then(res => setDoctors(res.data.doctors || []))
                .catch(err => console.error(err))
                .finally(() => setLoadingDoctors(false));
        }
    }, [selectedHospital]);

    const handleNext = () => setStep(s => Math.min(s + 1, 5));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));

    // Disable logic for next button
    const isNextDisabled = () => {
        if (step === 1 && !selectedType) return true;
        if (step === 2 && !selectedHospital) return true;
        if (step === 3 && !selectedDoctor) return true;
        if (step === 4 && (!selectedDate || !selectedTime)) return true;
        return false;
    };

    return (
        <div className="page-enter max-w-4xl mx-auto">
            {/* Step Progress */}
            <div className="flex items-center gap-1 sm:gap-2 mb-8 mx-auto justify-center">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex items-center sm:gap-2">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-heading font-bold text-xs sm:text-sm rounded transition-all ${step >= s ? 'bg-dark text-white' : 'bg-white text-txt-muted border border-border'
                            }`}>
                            {step > s ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : s}
                        </div>
                        {s < 5 && <div className={`w-4 sm:w-8 lg:w-16 border-t-[1.5px] border-dashed mx-1 sm:mx-0 ${step > s ? 'border-dark' : 'border-border'}`} />}
                    </div>
                ))}
            </div>

            {/* Step 1: Hospital Type */}
            {step === 1 && (
                <div className="animate-fade-up">
                    <h2 className="font-heading font-bold text-[28px] text-txt-primary mb-2 text-center">Choose Hospital Type</h2>
                    <p className="font-body text-sm text-txt-muted mb-8 text-center">Select the type of healthcare facility you are looking for</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <button
                            onClick={() => setSelectedType('general')}
                            className={`p-6 rounded-2xl border-2 text-center transition-all cursor-pointer ${selectedType === 'general'
                                ? 'bg-blue-50/50 border-primary shadow-sm'
                                : 'bg-white border-border hover:border-primary/30 hover:shadow-card'
                                }`}
                        >
                            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${selectedType === 'general' ? 'bg-primary text-white' : 'bg-slate-100 text-txt-muted'}`}>
                                <Activity className="w-7 h-7" />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-dark">General Hospitals</h3>
                            <p className="font-body text-xs text-txt-muted mt-2">Allopathy, Surgery, Pediatrics, Cardiology, Multi-specialty care.</p>
                        </button>

                        <button
                            onClick={() => setSelectedType('ayush')}
                            className={`p-6 rounded-2xl border-2 text-center transition-all cursor-pointer ${selectedType === 'ayush'
                                ? 'bg-emerald-50 border-secondary shadow-sm'
                                : 'bg-white border-border hover:border-secondary/30 hover:shadow-card'
                                }`}
                        >
                            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${selectedType === 'ayush' ? 'bg-secondary text-white' : 'bg-slate-100 text-txt-muted'}`}>
                                <Leaf className="w-7 h-7" />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-dark">AYUSH Centres</h3>
                            <p className="font-body text-xs text-txt-muted mt-2">Ayurveda, Yoga, Unani, Siddha, Homeopathy, Panchakarma therapies.</p>
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Hospital Selection */}
            {step === 2 && (
                <div className="animate-fade-up">
                    <h2 className="font-heading font-bold text-[28px] text-txt-primary mb-2 text-center">Select a Hospital</h2>
                    <p className="font-body text-sm text-txt-muted mb-8 text-center">{selectedType === 'general' ? 'General Hospitals' : 'AYUSH Centres'} in Anand District</p>

                    {loadingHospitals ? (
                        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    ) : hospitals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {hospitals.map((hospital) => (
                                <div
                                    key={hospital._id}
                                    onClick={() => setSelectedHospital(hospital)}
                                    className={`p-5 rounded-xl border-[1.5px] transition-all cursor-pointer flex flex-col items-start text-left ${selectedHospital?._id === hospital._id
                                        ? 'bg-dark text-white border-dark transform scale-[1.02] shadow-md'
                                        : 'bg-white text-txt-primary border-border hover:border-dark/30 hover:shadow-card'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-3 w-full">
                                        <div className={`p-2 rounded-lg ${selectedHospital?._id === hospital._id ? 'bg-white/10' : 'bg-slate-100'}`}>
                                            <Building2 className={`w-5 h-5 ${selectedHospital?._id === hospital._id ? 'text-white' : 'text-primary'}`} />
                                        </div>
                                        <h3 className="font-heading font-bold text-sm leading-tight flex-1">{hospital.name}</h3>
                                    </div>
                                    <div className={`flex items-start gap-1.5 text-xs mb-2 ${selectedHospital?._id === hospital._id ? 'text-white/80' : 'text-txt-muted'}`}>
                                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                        <span>{hospital.address}</span>
                                    </div>
                                    <div className="mt-auto pt-2 w-full border-t border-dashed border-white/20">
                                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${selectedHospital?._id === hospital._id ? 'bg-white/20 text-white' : 'bg-slate-100 text-txt-muted'}`}>
                                            {hospital.beds} Beds
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card-flat flex flex-col items-center justify-center py-16 text-center">
                            <Building2 className="w-10 h-10 text-txt-muted mb-3" />
                            <p className="font-body text-sm text-txt-muted">No hospitals available in this category</p>
                        </div>
                    )}
                </div>
            )}

            {/* Step 3: Doctor Selection */}
            {step === 3 && (
                <div className="animate-fade-up">
                    <h2 className="font-heading font-bold text-[28px] text-txt-primary mb-2 text-center">Select a Doctor</h2>
                    <p className="font-body text-sm text-txt-muted mb-8 text-center">Specialists available at {selectedHospital?.name}</p>

                    {loadingDoctors ? (
                        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    ) : doctors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor._id}
                                    onClick={() => setSelectedDoctor(doctor)}
                                    className={`p-4 rounded-xl border-[1.5px] flex items-center gap-4 transition-all cursor-pointer ${selectedDoctor?._id === doctor._id
                                        ? 'bg-dark text-white border-dark shadow-md'
                                        : 'bg-white border-border hover:border-dark/30 hover:shadow-card'
                                        }`}
                                >
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                                        <User className="w-6 h-6 text-txt-muted" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-heading font-bold text-sm truncate">{doctor.name}</h4>
                                        <p className={`text-xs truncate mb-1 ${selectedDoctor?._id === doctor._id ? 'text-white/80' : 'text-primary'}`}>{doctor.specialization}</p>
                                        <div className={`flex items-center gap-3 text-[11px] ${selectedDoctor?._id === doctor._id ? 'text-white/60' : 'text-txt-muted'}`}>
                                            <span>Exp: {doctor.experience}</span>
                                            <span>Fee: ₹{doctor.fees}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card-flat flex flex-col items-center justify-center py-16 text-center">
                            <User className="w-10 h-10 text-txt-muted mb-3" />
                            <p className="font-body text-sm text-txt-muted">No doctors found for this hospital.</p>
                            <p className="font-mono text-[10px] text-txt-muted mt-2 opacity-60">Did you run the seed script locally?</p>
                        </div>
                    )}
                </div>
            )}

            {/* Step 4: Date & Time */}
            {step === 4 && (
                <div className="animate-fade-up">
                    <h2 className="font-heading font-bold text-[28px] text-txt-primary mb-2 text-center">Select Date & Time</h2>
                    <p className="font-body text-sm text-txt-muted mb-8 text-center">Consultation with {selectedDoctor?.name}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <div>
                            <label className="block font-heading font-semibold text-xs text-txt-muted mb-2 uppercase tracking-wider">Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="block font-heading font-semibold text-xs text-txt-muted mb-2 uppercase tracking-wider">Available Times</label>
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-2.5 rounded text-sm font-mono font-medium transition-all cursor-pointer border ${selectedTime === time
                                            ? 'bg-dark text-white border-dark'
                                            : 'bg-white text-txt-primary border-border hover:border-dark/30'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 5: Confirm */}
            {step === 5 && (
                <div className="animate-fade-up max-w-lg mx-auto">
                    <h2 className="font-heading font-bold text-[28px] text-txt-primary mb-2 text-center">Confirm Booking</h2>
                    <p className="font-body text-sm text-txt-muted mb-6 text-center">Review your appointment details</p>

                    <div className="bg-[#FEF3CD] border border-border rounded-xl p-6 shadow-sm">
                        <div className="space-y-4">
                            {[
                                { label: 'Category', value: selectedType === 'general' ? 'General Hospital' : 'AYUSH Centre' },
                                { label: 'Hospital', value: selectedHospital?.name },
                                { label: 'Doctor', value: selectedDoctor?.name },
                                { label: 'Specialization', value: selectedDoctor?.specialization },
                                { label: 'Consultation Fee', value: `₹${selectedDoctor?.fees}` },
                                { label: 'Date', value: selectedDate },
                                { label: 'Time', value: selectedTime },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-yellow-300/30 last:border-0 pt-0 first:pt-2">
                                    <span className="font-mono text-xs text-txt-muted uppercase whitespace-nowrap mr-4">{item.label}</span>
                                    <span className="font-heading font-semibold text-sm text-txt-primary text-right">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary w-full mt-6 py-3.5 cursor-pointer text-base">
                            Confirm Appointment Booking
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-10 max-w-4xl mx-auto border-t border-border pt-6">
                {step > 1 && (
                    <button onClick={handleBack} className="btn-secondary cursor-pointer">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                )}
                {step < 5 && (
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                        className={`btn-primary ml-auto flex items-center gap-2 px-8 ${isNextDisabled() ? 'opacity-50 cursor-not-allowed bg-slate-400 border-none hover:shadow-none hover:bg-slate-400 hover:text-white' : 'cursor-pointer'}`}
                    >
                        Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
