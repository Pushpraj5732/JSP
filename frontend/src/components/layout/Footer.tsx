import { Leaf, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-forest-deep text-parchment pt-32 pb-12 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[200px] bg-parchment rounded-[100%] scale-x-125 -translate-y-1/2" />

            <div className="editorial-layout relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-turmeric flex items-center justify-center rounded-xl rotate-6">
                                <Leaf className="text-forest-dark w-7 h-7" />
                            </div>
                            <span className="font-serif font-bold text-3xl tracking-tighter">VaidyaConnect</span>
                        </div>
                        <p className="text-lg text-parchment/60 font-serif leading-relaxed italic max-w-sm">
                            "A unified digital infrastructure for Bharat's ancient medicinal heritage."
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-turmeric">For Patients</h4>
                            <ul className="space-y-4 text-sm font-medium text-parchment/60">
                                <li><Link to="/patient/book" className="hover:text-parchment transition-colors">Find Doctors</Link></li>
                                <li><Link to="/#ayush" className="hover:text-parchment transition-colors">AI Triage</Link></li>
                                <li><Link to="/emr" className="hover:text-parchment transition-colors">Digital EMR</Link></li>
                                <li><Link to="/" className="hover:text-parchment transition-colors">Ayurvedic Pharmacy</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-turmeric">For Practitioners</h4>
                            <ul className="space-y-4 text-sm font-medium text-parchment/60">
                                <li><Link to="/doctor" className="hover:text-parchment transition-colors">Manage Practice</Link></li>
                                <li><Link to="/doctor" className="hover:text-parchment transition-colors">NABH Guidelines</Link></li>
                                <li><Link to="/admin" className="hover:text-parchment transition-colors">Resource Hub</Link></li>
                                <li><Link to="/doctor" className="hover:text-parchment transition-colors">Support</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-turmeric">Platform</h4>
                            <ul className="space-y-4 text-sm font-medium text-parchment/60">
                                <li><Link to="/" className="hover:text-parchment transition-colors">About Us</Link></li>
                                <li><Link to="/" className="hover:text-parchment transition-colors">Transparency</Link></li>
                                <li><Link to="/" className="hover:text-parchment transition-colors">Data Privacy</Link></li>
                                <li><Link to="/" className="hover:text-parchment transition-colors">Terms of Care</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-parchment/30">
                    <p>© 2023 VAIDYACONNECT GATEWAY. GOVERNMENT OF INDIA INITIATIVE.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-parchment transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-parchment transition-colors">Cookie settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
