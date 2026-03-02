import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ChevronRight, Activity, MapPin, Phone, Hospital as HospitalIcon, Leaf } from 'lucide-react';
import { performTriage, fetchHospitals } from '../services/api';
import type { TriageResult, Hospital } from '../services/api';

const EmergencyTriage = () => {
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<TriageResult | null>(null);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    const handleAnalyze = async () => {
        if (!symptoms.trim()) return;
        setLoading(true);
        const triageResult = await performTriage(symptoms);
        const hospitalData = await fetchHospitals();
        setResult(triageResult);
        setHospitals(hospitalData);
        setLoading(false);
    };

    return (
        <section className="editorial-layout py-30">
            <div className="asymmetric-grid">
                <div className="lg:col-span-7 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <span className="font-sans font-bold text-terracotta uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                            <ShieldAlert className="w-5 h-5" /> Instant Assessment
                        </span>
                        <h2 className="text-text-primary">
                            Describe your <span className="italic text-forest">symptoms</span> for AI Triage.
                        </h2>
                        <p className="text-text-secondary text-lg max-w-xl">
                            Our multilingual AI analyzes your symptoms through the lens of AYUSH and modern diagnostics to suggest the right path of care.
                        </p>
                    </motion.div>

                    <div className="relative group">
                        <textarea
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="e.g. Sharp pain in lower back, aggravated in the morning..."
                            className="w-full bg-white border-2 border-parchment-accent rounded-organic p-8 h-48 font-sans text-lg 
                       focus:border-forest focus:ring-0 transition-all duration-500 shadow-sm group-hover:shadow-md outline-none"
                        />
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="absolute bottom-6 right-6 btn-primary !rounded-full !px-12 disabled:opacity-50"
                        >
                            {loading ? 'Analyzing...' : 'Analyze Symptoms'} <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 relative mt-12 lg:mt-0">
                    <AnimatePresence mode="wait">
                        {!result ? (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="card-premium h-[500px] flex flex-col items-center justify-center text-center space-y-6 gradient-mesh"
                            >
                                <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center animate-float">
                                    <Activity className="w-10 h-10 text-forest" />
                                </div>
                                <div>
                                    <h4 className="text-2xl mb-2 text-forest">Awaiting Input</h4>
                                    <p className="text-sm text-text-secondary px-10">Your personal assessment and recommendations will appear here.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                className="card-premium h-[500px] overflow-y-auto space-y-8 bg-white border-forest/20"
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${result.riskLevel === 'HIGH' || result.riskLevel === 'EMERGENCY'
                                        ? 'bg-alert text-parchment' : 'bg-turmeric text-forest-dark'
                                        }`}>
                                        {result.riskLevel} PRIORITY
                                    </span>
                                    <Leaf className="w-6 h-6 text-forest" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-3xl text-forest-dark">{result.suggestedAYUSH} Focus</h3>
                                    <p className="text-text-secondary italic text-lg leading-relaxed">{result.summary}</p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-sans font-bold text-xs uppercase text-text-secondary tracking-widest">Recommended Actions</h4>
                                    <div className="space-y-3">
                                        {result.recommendations.map((rec, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-text-primary px-4 py-2 bg-parchment rounded-lg border border-parchment-accent">
                                                <div className="w-1.5 h-1.5 rounded-full bg-forest" /> {rec}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6">
                                    <h4 className="font-sans font-bold text-xs uppercase text-text-secondary tracking-widest">Nearest Facilities</h4>
                                    <div className="space-y-4">
                                        {hospitals.slice(0, 2).map(h => (
                                            <div key={h.id} className="p-4 rounded-xl border border-parchment-accent bg-parchment-light hover:border-forest-light transition-colors cursor-pointer group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h5 className="font-serif font-bold text-lg group-hover:text-forest transition-colors">{h.name}</h5>
                                                    <HospitalIcon className="w-4 h-4 text-forest-light" />
                                                </div>
                                                <div className="flex gap-4 text-xs text-text-secondary">
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {h.distance}</span>
                                                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {h.phone}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default EmergencyTriage;
