import React from 'react';
import { Package, AlertTriangle, TrendingUp, DollarSign, Activity } from 'lucide-react';

const RxModule = () => {
    const stock = [
        { name: 'Amoxicillin 500mg', qty: 1200, exp: '2026-08-20', status: 'Healthy', batch: 'RX-882' },
        { name: 'Lisinopril 10mg', qty: 45, exp: '2026-04-12', status: 'Low Stock', batch: 'RX-119' }
    ];

    const stats = [
        { label: 'Active Inventory', value: '452', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-500/10' },
        { label: 'SLA Expiration', value: '08', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-500/10' },
        { label: 'Supply Velocity', value: '+14%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-500/10' },
        { label: 'Yield Forecast', value: '$12k', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/10' }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-center text-left">
                <div>
                    <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Global Rx Operations</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-lg mt-2">Precision inventory tracking and supply chain verification.</p>
                </div>
                <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-slate-950 text-white rounded-2xl shadow-2xl">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Mesh Network Synced</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800/50 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:scale-[1.05] group cursor-pointer text-left">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-inner`}>
                                <stat.icon className={`w-7 h-7 ${stat.color} dark:text-blue-400`} />
                            </div>
                            <div className="w-2.5 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        </div>
                        <h4 className="text-4xl font-black text-slate-950 dark:text-white mb-2 tracking-tighter tabular-nums">{stat.value}</h4>
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.3em]">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800/80 rounded-[3.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="p-10 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/30">
                    <div className="text-left">
                        <h4 className="font-black text-slate-950 dark:text-white uppercase tracking-[0.4em] text-xs">Pharma Asset Ledger</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mt-1">Live Inventory Reconciliation</p>
                    </div>
                    <button className="px-6 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-600/30 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500">Export Audit Log</button>
                </div>
                <div className="p-10">
                    <div className="space-y-6">
                        {stock.map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-600/40 transition-all group cursor-pointer text-left">
                                <div className="flex items-center gap-8">
                                    <div className={`w-2 h-16 rounded-full ${item.status === 'Healthy' ? 'bg-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-rose-600 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]'}`}></div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2 text-left">
                                            <h5 className="font-black text-2xl text-slate-950 dark:text-white tracking-tight leading-none">{item.name}</h5>
                                            <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-md text-[9px] font-black text-slate-900 dark:text-slate-500 uppercase tracking-widest border border-slate-300 dark:border-slate-700">{item.batch}</span>
                                        </div>
                                        <p className="text-base text-slate-600 dark:text-slate-400 font-bold">Verification Control: <span className="text-slate-950 dark:text-slate-200">{item.exp}</span></p>
                                    </div>
                                </div>
                                <div className="text-right flex items-center justify-end gap-12 mt-6 md:mt-0">
                                    <div className="flex flex-col items-end">
                                        <div className="font-black text-4xl text-slate-950 dark:text-white leading-none tracking-tighter tabular-nums shadow-sm">{item.qty}</div>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Active Units</p>
                                    </div>
                                    <div className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl border ${item.status === 'Healthy'
                                            ? 'bg-emerald-600 text-white border-emerald-400'
                                            : 'bg-rose-600 text-white border-rose-400'
                                        }`}>
                                        {item.status} Status
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RxModule;
