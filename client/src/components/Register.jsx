import React, { useState } from 'react';
import axios from 'axios';
import { Layout, Mail, Lock, AlertCircle, ShieldCheck, Globe, Plus, User, Briefcase, MapPin, Eye, EyeOff, Phone } from 'lucide-react';

const Register = ({ setAuth, toggleAuthMode }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        role: 'Employee',
        branch: 'IT'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setAuth(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration sequence interrupted. Please verify credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center p-6 font-['Inter'] transition-colors duration-1000 relative overflow-hidden text-left">
            {/* Background Decorative Blurs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 dark:bg-indigo-600/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>

            <div className="max-w-2xl w-full relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[4rem] shadow-2xl shadow-blue-500/10 dark:shadow-none p-10 lg:p-14 border border-white dark:border-slate-800 text-center relative overflow-hidden transition-all duration-700">

                    <div className="relative mb-8 text-center">
                        <div className="w-20 h-20 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40 relative z-10">
                            <Plus className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 -z-10 animate-pulse"></div>
                    </div>

                    <div className="mb-10 text-left px-4">
                        <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter uppercase leading-none mb-2">NEW USER</h1>
                        <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Mesh Network Enrollment</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-6 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-[2rem] flex items-center gap-5 text-rose-600 dark:text-rose-400 text-sm animate-in shake duration-500 backdrop-blur-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="font-black uppercase tracking-widest text-left leading-relaxed flex-1 text-[11px]">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-left px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">FIRST NAME</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        name="firstName"
                                        required
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="Shashi"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">LAST NAME</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        name="lastName"
                                        required
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="Prakash"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">PHONE NO.</label>
                                <div className="relative group">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">EMAIL ADDRESS</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="user@doh.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">SECURITY TOKEN (PASSWORD)</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full pl-16 pr-14 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                    placeholder="••••••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">OPERATIONAL ROLE</label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 transition-all" />
                                    <select
                                        name="role"
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black appearance-none cursor-pointer"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="Employee">Employee</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">BRANCH ASSIGNMENT</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 transition-all" />
                                    <select
                                        name="branch"
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black appearance-none cursor-pointer"
                                        value={formData.branch}
                                        onChange={handleChange}
                                    >
                                        <option value="IT">IT Branch</option>
                                        <option value="Rx">Doh Rx (Pharm)</option>
                                        <option value="Assist">Doh Assist</option>
                                        <option value="Shield">Doh Shield</option>
                                        <option value="Management">Global Management</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-[0_25px_50px_-15px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 group flex items-center justify-center gap-4 mt-8"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>REGISTER ACCOUNT</span>
                                    <ShieldCheck className="w-5 h-5 group-hover:scale-125 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center relative z-10">
                        <p className="text-slate-500 dark:text-slate-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
                            ALREADY A USER?
                            <button
                                onClick={toggleAuthMode}
                                className="text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-4 ml-2 font-black"
                            >
                                LOGIN
                            </button>
                        </p>
                    </div>

                    <div className="absolute top-0 left-0 w-2.5 h-full bg-emerald-600/40"></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
