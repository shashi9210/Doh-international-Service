import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Layout, Mail, Lock, AlertCircle, ShieldCheck, Globe, Plus, User, Briefcase, MapPin, Eye, EyeOff, Phone, Calendar, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
    firstName: yup.string().min(2, 'Min 2 chars').required('Required'),
    lastName: yup.string().required('Required'),
    phone: yup.string().matches(/^\d{10}$/, 'Must be 10 digits').required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string()
        .min(8, 'Min 8 chars')
        .matches(/[a-z]/, 'Need lowercase')
        .matches(/[A-Z]/, 'Need uppercase')
        .matches(/\d/, 'Need number')
        .matches(/[@$!%*?&#]/, 'Need special char')
        .required('Required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    dateOfJoining: yup.date().max(new Date(), 'Date cannot be in future').required('Required'),
    role: yup.string().required(),
    post: yup.string().required('Required'),
    branch: yup.string().required(),
    photo: yup.mixed().required('Passport photo is required')
        .test('fileSize', 'File too large (max 2MB)', (value) => {
            return value && value[0] && value[0].size <= 2000000;
        })
        .test('fileType', 'Unsupported Format', (value) => {
            return value && value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
        })
});

const Register = () => {
    const { register: registerAuth } = useAuth();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Convert text input type to date on focus
    const [dateInputType, setDateInputType] = useState('text');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            role: 'Employee',
            branch: 'IT',
            post: 'Agent'
        }
    });

    const onSubmit = async (data) => {
        setRegisterError('');

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'photo') {
                formData.append('photo', data.photo[0]);
            } else {
                formData.append(key, data[key]);
            }
        });

        const res = await registerAuth(formData);

        if (res.success) {
            navigate('/dashboard');
        } else {
            setRegisterError(res.error || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center p-6 font-['Inter'] transition-colors duration-1000 relative overflow-hidden text-left">
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

                    {registerError && (
                        <div className="mb-8 p-6 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-[2rem] flex items-center gap-5 text-rose-600 dark:text-rose-400 text-sm animate-in shake duration-500 backdrop-blur-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="font-black uppercase tracking-widest text-left leading-relaxed flex-1 text-[11px]">{registerError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left px-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">FIRST NAME</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('firstName')}
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="Shashi"
                                    />
                                </div>
                                {errors.firstName && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">LAST NAME</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('lastName')}
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="Prakash"
                                    />
                                </div>
                                {errors.lastName && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">PHONE NO.</label>
                                <div className="relative group">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="9876543210"
                                    />
                                </div>
                                {errors.phone && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.phone.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">EMAIL ADDRESS</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="user@doh.com"
                                    />
                                </div>
                                {errors.email && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Password & Post */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">PASSWORD</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('password')}
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-16 pr-14 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="••••••••••••"
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
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">CONFIRM PASSWORD</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('confirmPassword')}
                                        type="password"
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="••••••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">DESIGNATION (POST)</label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 transition-all" />
                                    <select
                                        {...register('post')}
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black appearance-none cursor-pointer"
                                    >
                                        <option value="Agent">Agent</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="HR Manager">HR Manager</option>
                                        <option value="Co Founder">Co Founder</option>
                                    </select>
                                </div>
                                {errors.post && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.post.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">BRANCH ASSIGNMENT</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 transition-all" />
                                    <select
                                        {...register('branch')}
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black appearance-none cursor-pointer"
                                    >
                                        <option value="IT">IT Branch</option>
                                        <option value="DOH RX">DOH RX</option>
                                        <option value="DOH ASSIST">DOH ASSIST</option>
                                        <option value="DOH SHIELD">DOH SHIELD</option>
                                    </select>
                                </div>
                                {errors.branch && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.branch.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">DATE OF JOINING</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('dateOfJoining')}
                                        type={dateInputType}
                                        onFocus={() => setDateInputType('date')}
                                        onBlur={() => setDateInputType('text')}
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="Select Date"
                                    />
                                </div>
                                {errors.dateOfJoining && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.dateOfJoining.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">PASSPORT PHOTO</label>
                                <div className="relative group">
                                    <Upload className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('photo')}
                                        type="file"
                                        accept="image/*"
                                        className="w-full pl-16 pr-8 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-bold"
                                    />
                                </div>
                                {errors.photo && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.photo.message}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-[0_25px_50px_-15px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 group flex items-center justify-center gap-4 mt-8"
                        >
                            {isSubmitting ? (
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
                                onClick={() => navigate('/login')}
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
