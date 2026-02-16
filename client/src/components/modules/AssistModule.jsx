import React from 'react';
import { MessageSquare, Clock, UserCheck, CheckCircle2, MoreHorizontal } from 'lucide-react';

const AssistModule = () => {
    const tickets = [
        { id: 'TKT-102', subject: 'Cloud VPN Access Protocol', user: 'Sarah Chen', status: 'High', time: '2h ago', level: 'L2 Engineer' },
        { id: 'TKT-098', subject: 'Mesh ID Password Reset', user: 'Mike Ross', status: 'Medium', time: '5h ago', level: 'L1 Support' }
    ];

    const stats = [
        { label: 'Unresolved Ops', value: '24', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-500/10' },
        { label: 'SLA Latency', value: '1.4h', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
        { label: 'Assigned Mesh', value: '18', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-500/10' },
        { label: 'Resolved (24h)', value: '42', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/10' }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                <div>
                    <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Service Mesh Support</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-lg mt-2">Real-time incident resolution and global SLA monitoring.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all hover:-translate-y-2 group cursor-pointer text-center relative overflow-hidden">
                        <div className={`p-5 ${stat.bg} w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 border border-slate-100 dark:border-transparent`}>
                            <stat.icon className={`w-10 h-10 ${stat.color}`} />
                        </div>
                        <h4 className="text-4xl font-black text-slate-950 dark:text-white mb-2 tracking-tighter tabular-nums">{stat.value}</h4>
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.3em]">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800/70 rounded-[3.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl backdrop-blur-xl">
                <div className="p-10 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/40">
                    <div className="text-left">
                        <h4 className="font-black text-slate-950 dark:text-white uppercase tracking-[0.4em] text-xs">Active Incident Queue</h4>
                        <p className="text-[10px] text-slate-600 dark:text-slate-500 font-black uppercase tracking-widest mt-1">Support Thread Verification Active</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 px-5 py-2 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-full">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                            <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">12 Agents Active</span>
                        </div>
                    </div>
                </div>
                <div className="p-10 space-y-6">
                    {tickets.map((t, i) => (
                        <div key={i} className="flex flex-col lg:flex-row items-center justify-between p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-600/50 transition-all group scale-100 active:scale-98 cursor-pointer relative overflow-hidden text-left">
                            <div className="flex items-center gap-8 w-full">
                                <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex flex-col items-center justify-center text-white font-black tracking-tighter shadow-2xl shadow-blue-500/40 group-hover:scale-105 transition-transform duration-500 relative z-10 border border-blue-400/30">
                                    <span className="text-[8px] opacity-80 uppercase mb-0.5 tracking-widest">Incident</span>
                                    <span className="text-base text-white">{t.id.split('-')[1]}</span>
                                </div>
                                <div className="flex-1 relative z-10 text-left">
                                    <h5 className="font-black text-2xl text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors tracking-tight leading-none mb-3">{t.subject}</h5>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                                            <span className="text-[10px] text-slate-950 dark:text-white font-black uppercase tracking-widest leading-none">{t.user}</span>
                                        </div>
                                        <span className="text-xs text-slate-600 dark:text-slate-500 font-black tracking-widest uppercase">{t.level}</span>
                                        <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-500 font-black bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="tabular-nums">RECEIVED {t.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 mt-8 lg:mt-0 w-full lg:w-auto relative z-10">
                                <span className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl border ${t.status === 'High'
                                        ? 'bg-rose-600 text-white border-rose-400 shadow-rose-500/30'
                                        : 'bg-amber-600 text-white border-amber-400 shadow-amber-500/30'
                                    }`}>
                                    {t.status} Priority
                                </span>
                                <button className="w-14 h-14 bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white rounded-[1.5rem] flex items-center justify-center text-slate-500 transition-all border border-slate-200 dark:border-slate-700 shadow-inner group-hover:shadow-2xl">
                                    <MoreHorizontal className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssistModule;
