import React from 'react';
import { Plus, List, CheckCircle, Clock, Zap } from 'lucide-react';

const ITModule = () => {
    const projects = [
        { title: 'Cloud Infrastructure Upgrade', status: 'In Progress', priority: 'High', deadline: '2026-03-01', lead: 'Sarah Jenkins' },
        { title: 'Legacy ERP Maintenance', status: 'Pending', priority: 'Medium', deadline: '2026-03-15', lead: 'John Doe' }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-left">
                    <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Enterprise IT Projects</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-lg mt-2">Manage global infrastructure roadmap and sprint deliverables.</p>
                </div>
                <button className="flex items-center gap-3 px-7 py-3.5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 active:scale-95 group">
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span>Initialize Project</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                    { label: 'Total Initiatives', value: '12', color: 'blue', icon: Zap },
                    { label: 'Active Sprints', value: '05', color: 'amber', icon: Clock },
                    { label: 'Verified Tasks', value: '142', color: 'emerald', icon: CheckCircle }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-none flex items-center gap-6 group hover:border-blue-500/30 transition-all text-left">
                        <div className={`w-16 h-16 ${stat.color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : stat.color === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'} rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.3em] mb-1 block">{stat.label}</span>
                            <div className="text-4xl font-black text-slate-950 dark:text-white leading-none tracking-tighter tabular-nums">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800/80 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-10 py-7 text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Project Vector</th>
                            <th className="px-10 py-7 text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Lifecycle Status</th>
                            <th className="px-10 py-7 text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Priority</th>
                            <th className="px-10 py-7 text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Deadline</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {projects.map((p, i) => (
                            <tr key={i} className="hover:bg-blue-50 dark:hover:bg-blue-600/10 transition-all group cursor-pointer text-left">
                                <td className="px-10 py-8">
                                    <div className="flex flex-col">
                                        <span className="font-black text-lg text-slate-950 dark:text-white tracking-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{p.title}</span>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mt-1">Lead: {p.lead}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border ${p.status === 'In Progress'
                                            ? 'bg-blue-600 text-white border-blue-400/50 shadow-blue-500/20'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-950 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                                        }`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${p.priority === 'High' ? 'bg-rose-600 animate-pulse shadow-[0_0_8px_rgba(225,29,72,0.5)]' : 'bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]'}`}></div>
                                        <span className="font-black text-slate-900 dark:text-slate-300 text-xs uppercase tracking-widest">{p.priority} Level</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 inline-block">
                                        <span className="text-slate-950 dark:text-slate-400 font-black font-mono text-sm tracking-tighter">{p.deadline}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ITModule;
