import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';
import { Cross, Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react';

type Mode = 'login' | 'register';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [mode, setMode] = useState<Mode>('login');
    const [role, setRole] = useState<UserRole>('patient');
    const [step, setStep] = useState(1);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Login fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Register fields
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [dob, setDob] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [ayushCategory, setAyushCategory] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const roles: { value: UserRole; label: string }[] = [
        { value: 'patient', label: 'Patient' },
        { value: 'hospital', label: 'Hospital' },
        { value: 'admin', label: 'Admin' },
    ];

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const user = await login(email, password, role);
            navigate(`/${user.role}`);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setError('');
        setLoading(true);
        try {
            await register({
                name: regName,
                email: regEmail,
                password: regPassword,
                role,
                dob,
                bloodGroup,
                ayushCategory,
                specialization,
                licenseNo,
            });
            setMode('login');
            setStep(1);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* ─── Left Panel (Dark) ─── */}
            <div className="hidden lg:flex lg:w-1/2 bg-dark flex-col justify-between p-12 relative">
                <Link to="/" className="flex items-center gap-2">
                    <Cross className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <span className="font-heading font-bold text-xl text-white">Sanjeevani</span>
                </Link>

                <div className="max-w-md">
                    <h1 className="font-heading font-bold text-[40px] text-white leading-tight">
                        Your health journey,<br />powered by tradition<br />and technology.
                    </h1>
                </div>

                <div className="space-y-3">
                    {[
                        'AI-powered symptom analysis',
                        'Traditional AYUSH healthcare integration',
                        'Secure encrypted health records',
                    ].map((point, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-sm shrink-0" />
                            <span className="font-mono text-xs text-white/50">{point}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Right Panel (Light) ─── */}
            <div className="flex-1 bg-white flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    {error && (
                        <div className="mb-4 p-3 bg-danger-subtle text-primary font-body text-sm rounded border border-red-200">
                            {error}
                        </div>
                    )}

                    {mode === 'login' ? (
                        /* ── LOGIN ── */
                        <div className="page-enter">
                            <h2 className="font-heading font-bold text-[32px] text-txt-primary">Welcome back</h2>
                            <p className="font-body text-sm text-txt-muted mt-1 mb-8">Sign in to your account</p>

                            {/* Role Selector */}
                            <div className="flex gap-2 mb-6">
                                {roles.map((r) => (
                                    <button
                                        key={r.value}
                                        onClick={() => setRole(r.value)}
                                        className={`flex-1 py-2.5 text-center font-heading font-semibold text-sm rounded border-[1.5px] transition-all cursor-pointer ${role === r.value
                                            ? 'bg-dark text-white border-dark'
                                            : 'bg-white text-txt-primary border-border hover:border-dark/30'
                                            }`}
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                                </div>
                                <div>
                                    <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="input pr-10"
                                        />
                                        <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted cursor-pointer">
                                            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <button className="font-mono text-xs text-primary mt-2 hover:underline cursor-pointer">Forgot password?</button>
                                </div>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="btn-primary w-full mt-6 py-3 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? 'Signing in...' : 'Login'}
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-3 my-6">
                                <div className="flex-1 h-px bg-border" />
                                <span className="font-body text-xs text-txt-muted">or</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <button onClick={() => { setMode('register'); setStep(1); }} className="w-full text-center font-body text-sm text-primary hover:underline cursor-pointer">
                                Create an account
                            </button>
                        </div>
                    ) : (
                        /* ── REGISTER ── */
                        <div className="page-enter">
                            <div className="flex items-center gap-2 mb-8">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex items-center gap-2">
                                        <div className={`w-8 h-8 flex items-center justify-center font-heading font-bold text-sm rounded transition-all ${step >= s ? 'bg-dark text-white' : 'bg-white text-txt-muted border border-border'
                                            }`}>
                                            {step > s ? <Check className="w-4 h-4" /> : s}
                                        </div>
                                        {s < 3 && <div className={`w-8 border-t-[1.5px] border-dashed ${step > s ? 'border-dark' : 'border-border'}`} />}
                                    </div>
                                ))}
                            </div>

                            <h2 className="font-heading font-bold text-[28px] text-txt-primary">Create Account</h2>
                            <p className="font-body text-sm text-txt-muted mt-1 mb-6">Step {step} of 3</p>

                            {step === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Full Name</label>
                                        <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} className="input" />
                                    </div>
                                    <div>
                                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Email</label>
                                        <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="input" />
                                    </div>
                                    <div>
                                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Password</label>
                                        <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="input" />
                                    </div>
                                    <div>
                                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Role</label>
                                        <div className="flex gap-2">
                                            {roles.map((r) => (
                                                <button
                                                    key={r.value}
                                                    onClick={() => setRole(r.value)}
                                                    className={`flex-1 py-2.5 rounded border-[1.5px] font-heading font-semibold text-sm transition-all cursor-pointer ${role === r.value ? 'bg-dark text-white border-dark' : 'bg-white text-txt-primary border-border'
                                                        }`}
                                                >
                                                    {r.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    {role === 'patient' && (
                                        <>
                                            <div>
                                                <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Date of Birth</label>
                                                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input" />
                                            </div>
                                            <div>
                                                <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Blood Group</label>
                                                <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="input">
                                                    <option value="">Select</option>
                                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                                                        <option key={g} value={g}>{g}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">AYUSH Category</label>
                                                <select value={ayushCategory} onChange={(e) => setAyushCategory(e.target.value)} className="input">
                                                    <option value="">Select</option>
                                                    {['Ayurveda', 'Yoga & Naturopathy', 'Unani', 'Siddha', 'Homeopathy'].map((c) => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    {role === 'hospital' && (
                                        <>
                                            <div>
                                                <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Specialization</label>
                                                <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="input" />
                                            </div>
                                            <div>
                                                <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">License Number</label>
                                                <input type="text" value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} className="input" />
                                            </div>
                                        </>
                                    )}
                                    {role === 'admin' && (
                                        <p className="font-body text-sm text-txt-muted py-8 text-center">No additional fields required for admin registration.</p>
                                    )}
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <p className="font-body text-sm text-txt-muted mb-6">Enter the 6-digit code sent to your email</p>
                                    <div className="flex gap-3 justify-center mb-6">
                                        {otp.map((digit, i) => (
                                            <input
                                                key={i}
                                                id={`otp-${i}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                                className="w-[44px] h-[52px] border-[1.5px] border-border rounded text-center font-mono text-2xl text-txt-primary focus:border-primary focus:shadow-focus outline-none transition-all"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 mt-6">
                                {step > 1 && (
                                    <button onClick={() => setStep(step - 1)} className="btn-secondary flex-1 cursor-pointer">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button onClick={() => setStep(step + 1)} className="btn-primary flex-1 cursor-pointer">
                                        Next <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button onClick={handleRegister} disabled={loading} className="btn-primary flex-1 cursor-pointer disabled:opacity-50">
                                        {loading ? 'Creating...' : 'Create Account'}
                                    </button>
                                )}
                            </div>

                            <div className="text-center mt-6">
                                <button onClick={() => { setMode('login'); setStep(1); }} className="font-body text-sm text-primary hover:underline cursor-pointer">
                                    Already have an account? Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
