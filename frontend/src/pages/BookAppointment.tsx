import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, User, Clock, Check, Calendar } from 'lucide-react';

const branches = [
    { id: 'ayurveda', name: 'Ayurveda', icon: '🌿' },
    { id: 'yoga', name: 'Yoga & Naturopathy', icon: '🧘' },
    { id: 'unani', name: 'Unani', icon: '🏺' },
    { id: 'siddha', name: 'Siddha', icon: '🪔' },
    { id: 'homeopathy', name: 'Homeopathy', icon: '💧' },
];

const doctors = [
    { id: '1', name: 'Dr. Ananya Sharma', qual: 'BAMS, MD', available: true },
    { id: '2', name: 'Dr. Rahul V.', qual: 'BAMS', available: false },
];

const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];

const BookAppointment = () => {
    const [step] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState('ayurveda');
    const [selectedDoctor, setSelectedDoctor] = useState('1');
    const [selectedTime, setSelectedTime] = useState('10:00 AM');

    return (
        <div className="flex h-screen bg-parchment">
            <Sidebar role="patient" userName="Ananya M." />

            <main className="flex-1 md:ml-[260px] p-8 overflow-y-auto page-transition">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-10 flex justify-between items-center fade-up">
                        <h1 className="text-3xl text-forest-dark">Book an Appointment</h1>
                        <Link to="/patient" className="btn-secondary">Back to Dashboard</Link>
                    </header>

                    {/* Wizard Progress */}
                    <div className="flex items-center justify-between mb-12 fade-up" style={{ animationDelay: '100ms' }}>
                        {['Branch', 'Doctor', 'Time', 'Confirm'].map((s, i) => (
                            <div key={s} className="flex flex-col items-center relative flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 
                  ${step > i + 1 ? 'bg-forest text-white' : step === i + 1 ? 'bg-terracotta text-white border-4 border-parchment-dark shadow-sm' : 'bg-parchment-dark text-text-secondary border border-border'}`}>
                                    {step > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
                                </div>
                                <span className={`mt-2 text-xs font-sans uppercase tracking-wider ${step >= i + 1 ? 'text-forest-dark font-bold' : 'text-text-secondary'}`}>{s}</span>
                                {i < 3 && <div className={`absolute top-5 left-[50%] right-[-50%] h-[2px] -z-10 ${step > i + 1 ? 'bg-forest' : 'bg-border'}`}></div>}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-12">
                        {/* Step 1: Branch */}
                        <section className="fade-up" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-xl font-serif font-bold text-forest-dark mb-4 flex items-center gap-2">
                                Step 1: Select AYUSH Branch
                                <ChevronRight className="w-5 h-5 text-terracotta" />
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                {branches.map(b => (
                                    <button
                                        key={b.id}
                                        onClick={() => setSelectedBranch(b.id)}
                                        className={`p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 ${selectedBranch === b.id
                                            ? 'bg-terracotta/10 border-2 border-terracotta shadow-sm'
                                            : 'bg-parchment border border-border hover:border-forest/50'
                                            }`}
                                    >
                                        <span className="text-3xl">{b.icon}</span>
                                        <span className="text-sm font-sans font-medium text-forest-dark">{b.name}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Step 2: Doctor */}
                        <section className="fade-up" style={{ animationDelay: '300ms' }}>
                            <h2 className="text-xl font-serif font-bold text-forest-dark mb-4 flex items-center gap-2">
                                Step 2: Select Practitioner
                                <ChevronRight className="w-5 h-5 text-terracotta" />
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {doctors.map(d => (
                                    <div key={d.id} className={`p-5 rounded-2xl flex items-center justify-between transition-all duration-200 border cursor-pointer ${selectedDoctor === d.id ? 'bg-white shadow-md border-forest' : 'bg-parchment-dark border-border hover:border-forest/30'
                                        }`} onClick={() => setSelectedDoctor(d.id)}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-turmeric/20 text-turmeric rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-serif font-bold text-lg text-text-primary">{d.name}</h4>
                                                <p className="font-sans text-xs text-text-secondary">{d.qual}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <CheckCircle2 className={`w-3 h-3 ${d.available ? 'text-forest' : 'text-text-secondary'}`} />
                                                    <span className="text-xs font-medium" style={{ color: d.available ? 'var(--color-success)' : 'var(--color-text-secondary)' }}>
                                                        {d.available ? 'Available Today' : 'Next available: Tomorrow'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDoctor === d.id ? 'bg-forest text-white' : 'bg-white border border-border text-forest'
                                                }`}>
                                                {selectedDoctor === d.id ? 'Selected' : 'Select'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Step 3: Time Slot */}
                        <section className="fade-up" style={{ animationDelay: '400ms' }}>
                            <h2 className="text-xl font-serif font-bold text-forest-dark mb-4 flex items-center gap-2">
                                Step 3: Select Date & Time
                                <ChevronRight className="w-5 h-5 text-terracotta" />
                            </h2>
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Mock Calendar */}
                                <div className="card w-full md:w-1/2 !p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <button className="text-text-secondary hover:text-forest">&lt;</button>
                                        <span className="font-serif font-bold text-lg text-text-primary">October 2023</span>
                                        <button className="text-text-secondary hover:text-forest">&gt;</button>
                                    </div>
                                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-sans text-text-secondary mb-2">
                                        <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-sans">
                                        {/* Mock days */}
                                        {[...Array(30)].map((_, i) => {
                                            const day = i + 1;
                                            const isSelected = day === 24;
                                            return (
                                                <div key={day} className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto cursor-pointer transition-colors ${isSelected ? 'bg-terracotta text-white font-bold' : 'hover:bg-forest/10'
                                                    }`}>
                                                    {day}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="w-full md:w-1/2">
                                    <h4 className="font-sans font-medium text-sm text-text-secondary mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Available Slots for Oct 24
                                    </h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-2 px-1 text-xs font-sans font-medium rounded-lg border transition-all ${selectedTime === time
                                                    ? 'bg-forest text-white border-forest'
                                                    : 'bg-white text-text-primary border-border hover:border-forest/40'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step 4: Confirm */}
                        <section className="fade-up" style={{ animationDelay: '500ms' }}>
                            <div className="card border-l-4 border-l-turmeric shadow-md flex justify-between items-center p-6">
                                <div>
                                    <h2 className="text-xl font-serif font-bold text-forest-dark mb-1">Booking Summary</h2>
                                    <p className="text-sm font-sans text-text-secondary flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-forest" />
                                        Oct 24, {selectedTime} with {doctors.find(d => d.id === selectedDoctor)?.name} ({branches.find(b => b.id === selectedBranch)?.name})
                                    </p>
                                </div>
                                <button className="btn-gold px-8 shadow-sm">Confirm Booking</button>
                            </div>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default BookAppointment;
