import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ShieldCheck, Globe, Plus, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoginError('');
        const res = await login(data.email, data.password);
        if (res.success) {
            navigate('/dashboard');
        } else {
            console.error(res.error);
            setLoginError(res.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center p-6 font-['Inter'] transition-colors duration-1000 relative overflow-hidden text-left">
            {/* Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <button
                    onClick={toggleTheme}
                    className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl text-slate-500 hover:text-blue-600 transition-all hover:scale-110 active:scale-95"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                </button>
            </div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 dark:bg-indigo-600/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[4rem] shadow-2xl shadow-blue-500/10 dark:shadow-none p-12 lg:p-16 border border-white dark:border-slate-800 text-center relative overflow-hidden transition-all duration-700">

                    <div className="relative mb-12">
                        <div className="w-24 h-24 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/40 relative z-10 scale-110">
                            <Plus className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 -z-10 animate-pulse"></div>
                    </div>

                    <div className="mb-12">
                        <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter uppercase leading-none mb-3">DOH</h1>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-8 h-[2px] bg-blue-600 dark:bg-blue-400"></div>
                            <p className="text-slate-900 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">INTERNATIONAL SERVICE</p>
                            <div className="w-8 h-[2px] bg-blue-600 dark:bg-blue-400"></div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-medium max-w-sm mx-auto">Enterprise Operations Management Mesh Terminal Authentication.</p>
                    </div>

                    {loginError && (
                        <div className="mb-8 p-5 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-3xl flex items-center gap-4 text-rose-600 dark:text-rose-400 text-sm animate-in shake duration-500 backdrop-blur-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="font-black uppercase tracking-widest text-left text-[11px] leading-relaxed">{loginError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                <input
                                    {...register('email')}
                                    type="email"
                                    className={`w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border ${errors.email ? 'border-rose-500' : 'border-slate-200'} dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                <input
                                    {...register('password')}
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-16 pr-14 py-4 bg-slate-50 dark:bg-slate-950 border ${errors.password ? 'border-rose-500' : 'border-slate-200'} dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 group flex items-center justify-center gap-4 mt-10"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>LOGIN</span>
                                    <ShieldCheck className="w-5 h-5 group-hover:scale-125 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center relative z-10 pb-4">
                        <p className="text-slate-500 dark:text-slate-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
                            NEW USER?
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-8 ml-2 font-black"
                            >
                                REGISTER
                            </button>
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-emerald-500" />
                            <span className="text-[9px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.2em]">Global Nodes Active</span>
                        </div>
                        <p className="text-[9px] text-slate-300 dark:text-slate-700 font-black uppercase tracking-[0.2em]">
                            v4.2.1-DOH-PRO
                        </p>
                    </div>

                    <div className="absolute top-0 left-0 w-2.5 h-full bg-blue-600/40"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
