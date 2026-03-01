import React from 'react';
import { Settings as SettingsIcon, Shield, User, Bell, Palette, Globe } from 'lucide-react';

const SettingsModule = () => {
    const sections = [
        { title: 'Profile', icon: User, desc: 'Manage your account details and preferences' },
        { title: 'Security', icon: Shield, desc: 'Update your password and security settings' },
        { title: 'Notifications', icon: Bell, desc: 'Configure how you receive alerts' },
        { title: 'Appearance', icon: Palette, desc: 'Customize the theme and layout' },
        { title: 'System', icon: Globe, desc: 'Regional and language settings' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
                    <SettingsIcon className="text-white" size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">Settings</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your system preferences and configuration.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <div key={section.title} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                                <section.icon className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Configure</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{section.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{section.desc}</p>
                    </div>
                ))}
            </div>

            <div className="p-8 bg-blue-600 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Need help?</h3>
                    <p className="text-blue-100 mb-6 max-w-md">Our IT support team is available 24/7 to help you with any system-related issues or configuration questions.</p>
                    <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95">
                        Contact Support
                    </button>
                </div>
                <div className="absolute right-[-5%] top-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute left-[-5%] bottom-[-10%] w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
            </div>
        </div>
    );
};

export default SettingsModule;
