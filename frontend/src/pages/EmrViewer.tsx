import { Download, ChevronLeft, Droplet, Heart, Activity, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmrViewer = () => {
    return (
        <div className="min-h-screen bg-parchment p-4 md:p-8 font-sans page-transition">
            <div className="max-w-4xl mx-auto">
                {/* Navigation & Actions */}
                <div className="flex justify-between items-center mb-8">
                    <Link to="/patient" className="text-text-secondary hover:text-forest flex items-center gap-2 text-sm font-medium transition-colors">
                        <ChevronLeft className="w-4 h-4" /> Back to Portal
                    </Link>
                    <button className="bg-white border border-border text-forest px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-forest hover:text-white transition-all shadow-sm">
                        <Download className="w-4 h-4" /> Print / Download
                    </button>
                </div>

                {/* EMR Document Container */}
                <div className="bg-white rounded-xl border border-border shadow-md overflow-hidden print:shadow-none print:border-none">
                    {/* Header Bar */}
                    <div className="bg-forest-dark text-parchment p-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="font-serif font-bold text-4xl mb-2">Rahul Mehta</h1>
                                <div className="flex items-center gap-4 text-sm font-mono text-parchment/80">
                                    <span>ID: VCHN-008272</span>&bull;
                                    <span>Aadhar Verified</span>
                                </div>
                            </div>
                            <div className="text-right text-sm font-sans space-y-1">
                                <div>Age: 42 Years</div>
                                <div>Gender: Male</div>
                                <div>Blood Group: O+</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Vitals Section */}
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="font-serif font-bold text-xl text-forest-dark uppercase tracking-widest border-b-2 border-turmeric pb-1 inline-block">Vital Signs</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div className="bg-parchment-dark rounded-xl p-4 border border-border/50 text-center">
                                <Heart className="w-5 h-5 text-terracotta mx-auto mb-2" />
                                <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Blood Pressure</p>
                                <h3 className="font-serif font-bold text-xl text-text-primary">120/80</h3>
                            </div>
                            <div className="bg-parchment-dark rounded-xl p-4 border border-border/50 text-center">
                                <Activity className="w-5 h-5 text-forest mx-auto mb-2" />
                                <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Pulse Rate</p>
                                <h3 className="font-serif font-bold text-xl text-text-primary">72 bpm</h3>
                            </div>
                            <div className="bg-parchment-dark rounded-xl p-4 border border-border/50 text-center">
                                <Thermometer className="w-5 h-5 text-alert mx-auto mb-2" />
                                <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Weight</p>
                                <h3 className="font-serif font-bold text-xl text-text-primary">76 kg</h3>
                            </div>
                            <div className="bg-terracotta/10 rounded-xl p-4 border border-terracotta/30 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-8 h-8 bg-terracotta rotate-45 translate-x-4 -translate-y-4"></div>
                                <Droplet className="w-5 h-5 text-terracotta mx-auto mb-2" />
                                <p className="text-xs text-terracotta uppercase tracking-widest mb-1 font-bold">Dosha Type</p>
                                <h3 className="font-serif font-bold text-xl text-terracotta">Vata</h3>
                            </div>
                        </div>

                        {/* Diagnosis */}
                        <div className="mb-10">
                            <h2 className="font-serif font-bold text-xl text-forest-dark uppercase tracking-widest mb-4">Primary Diagnosis</h2>
                            <div className="bg-parchment-dark p-4 rounded-lg border-l-4 border-forest-dark text-text-primary leading-relaxed text-sm">
                                Patient presents with Kati Shula (Lower Back Pain) extending to the left radicular path. Primary dosha imbalance identified as Vata Vyadhi due to sedentary lifestyle and recent acute strain.
                            </div>
                        </div>

                        {/* Prescription Table */}
                        <div className="mb-10">
                            <h2 className="font-serif font-bold text-xl text-forest-dark uppercase tracking-widest mb-4">Prescribed Medicines</h2>
                            <div className="border border-border rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-forest-dark text-parchment font-sans uppercase text-xs tracking-wider">
                                        <tr>
                                            <th className="p-4 font-medium">Medicine Name</th>
                                            <th className="p-4 font-medium">Dosage</th>
                                            <th className="p-4 font-medium">Frequency</th>
                                            <th className="p-4 font-medium">Instructions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border font-sans">
                                        <tr className="bg-white">
                                            <td className="p-4 font-medium text-text-primary">Dashamoola Kashayam</td>
                                            <td className="p-4 text-text-secondary">15 ml</td>
                                            <td className="p-4 text-text-secondary">Twice Daily</td>
                                            <td className="p-4 text-text-secondary">Before meals with equal water</td>
                                        </tr>
                                        <tr className="bg-parchment-dark">
                                            <td className="p-4 font-medium text-text-primary">Yogaraja Guggulu</td>
                                            <td className="p-4 text-text-secondary">2 Tablets</td>
                                            <td className="p-4 text-text-secondary">Twice Daily</td>
                                            <td className="p-4 text-text-secondary">After meals with lukewarm water</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="p-4 font-medium text-text-primary">Mahanarayana Taila</td>
                                            <td className="p-4 text-text-secondary">Q.S.</td>
                                            <td className="p-4 text-text-secondary">Once Daily</td>
                                            <td className="p-4 text-text-secondary">External application (Kati Basti locally)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Doctors Notes */}
                        <div className="mb-10">
                            <h2 className="font-serif font-bold text-xl text-forest-dark uppercase tracking-widest mb-4">Doctor's Clinical Notes</h2>
                            <blockquote className="bg-white p-6 border-l-4 border-l-terracotta rounded-r-xl shadow-sm italic font-serif text-lg leading-relaxed text-text-secondary border-y border-r border-border/50">
                                Patient advised to avoid cold exposure and vata-aggravating foods (beans, cabbage, dry snacks). Continue gentle stretching and rest for 5 days. Follow up after 2 weeks for Kati Basti review.
                            </blockquote>
                        </div>

                        {/* Signatures */}
                        <div className="mt-16 flex justify-between items-end border-t border-border pt-8">
                            <div className="text-sm font-sans text-text-secondary">
                                <p>Generated on: Oct 24, 2023 10:45 AM</p>
                                <p className="mt-1 text-xs">Digitally signed via VaidyaConnect Gateway</p>
                            </div>
                            <div className="text-center">
                                <div className="font-serif text-2xl text-terracotta/40 italic mb-2">Dr. Ananya Sharma</div>
                                <div className="w-48 h-px bg-text-primary mb-2"></div>
                                <p className="font-serif font-bold text-forest-dark">Dr. Ananya Sharma</p>
                                <p className="text-xs font-sans text-text-secondary">BAMS, MD (Ayurveda)</p>
                                <p className="text-xs font-mono text-text-secondary mt-1">Reg No: AYU-92384</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmrViewer;
