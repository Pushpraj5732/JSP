import { Link } from 'react-router-dom';
import { Cross } from 'lucide-react';

const footerLinks = [
    {
        title: 'Platform',
        links: [
            { label: 'Patient Dashboard', path: '/patient' },
            { label: 'Doctor Portal', path: '/doctor' },
            { label: 'Hospital/Admin', path: '/admin' },
            { label: 'Book Appointment', path: '/patient/book' },
            { label: 'Voice Triage', path: '/#triage' },
        ],
    },
    {
        title: 'AYUSH Modules',
        links: [
            { label: 'Ayurveda Care', path: '#' },
            { label: 'Yoga & Naturopathy', path: '#' },
            { label: 'Unani Medicine', path: '#' },
            { label: 'Siddha Practices', path: '#' },
            { label: 'Homeopathy', path: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Medical Reports', path: '/#reports' },
            { label: 'Health Events', path: '/#events' },
            { label: 'Ayurveda Dictionary', path: '#' },
            { label: 'Wellness Blog', path: '#' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Help Center', path: '#' },
            { label: 'Emergency Contact', path: '#' },
            { label: 'Privacy Policy', path: '#' },
            { label: 'Terms & Conditions', path: '#' },
            { label: 'Contact Us', path: '#' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-dark text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand & Mission */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <Cross className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform duration-500" strokeWidth={2.5} />
                            <span className="font-heading font-bold text-2xl tracking-tighter">Sanjeevani</span>
                        </Link>
                        <p className="font-body text-sm text-white/50 leading-relaxed mb-8">
                            Empowering millions through the integration of digital innovation and traditional AYUSH wisdom.
                            India's leading platform for holistic healthcare navigation.
                        </p>
                        <div className="flex gap-4">
                            {/* Simple Social Icons placeholders */}
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer" />
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerLinks.map((col) => (
                        <div key={col.title}>
                            <h4 className="font-heading font-bold text-xs text-primary uppercase tracking-widest mb-6">
                                {col.title}
                            </h4>
                            <ul className="space-y-4">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="font-body text-sm text-white/50 hover:text-white transition-colors flex items-center group gap-2"
                                        >
                                            <span className="w-0 group-hover:w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div className="flex flex-col gap-1">
                        <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                            © 2026 Sanjeevani Healthcare Platform. All rights reserved.
                        </p>
                        <p className="text-[10px] text-white/20 font-body italic">
                            Published by the Ministry of AYUSH Digital Transformation Wing
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                        {['Privacy', 'Security', 'Compliance', 'Sitemap'].map(item => (
                            <a key={item} href="#" className="font-body text-[11px] text-white/30 hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
