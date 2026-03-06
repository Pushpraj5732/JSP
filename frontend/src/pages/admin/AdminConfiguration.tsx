import { useState } from 'react';
import { Settings, Save, Database } from 'lucide-react';

export default function AdminConfiguration() {
    const [apiUrl, setApiUrl] = useState('');
    const [chatbotEnabled, setChatbotEnabled] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="page-enter max-w-3xl mx-auto">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-8">Configuration</h1>

            <div className="space-y-6">
                {/* API Settings */}
                <div className="card-flat p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Database className="w-4 h-4 text-primary" />
                        <h3 className="font-heading font-semibold text-lg text-txt-primary">API Settings</h3>
                    </div>
                    <div>
                        <label className="block font-heading font-semibold text-xs text-txt-muted mb-1.5 uppercase tracking-wider">Base URL</label>
                        <input type="text" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} className="input" />
                    </div>
                </div>

                {/* Feature Toggles */}
                <div className="card-flat p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Settings className="w-4 h-4 text-primary" />
                        <h3 className="font-heading font-semibold text-lg text-txt-primary">Feature Toggles</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-border">
                            <div>
                                <p className="font-heading font-semibold text-sm text-txt-primary">AI Chatbot</p>
                                <p className="font-body text-xs text-txt-muted">Enable the AI symptom chatbot</p>
                            </div>
                            <button
                                onClick={() => setChatbotEnabled(!chatbotEnabled)}
                                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${chatbotEnabled ? 'bg-dark' : 'bg-border'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${chatbotEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-heading font-semibold text-sm text-txt-primary">Maintenance Mode</p>
                                <p className="font-body text-xs text-txt-muted">Temporarily disable user access</p>
                            </div>
                            <button
                                onClick={() => setMaintenanceMode(!maintenanceMode)}
                                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${maintenanceMode ? 'bg-primary' : 'bg-border'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${maintenanceMode ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="btn-primary cursor-pointer">
                        <Save className="w-4 h-4" /> Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
