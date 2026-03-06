import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Mic, CalendarPlus, Leaf,
    Clock, ArrowRight, ChevronRight, ChevronLeft, AlertTriangle, Activity,
    Quote, FileText, Star, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [symptoms, setSymptoms] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [triageResult, setTriageResult] = useState<null | { risk: string; treatment: string; next: string }>(null);

    const announcements = [
        {
            id: 1,
            author: "AYUSH Ministry",
            time: "March 15, 10:00 AM",
            title: "FREE AYUSH Health Camp in Vidyanagar",
            desc: "Complete checkup and traditional medicine consultation available at zero cost for all ages.",
            category: "Health Camp",
            icon: Leaf
        },
        {
            id: 2,
            author: "Yoga Institute",
            time: "Registrations Open",
            title: "New Yoga Wellness Workshop",
            desc: "Register now for our upcoming 14-day intensive mental and physical wellbeing workshop.",
            category: "Wellness",
            icon: Activity
        },
        {
            id: 3,
            author: "Gov. Hospital",
            time: "Available 24/7",
            title: "Ayurveda Consultations Online",
            desc: "Connect with certified practitioners via video call from the comfort of your home.",
            category: "Consultation",
            icon: Mic
        }
    ];

    const medicalReports = [
        {
            id: 1,
            title: "Efficacy of Ayurvedic Interventions in Chronic Pain",
            source: "Journal of AYUSH Research",
            year: "2025",
            image: "/images/home/report1.png",
            summary: "A comprehensive study on the impact of traditional therapies on long-term musculoskeletal wellness."
        },
        {
            id: 2,
            title: "Neurological Benefits of Pranayama and Yoga",
            source: "Global Integrated Medicine",
            year: "2024",
            image: "/images/home/report2.png",
            summary: "Analyzing the measurable effects of controlled breathing on stress-related cognitive patterns."
        },
        {
            id: 3,
            title: "Phytomedicine: Medicinal Plants and Cellular Longevity",
            source: "International Life Sciences",
            year: "2025",
            image: "/images/home/report3.png",
            summary: "Laboratory findings on how AYUSH-verified botanicals promote antioxidant cellular responses."
        }
    ];

    const reviews = [
        {
            id: 1,
            name: "Suresh Mehra",
            role: "Patient",
            text: "The Ayurvedic consultation for my back pain was life-changing. I feel much more active and energized now.",
            rating: 5
        },
        {
            id: 2,
            name: "Anjali Shah",
            role: "Patient",
            text: "Great experience with the yoga workshop. The instructors are very knowledgeable and the atmosphere is serene.",
            rating: 5
        },
        {
            id: 3,
            name: "Vikram Patel",
            role: "Patient",
            text: "The voice assistant made it so easy to understand my symptoms. Highly recommend this platform for holistic care.",
            rating: 4
        }
    ];

    const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [announcements.length]);

    const nextAnnouncement = () => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    };

    const prevAnnouncement = () => {
        setCurrentAnnouncement((prev) => (prev - 1 + announcements.length) % announcements.length);
    };

    const handleAnalyze = () => {
        if (!symptoms.trim()) return;
        setTriageResult({
            risk: 'Medium',
            treatment: 'Severity Classification: Medium. Ayurveda Consultation Recommended',
            next: 'Find a Specialist',
        });
    };

    const handleVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
        const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechAPI();
        recognition.lang = 'en-IN';
        recognition.onresult = (e: any) => {
            setSymptoms(e.results[0][0].transcript);
            setIsRecording(false);
        };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        setIsRecording(true);
        recognition.start();
    };

    const riskColor = (level: string) => {
        if (level === 'High') return { bg: 'bg-danger-subtle', text: 'text-primary', border: 'border-red-200' };
        if (level === 'Medium') return { bg: 'bg-accent-subtle', text: 'text-accent', border: 'border-accent/20' };
        return { bg: 'bg-secondary-subtle', text: 'text-secondary', border: 'border-emerald-200' };
    };

    return (
        <div className="page-enter bg-surface">
            {/* ─── NEW IMAGE-BASED HERO ─── */}
            <section className="bg-dark pt-12 pb-24 px-6 md:px-12 relative overflow-hidden text-center">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    {/* Top: Full width text block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 backdrop-blur-sm"
                    >
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight leading-tight">
                            Modern Care Powered by <span className="text-primary italic">Ancient Wisdom</span>
                        </h1>
                        <p className="text-white/60 mt-4 text-lg font-body max-w-4xl mx-auto">
                            The Sanjeevani platform integrates Ayurveda, Yoga, Unani, Siddha, and Homeopathy into a unified digital experience.
                            Connecting millions with certified wellness and holistic medical professionals.
                        </p>
                    </motion.div>

                    {/* Bottom: 3-Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                        {/* Left: Image Widget */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="hidden lg:block h-[400px] rounded-2xl overflow-hidden shadow-hero-blue border border-white/10"
                        >
                            <img src="/images/home/herbs.png" alt="Ayurvedic Herbs" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500 scale-105" />
                        </motion.div>

                        {/* Center: Large Text Body (Spans 2 columns) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 bg-white/10 border border-white/20 rounded-3xl p-10 backdrop-blur-md relative"
                        >
                            <div className="absolute top-4 left-4">
                                <ShieldCheck className="w-10 h-10 text-primary/30" />
                            </div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                                Your Gateway to Holistic Digital Healthcare
                            </h2>
                            <p className="font-body text-white/80 leading-relaxed text-lg text-left">
                                Sanjeevani is not just an appointment portal; it's a personalized health companion.
                                We provide evidence-based AYUSH services through a intuitive interface,
                                ensuring that every citizen has access to trusted healing centers and certified practitioners.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-8 justify-center">
                                <Link to="/register" className="btn-primary py-3 px-8 text-sm shadow-xl hover:scale-105 transition-transform">
                                    Get Started Free
                                </Link>
                                <button className="flex items-center gap-2 text-white font-heading font-semibold hover:text-primary transition-colors">
                                    Learn More <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Right: Image Widget */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hidden lg:block h-[400px] rounded-2xl overflow-hidden shadow-hero-emerald border border-white/10"
                        >
                            <img src="/images/home/doctor.png" alt="Modern Medical Consultation" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500 scale-105" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── VOICE ASSISTANT WIDGET ─── */}
            <section className="px-6 md:px-12 relative z-20">
                <div className="max-w-7xl mx-auto -mt-12 bg-white rounded-2xl shadow-floating border border-border p-6 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Activity className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-dark">AYUSH Voice Triage Assistant</h3>
                            </div>
                            <p className="text-txt-muted text-sm font-body mb-6">
                                Describe your symptoms naturally. Our AI-powered system classifies the severity and recommends the appropriate AYUSH modality for treatment.
                            </p>
                            <div className="flex gap-4 relative">
                                <div className="relative flex-1 group">
                                    <input
                                        type="text"
                                        value={symptoms}
                                        onChange={(e) => setSymptoms(e.target.value)}
                                        placeholder="Speak or type symptoms like 'fatigue and joint pain'..."
                                        className="w-full pl-6 pr-14 py-4 bg-surface rounded-xl border border-border text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-inner"
                                    />
                                    <button
                                        onClick={handleVoice}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg transition-all ${isRecording ? 'bg-danger text-white animate-bounce' : 'text-primary hover:bg-primary/5'}`}
                                    >
                                        <Mic className="w-5 h-5" />
                                    </button>
                                </div>
                                <button onClick={handleAnalyze} className="btn-primary py-4 px-8 shadow-button hover:translate-y-[-2px]">
                                    Analyze
                                </button>
                            </div>

                            {/* Triage Result */}
                            <AnimatePresence>
                                {triageResult && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 p-5 bg-surface border border-border rounded-xl flex flex-col sm:flex-row items-center gap-6"
                                    >
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${riskColor(triageResult.risk).bg}`}>
                                            <AlertTriangle className={`w-7 h-7 ${riskColor(triageResult.risk).text}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${riskColor(triageResult.risk).bg} ${riskColor(triageResult.risk).text}`}>
                                                    {triageResult.risk} PRIORITY
                                                </span>
                                            </div>
                                            <p className="font-heading font-semibold text-dark">{triageResult.treatment}</p>
                                        </div>
                                        <Link to="/patient/book" className="btn-secondary py-3 px-6 whitespace-nowrap group">
                                            {triageResult.next} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── EVENT SLIDER ─── */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <CalendarPlus className="w-6 h-6 text-accent" />
                            <h3 className="font-heading font-bold text-2xl text-dark">Upcoming Health Events</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={prevAnnouncement} className="p-2 border border-border rounded-full hover:bg-surface transition-colors cursor-pointer">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button onClick={nextAnnouncement} className="p-2 border border-border rounded-full hover:bg-surface transition-colors cursor-pointer">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative h-48 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentAnnouncement}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="absolute inset-0 bg-surface-alt border-l-4 border-l-accent border border-border rounded-2xl p-8 flex items-center gap-8"
                            >
                                <div className="w-16 h-16 bg-white rounded-xl shadow-card flex items-center justify-center shrink-0">
                                    {(() => {
                                        const Icon = announcements[currentAnnouncement].icon;
                                        return <Icon className="w-8 h-8 text-accent" />;
                                    })()}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
                                            {announcements[currentAnnouncement].category}
                                        </span>
                                        <span className="text-xs text-txt-muted flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {announcements[currentAnnouncement].time}
                                        </span>
                                    </div>
                                    <h4 className="font-heading font-bold text-xl text-dark">{announcements[currentAnnouncement].title}</h4>
                                    <p className="font-body text-sm text-txt-muted mt-1">{announcements[currentAnnouncement].desc}</p>
                                </div>
                                <button className="hidden md:flex btn-ghost text-accent hover:bg-accent/5">
                                    Register <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ─── MEDICAL REPORTS SLIDER (AYUSH) ─── */}
            <section className="py-24 px-6 md:px-12 bg-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight">Evidence-Based AYUSH Services</h2>
                        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 rounded-full" />
                        <p className="font-body text-txt-muted mt-6 max-w-2xl mx-auto">
                            Explore recently published medical reports and clinical research highlighting the measurable efficacy of traditional healthcare.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {medicalReports.map((report) => (
                            <motion.div
                                key={report.id}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-card border border-border group"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={report.image} alt={report.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded px-3 py-1 text-[10px] font-bold text-secondary uppercase tracking-widest shadow-sm">
                                        {report.year}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-mono text-primary font-semibold">{report.source}</span>
                                    </div>
                                    <h4 className="font-heading font-bold text-lg text-dark leading-snug group-hover:text-primary transition-colors">
                                        {report.title}
                                    </h4>
                                    <p className="font-body text-sm text-txt-muted mt-3 line-clamp-3 leading-relaxed">
                                        {report.summary}
                                    </p>
                                    <button className="mt-6 flex items-center gap-2 text-dark font-heading font-semibold text-sm group-hover:gap-3 transition-all">
                                        Read Full Report <ArrowRight className="w-4 h-4 text-primary" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PATIENT REVIEWS ─── */}
            <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                    <Quote className="w-64 h-64 text-dark" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h3 className="font-heading font-bold text-3xl md:text-4xl text-dark">Healing Experiences</h3>
                            <p className="font-body text-txt-muted mt-4">Read firsthand testimonials from patients who have successfully transitioned to AYUSH-based holistic care.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
                            <Star className="w-4 h-4 text-secondary fill-secondary" />
                            <span className="text-sm font-heading font-bold text-secondary">4.9/5 Average Rating</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-surface-alt border border-border rounded-2xl p-8 relative flex flex-col h-full">
                                <Quote className="w-8 h-8 text-primary/10 absolute top-6 right-6" />
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                                    ))}
                                </div>
                                <p className="font-body text-txt-body italic leading-relaxed flex-1">
                                    "{review.text}"
                                </p>
                                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center uppercase font-heading font-bold text-primary text-sm">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-sm text-dark">{review.name}</p>
                                        <p className="text-xs text-txt-muted">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
