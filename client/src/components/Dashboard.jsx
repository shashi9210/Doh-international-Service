import React from 'react';
import {
    Users,
    Monitor,
    Pill,
    HeartHandshake,
    ShieldCheck,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Staff', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'IT Assets', value: '452', icon: Monitor, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'DohRx Inventory', value: '8,920', icon: Pill, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Active Support', value: '12', icon: HeartHandshake, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const branchUpdates = [
        { branch: 'IT', task: 'Cloud Migration Phase 2', status: 'In Progress', time: '2h ago', icon: Monitor, color: 'text-blue-500' },
        { branch: 'DohRx', task: 'Monthly Inventory Audit', status: 'Completed', time: '5h ago', icon: Pill, color: 'text-emerald-500' },
        { branch: 'DohShield', task: 'Firewall Patch v2.4', status: 'Pending', time: '1d ago', icon: ShieldCheck, color: 'text-red-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Welcome, <span className="text-blue-600">{user?.firstName}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Here's what is happening across International Service today.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm cursor-default">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">System Live</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} dark:bg-slate-800`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg flex items-center gap-1">
                                <TrendingUp size={12} /> +12%
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Branch Activities */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Clock className="text-blue-500" size={20} />
                                Recent Branch Activities
                            </h2>
                            <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {branchUpdates.map((update, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm ${update.color}`}>
                                            <update.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{update.task}</h4>
                                            <p className="text-xs text-slate-500">{update.branch} Branch • {update.time}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md border 
                                        ${update.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            update.status === 'Pending' ? 'bg-red-50 text-red-600 border-red-100' :
                                                'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                        {update.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                <ShieldCheck size={20} />
                                IS-OMS Security
                            </h3>
                            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                                Your session is secured with end-to-end encryption and enterprise RBAC protocols.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-black">99.9%</p>
                                    <p className="text-[10px] uppercase font-bold text-blue-200">Uptime</p>
                                </div>
                                <div className="w-[1px] h-8 bg-blue-400/50"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-black">0</p>
                                    <p className="text-[10px] uppercase font-bold text-blue-200">Breaches</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500" size={18} />
                            Active Alerts
                        </h3>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
                            <p className="text-xs font-semibold text-amber-700 dark:text-amber-500">
                                Upcoming system maintenance scheduled for Friday, 12 AM EST.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
