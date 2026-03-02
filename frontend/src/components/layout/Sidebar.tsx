import { LayoutDashboard, Calendar, FileText, User, Pill, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    role: 'patient' | 'doctor' | 'admin';
    userName: string;
}

const Sidebar = ({ role, userName }: SidebarProps) => {
    const location = useLocation();
    const path = location.pathname;

    const navItems = {
        patient: [
            { name: 'Overview', path: '/patient', icon: LayoutDashboard },
            { name: 'Book Appointment', path: '/patient/book', icon: Calendar },
            { name: 'My Records', path: '/emr', icon: FileText },
            { name: 'Prescriptions', path: '/patient/prescriptions', icon: Pill },
            { name: 'Profile', path: '/patient/profile', icon: User },
        ],
        doctor: [
            { name: 'My Patients', path: '/doctor/patients', icon: User },
            { name: 'Today\'s Appointments', path: '/doctor', icon: Calendar },
            { name: 'Medical Records', path: '/emr', icon: FileText },
            { name: 'Schedule', path: '/doctor/schedule', icon: Calendar },
        ],
        admin: [
            { name: 'Overview', path: '/admin', icon: LayoutDashboard },
            { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
            { name: 'Doctors', path: '/admin/doctors', icon: User },
            { name: 'Patients', path: '/admin/patients', icon: User },
        ]
    };

    const items = navItems[role];

    return (
        <aside className="w-[260px] bg-forest-dark text-parchment fixed h-screen left-0 top-0 flex flex-col z-40 hidden md:flex">
            <div className="py-8 px-6 flex flex-col items-center border-b border-parchment/10">
                <div className="w-20 h-20 bg-turmeric/20 rounded-full flex items-center justify-center mb-4 text-turmeric">
                    <User className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-xl">{userName}</h3>
                <span className="bg-turmeric/20 text-turmeric px-3 py-1 rounded-full text-xs font-medium mt-2 capitalize">
                    {role}
                </span>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                {items.map((item) => {
                    const isActive = path === item.path;
                    const IconComponent = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-sm font-medium transition-colors ${isActive
                                    ? 'bg-turmeric/15 border-l-4 border-turmeric text-turmeric'
                                    : 'text-parchment/80 hover:bg-white/5 border-l-4 border-transparent'
                                }`}
                        >
                            <IconComponent className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-parchment/10">
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-parchment/80 hover:bg-white/5 rounded-lg font-sans text-sm font-medium transition-colors">
                    <LogOut className="w-5 h-5" />
                    Logout
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
