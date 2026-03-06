import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
    LayoutDashboard, CalendarDays, Users, ScanLine, LogOut,
} from 'lucide-react';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/hospital' },
    { icon: CalendarDays, label: 'Schedule', path: '/hospital/schedule' },
    { icon: Users, label: 'Patients', path: '/hospital/patients' },
    { icon: ScanLine, label: 'QR Scanner', path: '/hospital/qr-scanner' },
];

export default function HospitalLayout() {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-surface-alt flex flex-col">
            {/* Desktop Top Nav (App Style) */}
            <nav className="hidden md:flex items-center justify-between bg-white border-b border-border px-8 h-14 shadow-sm sticky top-0 z-40">
                <div className="flex space-x-1 h-full">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2 px-4 h-full border-b-2 transition-colors ${location.pathname === item.path
                                ? 'border-secondary text-secondary font-heading font-bold'
                                : 'border-transparent text-txt-muted hover:text-dark hover:bg-slate-50 font-heading font-semibold'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="text-[13px] uppercase tracking-wider">{item.label}</span>
                        </Link>
                    ))}
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-heading font-bold text-txt-muted hover:text-primary transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    LOGOUT
                </button>
            </nav>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] h-16 flex items-center justify-around z-50 pb-safe">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-heading font-semibold transition-colors ${location.pathname === item.path ? 'text-secondary bg-emerald-50/50' : 'text-txt-muted'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'fill-brand-green/10' : ''}`} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Main Content */}
            <main className="flex-1 w-full p-4 md:p-8 pb-24 md:pb-8">
                <Outlet />
            </main>
        </div>
    );
}
