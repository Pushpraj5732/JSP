import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Mic, X, Leaf, AlertTriangle } from 'lucide-react';

interface Message {
    id: number;
    role: 'user' | 'bot';
    text: string;
    severity?: 'HIGH' | 'MODERATE' | 'LOW';
    lang?: string;
}

/* ── Floating Widget + Full Page Chatbot ── */
export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'bot', text: 'Hello! I\'m your AYUSH health assistant. Describe your symptoms in English, हिन्दी, ગુજરાતી, or संस्कृतम्.' },
    ]);
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const detectLang = (text: string) => {
        if (/[\u0A80-\u0AFF]/.test(text)) return 'GU';
        if (/[\u0900-\u097F]/.test(text)) return 'HI';
        return 'EN';
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        const lang = detectLang(input);
        const userMsg: Message = { id: Date.now(), role: 'user', text: input, lang };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        // Simulated bot response
        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now() + 1,
                role: 'bot',
                text: 'Based on your symptoms, I recommend consulting an AYUSH practitioner. Please provide more details for a comprehensive analysis.',
                severity: 'LOW',
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 800);
    };

    const handleVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
        const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechAPI();
        recognition.lang = 'en-IN';
        recognition.onresult = (e: any) => { setInput(e.results[0][0].transcript); setIsRecording(false); };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        setIsRecording(true);
        recognition.start();
    };

    const severityColor = (s?: string) => {
        if (s === 'HIGH') return 'badge-red';
        if (s === 'MODERATE') return 'badge-orange';
        return 'badge-green';
    };

    const ChatContent = ({ compact = false }: { compact?: boolean }) => (
        <div className={`flex flex-col ${compact ? 'h-full' : 'h-[calc(100vh-200px)] min-h-[500px]'}`}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${msg.role === 'user'
                            ? 'bg-dark text-white rounded-[8px_8px_0_8px]'
                            : 'bg-white border border-border rounded-[8px_8px_8px_0]'
                            } px-4 py-3 relative`}>
                            {msg.severity && (
                                <span className={`badge ${severityColor(msg.severity)} absolute -top-2 -right-2 text-[9px]`}>
                                    {msg.severity}
                                </span>
                            )}
                            <p className={`font-body text-[13px] ${msg.role === 'user' ? 'text-white' : 'text-txt-body'}`}>
                                {msg.text}
                            </p>
                            {msg.lang && msg.role === 'user' && (
                                <span className="font-mono text-[10px] text-white/40 mt-1 block">{msg.lang}</span>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-white p-3 flex gap-2 items-end">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    className="textarea text-sm py-2 min-h-[40px] max-h-[100px]"
                    rows={1}
                    placeholder=""
                />
                <button
                    onClick={handleVoice}
                    className={`w-10 h-10 rounded flex items-center justify-center shrink-0 border cursor-pointer transition-all ${isRecording ? 'bg-primary text-white border-primary animate-pulse-ring' : 'bg-white text-txt-muted border-border hover:bg-surface-alt'
                        }`}
                >
                    <Mic className="w-4 h-4" />
                </button>
                <button onClick={sendMessage} className="w-10 h-10 bg-dark text-white rounded flex items-center justify-center shrink-0 cursor-pointer hover:bg-dark-muted transition-colors">
                    <SendHorizontal className="w-4 h-4" />
                </button>
            </div>
            <p className="text-center font-mono text-[11px] text-txt-muted py-1.5 bg-surface-alt">
                Type in English, हिन्दी, ગુજરાતી, or संस्कृतम्
            </p>
        </div>
    );

    return (
        <>
            {/* ── Floating Launcher ── */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-[200] w-[50px] h-[50px] bg-dark border border-border rounded-xl flex items-center justify-center shadow-popup cursor-pointer hover:bg-dark-muted transition-all group"
            >
                {open ? <X className="w-5 h-5 text-white" /> : <Leaf className="w-5 h-5 text-primary" />}
            </button>

            {/* ── Floating Panel ── */}
            {open && (
                <div className="fixed bottom-20 right-6 z-[200] w-[360px] h-[500px] bg-surface border border-border rounded-xl shadow-popup overflow-hidden animate-slide-up sm:block hidden">
                    <div className="bg-dark px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-primary" />
                            <span className="font-heading font-semibold text-[13px] text-white">Vaidya AI</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="badge bg-white/10 text-white/70 text-[9px]">Auto</span>
                            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-dark cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <ChatContent compact />
                </div>
            )}
        </>
    );
}

/* ── Full Page Chatbot (for /patient/chatbot route) ── */
export function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'bot', text: 'Hello! I\'m your AYUSH health assistant. Describe your symptoms in English, हिन्दी, ગુજરાતી, or संस्कृतम्.' },
    ]);
    const [input, setInput] = useState('');
    const [activeLang, setActiveLang] = useState('EN');
    const [isRecording, setIsRecording] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const detectLang = (text: string) => {
        if (/[\u0A80-\u0AFF]/.test(text)) return 'GU';
        if (/[\u0900-\u097F]/.test(text)) return 'HI';
        return 'EN';
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        const lang = detectLang(input);
        setActiveLang(lang);
        const userMsg: Message = { id: Date.now(), role: 'user', text: input, lang };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setTimeout(() => {
            setMessages((prev) => [...prev, {
                id: Date.now() + 1, role: 'bot',
                text: 'Based on your symptoms, I recommend consulting an AYUSH practitioner.',
                severity: 'LOW',
            }]);
        }, 800);
    };

    const handleVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
        const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechAPI();
        recognition.lang = 'en-IN';
        recognition.onresult = (e: any) => { setInput(e.results[0][0].transcript); setIsRecording(false); };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        setIsRecording(true);
        recognition.start();
    };

    const severityColor = (s?: string) => {
        if (s === 'HIGH') return 'badge-red';
        if (s === 'MODERATE') return 'badge-orange';
        return 'badge-green';
    };

    return (
        <div className="page-enter max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-heading font-bold text-[32px] text-txt-primary">Symptom Assistant</h1>
                <div className="flex gap-1">
                    {['EN', 'HI', 'GU', 'SA'].map((l) => (
                        <span key={l} className={`px-2 py-1 rounded text-[11px] font-heading font-semibold cursor-pointer transition-all ${activeLang === l ? 'bg-dark text-white' : 'bg-surface-alt text-txt-muted'
                            }`}>
                            {l}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-surface-alt border border-border rounded-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] ${msg.role === 'user'
                                ? 'bg-dark text-white rounded-[8px_8px_0_8px]'
                                : 'bg-white border border-border rounded-[8px_8px_8px_0]'
                                } px-4 py-3 relative`}>
                                {msg.severity && (
                                    <span className={`badge ${severityColor(msg.severity)} absolute -top-2 -right-2 text-[9px]`}>
                                        <AlertTriangle className="w-3 h-3 mr-0.5" />{msg.severity}
                                    </span>
                                )}
                                <p className={`font-body text-[13px] ${msg.role === 'user' ? 'text-white' : 'text-txt-body'}`}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t border-border bg-white p-4 flex gap-3 items-end">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                        className="textarea text-sm py-2.5 min-h-[44px] max-h-[120px]"
                        rows={1}
                    />
                    <button
                        onClick={handleVoice}
                        className={`w-11 h-11 rounded flex items-center justify-center shrink-0 border cursor-pointer transition-all ${isRecording ? 'bg-primary text-white border-primary animate-pulse-ring' : 'bg-white text-txt-muted border-border hover:bg-surface-alt'
                            }`}
                    >
                        <Mic className="w-4 h-4" />
                    </button>
                    <button onClick={sendMessage} className="w-11 h-11 bg-dark text-white rounded flex items-center justify-center shrink-0 cursor-pointer hover:bg-dark-muted transition-colors">
                        <SendHorizontal className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-center font-mono text-[11px] text-txt-muted py-2 bg-surface-alt border-t border-border">
                    Type in English, हिन्दी, ગુજરાતી, or संस्कृतम्
                </p>
            </div>
        </div>
    );
}
