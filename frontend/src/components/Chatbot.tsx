import { useState } from 'react';
import { MessageCircle, X, Send, Mic, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState('EN');

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Expanded Widget */}
            {isOpen && (
                <div className="w-[380px] h-[520px] bg-parchment rounded-2xl shadow-2xl mb-4 overflow-hidden flex flex-col transform transition-all origin-bottom-right animate-[fadeUp_300ms_ease-out]">
                    {/* Header */}
                    <div className="bg-forest-dark text-parchment p-4 flex justify-between items-center rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-turmeric" />
                            <h3 className="font-serif font-bold text-xl">Vaidya AI</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                                className="bg-white/10 border border-parchment/20 rounded px-2 py-1 text-xs font-sans text-parchment focus:outline-none"
                            >
                                <option value="EN">EN</option>
                                <option value="HI">HI</option>
                                <option value="GU">GU</option>
                            </select>
                            <button onClick={() => setIsOpen(false)} className="hover:text-turmeric transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm pb-8 flex flex-col">
                        <div className="flex justify-start">
                            <div className="bg-parchment-dark text-text-primary px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] border-l-[3px] border-forest">
                                <p>Namaste! I am Vaidya AI. Please describe your symptoms or ask me about AYUSH treatments.</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="bg-terracotta text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                                <p>I have a burning sensation in my stomach and feel irritable. What could it be?</p>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <div className="bg-parchment-dark text-text-primary p-4 rounded-2xl rounded-tl-sm max-w-[85%] border-l-[3px] border-forest shadow-sm">
                                <p className="mb-3">Based on your symptoms, here is a preliminary analysis:</p>
                                <div className="bg-white rounded-xl p-3 border border-border space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Possible Imbalance:</span>
                                        <span className="bg-alert/10 text-alert px-2 py-0.5 rounded text-xs font-bold">Pitta Dosha</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Suggested Herbs:</span>
                                        <span className="text-forest">Amalaki, Shatavari</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Specialist:</span>
                                        <span className="text-forest">Ayurvedic Doctor</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-text-secondary mt-3 uppercase tracking-wider">Disclaimer: AI generated suggestion, please consult a Vaidya</p>
                            </div>
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="p-3 bg-parchment-dark border-t border-border flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Describe your symptoms..."
                            className="flex-1 bg-white border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-forest"
                        />
                        <button className="bg-parchment p-2 rounded-full text-terracotta hover:bg-white hover:text-terracotta transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button className="bg-turmeric p-2 rounded-full text-text-primary hover:opacity-90 transition-colors shadow-sm">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Launcher */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-turmeric rounded-full flex items-center justify-center text-forest-dark shadow-lg hover:scale-105 active:scale-95 transition-all outline-none"
                    title="Open Vaidya AI Chat"
                >
                    <MessageCircle className="w-7 h-7" />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
