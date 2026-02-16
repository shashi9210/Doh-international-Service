import React, { useState, useEffect } from 'react';
import { Layout, Shield, Activity, HelpCircle, Laptop, LogOut, Menu, X, Moon, Sun, Bell, Search, Plus } from 'lucide-react';
import Login from './components/Login';
import Register from './components/Register';
import ITModule from './components/modules/ITModule';
import RxModule from './components/modules/RxModule';
import AssistModule from './components/modules/AssistModule';
import ShieldModule from './components/modules/ShieldModule';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setActiveTab('Dashboard');
  };

  const navItems = [
    { name: 'Dashboard', icon: Layout },
    { name: 'IT Module', icon: Laptop },
    { name: 'Doh Rx', icon: Activity },
    { name: 'Doh Assist', icon: HelpCircle },
    { name: 'Doh Shield', icon: Shield }
  ];

  const dashboardStats = [
    { title: 'IT Department', icon: Laptop, color: 'text-blue-600 dark:text-blue-400', id: 'IT Module', desc: '12 Active Projects', bg: 'bg-blue-100/50 dark:bg-blue-500/10' },
    { title: 'Doh Rx', icon: Activity, color: 'text-emerald-600 dark:text-emerald-400', id: 'Doh Rx', desc: '2 Low Stock Alerts', bg: 'bg-emerald-100/50 dark:bg-emerald-500/10' },
    { title: 'Doh Assist', icon: HelpCircle, color: 'text-amber-600 dark:text-amber-400', id: 'Doh Assist', desc: '24 Open Tickets', bg: 'bg-amber-100/50 dark:bg-amber-500/10' },
    { title: 'Doh Shield', icon: Shield, color: 'text-rose-600 dark:text-rose-400', id: 'Doh Shield', desc: '2 Critical Incidents', bg: 'bg-rose-100/50 dark:bg-rose-500/10' }
  ];

  if (!user) {
    return isRegistering ? (
      <Register setAuth={setUser} toggleAuthMode={() => setIsRegistering(false)} />
    ) : (
      <Login setAuth={setUser} toggleAuthMode={() => setIsRegistering(true)} />
    );
  }

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
                Welcome back, <span className="text-blue-700 dark:text-blue-400 underline decoration-blue-500/30 underline-offset-8 decoration-4">{user.firstName}</span>
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-semibold leading-relaxed">
                Centralized operations are stable. All global nodes are reporting active synchronization across the IS-OMS mesh.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">+12</div>
              </div>
              <span className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Active Operators</span>
            </div>
          </div>

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
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#1E40AF] dark:from-[#0F172A] dark:via-[#1E1B4B] dark:to-[#020617] p-10 rounded-[3rem] shadow-2xl shadow-blue-400/30 dark:shadow-none text-white relative overflow-hidden min-h-[400px] flex flex-col justify-between border border-blue-400/20">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-white text-xs font-black uppercase tracking-[0.3em]">
                  <Activity className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  Enterprise Performance Index
                </div>
                <h4 className="text-2xl font-black mb-4 tracking-tight">Real-time Global Sync Efficiency</h4>
                <p className="text-blue-50 text-base mb-10 font-bold max-w-lg leading-relaxed">Continuous system-wide monitoring across all International Service operational branches. High-frequency heartbeat active.</p>
                <div className="flex items-end gap-2">
                  <div className="text-8xl font-black mb-4 tracking-tighter tabular-nums drop-shadow-2xl text-white">99.98%</div>
                  <div className="mb-8 text-emerald-300 font-black text-xl">+0.02%</div>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-2xl text-white text-[11px] font-black uppercase tracking-widest border border-white/20 whitespace-nowrap">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                  HEARTBEAT STABLE
                </div>
                <div className="h-10 border-l border-white/20"></div>
                <div className="text-[10px] text-blue-100 font-black uppercase tracking-widest leading-tight">
                  Last Checksum<br />
                  Verified 1.2s ago
                </div>
              </div>

              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-300/20 rounded-full -ml-20 -mb-20 blur-[80px]"></div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200 dark:border-slate-700 min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center border border-rose-200/50">
                    <Shield className="w-5 h-5 text-rose-600 dark:text-rose-500" />
                  </div>
                  Critical Alerts
                </h4>
                <div className="w-8 h-8 bg-slate-900 dark:bg-slate-950 rounded-lg flex items-center justify-center text-[10px] font-black text-white">02</div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-[2.5rem] flex flex-col gap-2 transition-all hover:bg-rose-100 dark:hover:bg-rose-900/40 cursor-pointer group shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-widest">SEC-04 MONITOR</span>
                    <span className="text-[10px] text-rose-600 dark:text-rose-600 font-black bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/40">4m ago</span>
                  </div>
                  <span className="font-black text-slate-950 dark:text-white text-base leading-tight group-hover:text-rose-800 dark:group-hover:text-rose-300 transition-colors">UNAUTHORIZED ACCESS</span>
                  <p className="text-xs text-slate-700 dark:text-slate-400 font-bold leading-relaxed">Biometric mismatch detected at Shield Terminal 04. Security team dispatched.</p>
                </div>
                <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-[2.5rem] flex flex-col gap-2 transition-all hover:bg-amber-100 dark:hover:bg-amber-900/40 cursor-pointer group shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">RX INVENTORY</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-600 font-black bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/40">12m ago</span>
                  </div>
                  <span className="font-black text-slate-950 dark:text-white text-base leading-tight group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">LOW STOCK WARNING</span>
                  <p className="text-xs text-slate-700 dark:text-slate-400 font-bold leading-relaxed">Amoxicillin stock below 10% threshold. Redistribution recommended.</p>
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
      {/* Dynamic Header / Navbar */}
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

            {/* Desktop Nav Links */}
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
            <div className="hidden md:flex items-center gap-4 mr-4">
              <div className="relative group p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer text-left">
                <Search className="w-5 h-5 text-slate-500 dark:text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-800"></div>
              <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-600 rounded-full border-2 border-white dark:border-slate-950 animate-pulse"></span>
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-700 active:scale-90 border overflow-hidden ${theme === 'light'
                ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-inner'
                : 'bg-slate-900 text-yellow-400 border-slate-800 shadow-xl shadow-slate-950/50'
                }`}
              title={`Switch to ${theme === 'light' ? 'Night' : 'Day'} Mode`}
            >
              <div className={`transition-all duration-700 transform ${theme === 'light' ? 'rotate-0' : 'rotate-[360deg]'}`}>
                {theme === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </div>
            </button>

            {/* User Profile - Premium Pill */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 pl-1.5 pr-5 py-1.5 rounded-[1.5rem] shadow-lg shadow-slate-200/50 dark:shadow-none transition-all hover:border-blue-600/50">
              <div className="w-10 h-10 rounded-[1rem] bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-400/30">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-black text-slate-950 dark:text-white leading-none whitespace-nowrap uppercase">{user.firstName} {user.lastName}</span>
                <span className="text-[10px] text-blue-700 dark:text-blue-400 font-black uppercase tracking-widest mt-1">Super Admin</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-12 h-12 bg-white dark:bg-slate-900 hover:bg-rose-100 dark:hover:bg-rose-950/20 border border-slate-300 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/50 rounded-2xl text-slate-500 hover:text-rose-600 transition-all active:scale-95 group flex items-center justify-center shadow-lg"
              title="Logout Control"
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden w-12 h-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl text-slate-500 flex items-center justify-center shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-300 dark:border-slate-800 animate-in slide-in-from-top-4 duration-500 px-8">
            <ul className="grid grid-cols-2 gap-3 pb-8">
              {navItems.map((item, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-6 rounded-[1.5rem] cursor-pointer transition-all ${activeTab === item.name ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                >
                  <item.icon className={`w-6 h-6 ${activeTab === item.name ? 'text-white' : 'text-slate-400'}`} />
                  <span className="font-black text-[10px] uppercase tracking-widest">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="pt-32 min-h-screen">
        <section className="px-6 lg:px-12 pb-12 max-w-[1700px] mx-auto">
          <div className="bg-white dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl shadow-slate-300/40 dark:shadow-none min-h-[700px] transition-all duration-700 backdrop-blur-3xl overflow-hidden relative">
            {/* Dynamic Section Header */}
            <div className="mb-14 pb-10 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
              <div className="text-left">
                <div className="flex items-center gap-3 text-[11px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-[0.4em] mb-3 leading-none">
                  <div className="w-6 h-[2px] bg-blue-700 dark:bg-blue-400"></div>
                  International Service Mesh
                </div>
                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter uppercase leading-none">{activeTab}</h2>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Last Data Refresh</span>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-400 tabular-nums">14:22:51 UTC</span>
                </div>
                <div className="h-10 border-l border-slate-300 dark:border-slate-800"></div>
                <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-950 text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest shadow-xl">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                  Live Feed
                </div>
              </div>
            </div>

            <div className="relative z-10 h-full">
              {renderContent()}
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-[20%] -right-20 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-600/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </section>
      </main>

      {/* Global CSS Inject */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: #cbd5e1; 
          border: 3px solid transparent;
          background-clip: padding-box;
          border-radius: 10px; 
        }
        .dark ::-webkit-scrollbar-thumb { 
          background: #334155; 
          border: 3px solid transparent;
          background-clip: padding-box;
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: #94a3b8; 
          background-clip: padding-box;
        }
      `}} />
    </div>
  );
}

export default App;
