import React from 'react';
import { ShieldAlert, Users, HardDrive, FileText, Lock, Globe } from 'lucide-react';

const ShieldModule = () => {
    const incidents = [
        { type: 'Unauthorized Credential Mesh', location: 'London Sector 4', time: '22:45 UTC', severity: 'Critical', tech: 'Biometric mismatch' },
        { type: 'System Protocol Latency', location: 'Tokyo Node-01', time: '21:12 UTC', severity: 'Medium', tech: 'Network handshake fail' }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                <div>
                    <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Security & Global Monitoring</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-lg mt-2 tracking-tight">Real-time incident response and mesh network surveillance.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700"></div>)}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest leading-none">Global Sec-Ops Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-slate-950 p-10 rounded-[3rem] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.4)] flex flex-col justify-between relative overflow-hidden group border border-slate-800">
                    <div className="relative z-10 flex justify-between items-start mb-12 text-left">
                        <div>
                            <p className="text-blue-400 font-black text-[11px] uppercase tracking-[0.4em] mb-3">Live Alerts</p>
                            <h4 className="text-7xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">02</h4>
                        </div>
                        <div className="p-5 bg-rose-500/20 rounded-[1.5rem] border border-rose-500/30 group-hover:scale-110 transition-transform duration-500">
                            <ShieldAlert className="w-12 h-12 text-rose-500" />
                        </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em]">Critical Protocol Intercept</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800/60 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/60 dark:shadow-none flex flex-col justify-between group hover:border-blue-600/30 transition-all backdrop-blur-sm text-left">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <p className="text-slate-600 dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] mb-3">Visitors (Net)</p>
                            <h4 className="text-7xl font-black text-slate-950 dark:text-white tracking-tighter tabular-nums">14</h4>
                        </div>
                        <div className="p-5 bg-blue-100 dark:bg-blue-500/10 rounded-[1.5rem] border border-blue-200/50 dark:border-blue-500/20 group-hover:scale-110 transition-all duration-500">
                            <Users className="w-12 h-12 text-blue-700 dark:text-blue-400" />
                        </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.3em]">Authorized Access Validated</span>
                </div>

                <div className="bg-white dark:from-slate-800 dark:to-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/60 dark:shadow-none flex flex-col justify-between group hover:border-emerald-600/30 transition-all backdrop-blur-sm text-left">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <p className="text-slate-600 dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] mb-3">Mesh Health</p>
                            <h4 className="text-7xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter tabular-nums leading-none">99 <span className="text-3xl opacity-50">%</span></h4>
                        </div>
                        <div className="p-5 bg-emerald-100 dark:bg-emerald-500/10 rounded-[1.5rem] border border-emerald-200/50 dark:border-emerald-500/20 group-hover:scale-110 transition-all duration-500">
                            <HardDrive className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        Global Connectivity Stable
                    </span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900/60 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl p-12 lg:p-16 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-16 relative z-10 text-left">
                    <h4 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-5 uppercase">
                        <div className="p-4 bg-blue-600 rounded-[1.5rem] shadow-xl shadow-blue-500/30">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        Network Security Logs
                    </h4>
                    <div className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.4em] px-8 py-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                        Operational Index: IS-OMS/SEC-77
                    </div>
                </div>

                <div className="space-y-8 relative z-10">
                    {incidents.map((inc, i) => (
                        <div key={i} className="flex flex-col lg:flex-row items-center gap-10 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-950 hover:shadow-2xl hover:border-blue-600/30 transition-all group scale-100 active:scale-[0.99] cursor-pointer text-left">
                            <div className="relative">
                                <div className={`w-4 h-4 rounded-full absolute -top-1.5 -right-1.5 border-4 border-white dark:border-slate-950 shadow-xl ${inc.severity === 'Critical' ? 'bg-rose-600 animate-ping' : 'bg-amber-600'}`}></div>
                                <div className={`w-2.5 h-24 rounded-full ${inc.severity === 'Critical' ? 'bg-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.4)]'}`}></div>
                            </div>
                            <div className="flex-1 text-left">
                                <div className="flex items-center gap-4 mb-3">
                                    <h5 className="font-black text-3xl text-slate-950 dark:text-white tracking-tighter leading-none group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors uppercase">{inc.type}</h5>
                                    <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-widest leading-none border border-slate-200 dark:border-slate-700">Audit Verfied</div>
                                </div>
                                <div className="flex flex-wrap items-center gap-6 text-base text-slate-600 dark:text-slate-400 font-bold tracking-tight">
                                    <span className="flex items-center gap-2 underline decoration-blue-600/30 underline-offset-8 transition-all group-hover:decoration-blue-600/60 leading-none">
                                        <Globe className="w-4 h-4 text-blue-700/60" />
                                        {inc.location}
                                    </span>
                                    <span className="w-2.5 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                                    <span className="tabular-nums font-black text-slate-950 dark:text-slate-200 tracking-tighter">{inc.time}</span>
                                    <span className="h-6 w-px bg-slate-300 dark:bg-slate-800 ml-2 hidden md:block"></span>
                                    <span className="text-xs text-slate-500 dark:text-slate-500 italic font-black uppercase">Protocol: {inc.tech}</span>
                                </div>
                            </div>
                            <div className={`px-10 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/20 relative overflow-hidden group/btn ${inc.severity === 'Critical'
                                    ? 'bg-rose-600 text-white shadow-rose-600/30'
                                    : 'bg-amber-600 text-white shadow-amber-500/30'
                                }`}>
                                <span className="relative z-10">{inc.severity} Threat</span>
                                <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -mr-6 -mt-6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShieldModule;
