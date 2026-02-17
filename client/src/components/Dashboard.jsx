import React, { useState, useEffect } from 'react';
import { Layout, Shield, Activity, HelpCircle, Laptop, LogOut, Menu, X, Moon, Sun, Bell, Search, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ITModule from './modules/ITModule';
import RxModule from './modules/RxModule';
import AssistModule from './modules/AssistModule';
import ShieldModule from './modules/ShieldModule';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const navItems = [
        { name: 'Dashboard', icon: Layout },
        { name: 'IT Module', icon: Laptop },
        { name: 'Doh Rx', icon: Activity },
        { name: 'Doh Assist', icon: HelpCircle },
        { name: 'Doh Shield', icon: Shield }
    ];

    const dashboardStats = [
        { title: 'IT Department', icon: Laptop, color: 'text-blue-600 dark:text-blue-400', id: 'IT Module', desc: 'Active Projects', bg: 'bg-blue-100/50 dark:bg-blue-500/10' },
        { title: 'Doh Rx', icon: Activity, color: 'text-emerald-600 dark:text-emerald-400', id: 'Doh Rx', desc: 'Inventory Status', bg: 'bg-emerald-100/50 dark:bg-emerald-500/10' },
        { title: 'Doh Assist', icon: HelpCircle, color: 'text-amber-600 dark:text-amber-400', id: 'Doh Assist', desc: 'Ticket Queue', bg: 'bg-amber-100/50 dark:bg-amber-500/10' },
        { title: 'Doh Shield', icon: Shield, color: 'text-rose-600 dark:text-rose-400', id: 'Doh Shield', desc: 'Incident Reports', bg: 'bg-rose-100/50 dark:bg-rose-500/10' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'IT Module': return <ITModule />;
            case 'Doh Rx': return <RxModule />;
            case 'Doh Assist': return <AssistModule />;
            case 'Doh Shield': return <ShieldModule />;
            default: return (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h3 className="text-4xl font-black text-slate-950 dark:text-white mb-3 tracking-tight">
                                Welcome back, <span className="text-blue-700 dark:text-blue-400 underline decoration-blue-500/30 underline-offset-8 decoration-4">{user?.firstName}</span>
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-semibold leading-relaxed">
                                Branch: <span className="font-black text-slate-800 dark:text-white uppercase">{user?.branch}</span> | Post: <span className="font-black text-slate-800 dark:text-white uppercase">{user?.post}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* User Avatars Placeholder */}
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <span className="text-xs font-bold text-slate-400">U{i}</span>
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">+</div>
                            </div>
                            <span className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Team Active</span>
                        </div>
                    </div>

                    {/* Branch Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {dashboardStats.map((m, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveTab(m.id)}
                                className="bg-white dark:bg-slate-800/80 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:border-blue-600 dark:hover:border-blue-400/30 transition-all cursor-pointer group scale-100 active:scale-95 relative overflow-hidden backdrop-blur-sm"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <m.icon className={`w-7 h-7 ${m.color}`} />
                                </div>
                                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{m.title}</h4>
                                <p className="text-sm font-black text-blue-700 dark:text-blue-400 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                    {m.desc}
                                </p>
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Enterprise Index Card */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#1E40AF] dark:from-[#0F172A] dark:via-[#1E1B4B] dark:to-[#020617] p-10 rounded-[3rem] shadow-2xl shadow-blue-400/30 dark:shadow-none text-white relative overflow-hidden min-h-[400px] flex flex-col justify-between border border-blue-400/20">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6 text-white text-xs font-black uppercase tracking-[0.3em]">
                                    <Activity className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                    System Status
                                </div>
                                <h4 className="text-2xl font-black mb-4 tracking-tight">Security & Operations Mesh</h4>
                                <p className="text-blue-50 text-base mb-10 font-bold max-w-lg leading-relaxed">
                                    All systems nominal. Secure connection established. Request traffic monitored.
                                </p>
                                <div className="flex items-end gap-2">
                                    <div className="text-8xl font-black mb-4 tracking-tighter tabular-nums drop-shadow-2xl text-white">100%</div>
                                    <div className="mb-8 text-emerald-300 font-black text-xl">Uptime</div>
                                </div>
                            </div>
                        </div>

                        {/* Alerts Card */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200 dark:border-slate-700 min-h-[400px]">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-3">
                                    <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center border border-rose-200/50">
                                        <Shield className="w-5 h-5 text-rose-600 dark:text-rose-500" />
                                    </div>
                                    System Alerts
                                </h4>
                                <div className="w-8 h-8 bg-slate-900 dark:bg-slate-950 rounded-lg flex items-center justify-center text-[10px] font-black text-white">!</div>
                            </div>
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem]">
                                    <p className="text-xs font-bold text-slate-500 text-center">No critical alerts at this time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-700 ease-in-out font-['Inter'] ${theme === 'dark' ? 'bg-[#020617] text-slate-300 font-medium' : 'bg-[#F1F5F9] text-slate-900 font-medium'}`}>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-slate-300 dark:border-slate-800/50 px-8 py-5 shadow-2xl z-50 transition-all duration-700">
                <div className="max-w-[1700px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 rotate-0 group-hover:rotate-12 transition-all duration-500">
                                <Plus className="w-7 h-7" />
                            </div>
                            <div className="hidden sm:block text-left">
                                <h1 className="text-3xl font-black text-slate-950 dark:text-white leading-none tracking-tighter uppercase transition-colors">DOH</h1>
                                <p className="text-[10px] font-bold text-slate-900 dark:text-slate-400 uppercase tracking-[0.2em] mt-1 whitespace-nowrap">INTERNATIONAL SERVICE</p>
                            </div>
                        </div>

                        <ul className="hidden xl:flex items-center gap-2 bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-[1.5rem] border border-slate-300/50 dark:border-white/5">
                            {navItems.map((item, i) => (
                                <li
                                    key={i}
                                    onClick={() => setActiveTab(item.name)}
                                    className={`flex items-center gap-3 px-6 py-2.5 rounded-[1.25rem] cursor-pointer transition-all duration-500 group ${activeTab === item.name
                                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 border border-blue-500/50'
                                        : 'hover:bg-blue-100/50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${activeTab === item.name ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
                                    <span className="font-black text-xs tracking-wider uppercase">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={toggleTheme} className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-700 active:scale-90 border overflow-hidden ${theme === 'light' ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-inner' : 'bg-slate-900 text-yellow-400 border-slate-800 shadow-xl shadow-slate-950/50'}`}>
                            <div className={`transition-all duration-700 transform ${theme === 'light' ? 'rotate-0' : 'rotate-[360deg]'}`}>
                                {theme === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                            </div>
                        </button>

                        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 pl-1.5 pr-5 py-1.5 rounded-[1.5rem] shadow-lg shadow-slate-200/50 dark:shadow-none transition-all hover:border-blue-600/50">
                            <div className="w-10 h-10 rounded-[1rem] bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-400/30 overflow-hidden">
                                {user?.photo && user.photo !== 'default-avatar.png' ?
                                    <img src={`http://localhost:5000${user.photo}`} alt="user" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                    :
                                    <span>{user?.firstName?.[0]}</span>
                                }
                            </div>
                            <div className="hidden sm:flex flex-col text-left">
                                <span className="text-sm font-black text-slate-950 dark:text-white leading-none whitespace-nowrap uppercase">{user?.firstName} {user?.lastName}</span>
                                <span className="text-[10px] text-blue-700 dark:text-blue-400 font-black uppercase tracking-widest mt-1">{user?.role}</span>
                            </div>
                        </div>

                        <button onClick={logout} className="w-12 h-12 bg-white dark:bg-slate-900 hover:bg-rose-100 dark:hover:bg-rose-950/20 border border-slate-300 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/50 rounded-2xl text-slate-500 hover:text-rose-600 transition-all active:scale-95 group flex items-center justify-center shadow-lg">
                            <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-32 min-h-screen">
                <section className="px-6 lg:px-12 pb-12 max-w-[1700px] mx-auto">
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl shadow-slate-300/40 dark:shadow-none min-h-[700px] transition-all duration-700 backdrop-blur-3xl overflow-hidden relative">
                        <div className="mb-14 pb-10 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
                            <div className="text-left">
                                <div className="flex items-center gap-3 text-[11px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-[0.4em] mb-3 leading-none">
                                    <div className="w-6 h-[2px] bg-blue-700 dark:bg-blue-400"></div>
                                    International Service Mesh
                                </div>
                                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter uppercase leading-none">{activeTab}</h2>
                            </div>
                        </div>
                        <div className="relative z-10 h-full">{renderContent()}</div>
                        <div className="absolute top-[20%] -right-20 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-[120px] pointer-events-none"></div>
                        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-600/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
