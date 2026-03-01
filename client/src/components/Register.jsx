import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Layout, Mail, Lock, AlertCircle, ShieldCheck, Globe, Plus, User, Briefcase, MapPin, Eye, EyeOff, Phone, Calendar, Upload, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
    firstName: yup.string().min(2, 'Min 2 chars').required('Required'),
    lastName: yup.string().required('Required'),
    countryCode: yup.string().required('Required'),
    phone: yup.string().matches(/^\d{7,12}$/, 'Invalid number').required('Required'),
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

const countryCodes = [
    { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
    { code: '+355', flag: '🇦🇱', name: 'Albania' },
    { code: '+213', flag: '🇩🇿', name: 'Algeria' },
    { code: '+376', flag: '🇦🇩', name: 'Andorra' },
    { code: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: '+1-268', flag: '🇦🇬', name: 'Antigua & Barbuda' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+374', flag: '🇦🇲', name: 'Armenia' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
    { code: '+1-242', flag: '🇧🇸', name: 'Bahamas' },
    { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+1-246', flag: '🇧🇧', name: 'Barbados' },
    { code: '+375', flag: '🇧🇾', name: 'Belarus' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+501', flag: '🇧🇿', name: 'Belize' },
    { code: '+229', flag: '🇧🇯', name: 'Benin' },
    { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
    { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: '+387', flag: '🇧🇦', name: 'Bosnia & Herzegovina' },
    { code: '+267', flag: '🇧🇼', name: 'Botswana' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+673', flag: '🇧🇳', name: 'Brunei' },
    { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '+257', flag: '🇧🇮', name: 'Burundi' },
    { code: '+238', flag: '🇨🇻', name: 'Cabo Verde' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
    { code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: '+236', flag: '🇨🇫', name: 'Central African Republic' },
    { code: '+235', flag: '🇹🇩', name: 'Chad' },
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+269', flag: '🇰🇲', name: 'Comoros' },
    { code: '+242', flag: '🇨🇬', name: 'Congo' },
    { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: '+385', flag: '🇭🇷', name: 'Croatia' },
    { code: '+53', flag: '🇨🇺', name: 'Cuba' },
    { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
    { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
    { code: '+1-767', flag: '🇩🇲', name: 'Dominica' },
    { code: '+1-809', flag: '🇩🇴', name: 'Dominican Republic' },
    { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
    { code: '+372', flag: '🇪🇪', name: 'Estonia' },
    { code: '+268', flag: '🇸🇿', name: 'Eswatini' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+679', flag: '🇫🇯', name: 'Fiji' },
    { code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+241', flag: '🇬🇦', name: 'Gabon' },
    { code: '+220', flag: '🇬🇲', name: 'Gambia' },
    { code: '+995', flag: '🇬🇪', name: 'Georgia' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: '+1-473', flag: '🇬🇩', name: 'Grenada' },
    { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+224', flag: '🇬🇳', name: 'Guinea' },
    { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: '+592', flag: '🇬🇾', name: 'Guyana' },
    { code: '+509', flag: '🇭🇹', name: 'Haiti' },
    { code: '+504', flag: '🇭🇳', name: 'Honduras' },
    { code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+98', flag: '🇮🇷', name: 'Iran' },
    { code: '+964', flag: '🇮🇶', name: 'Iraq' },
    { code: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+1-876', flag: '🇯🇲', name: 'Jamaica' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+962', flag: '🇯🇴', name: 'Jordan' },
    { code: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+686', flag: '🇰🇮', name: 'Kiribati' },
    { code: '+383', flag: '🇽🇰', name: 'Kosovo' },
    { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
    { code: '+856', flag: '🇱🇦', name: 'Laos' },
    { code: '+371', flag: '🇱🇻', name: 'Latvia' },
    { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
    { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
    { code: '+231', flag: '🇱🇷', name: 'Liberia' },
    { code: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
    { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
    { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
    { code: '+265', flag: '🇲🇼', name: 'Malawi' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+960', flag: '🇲🇻', name: 'Maldives' },
    { code: '+223', flag: '🇲🇱', name: 'Mali' },
    { code: '+356', flag: '🇲🇹', name: 'Malta' },
    { code: '+692', flag: '🇲🇭', name: 'Marshall Islands' },
    { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
    { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+691', flag: '🇫🇲', name: 'Micronesia' },
    { code: '+373', flag: '🇲🇩', name: 'Moldova' },
    { code: '+377', flag: '🇲🇨', name: 'Monaco' },
    { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
    { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
    { code: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
    { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
    { code: '+264', flag: '🇳🇦', name: 'Namibia' },
    { code: '+674', flag: '🇳🇷', name: 'Nauru' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
    { code: '+227', flag: '🇳🇪', name: 'Niger' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+389', flag: '🇲🇰', name: 'North Macedonia' },
    { code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: '+968', flag: '🇴🇲', name: 'Oman' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+680', flag: '🇵🇼', name: 'Palau' },
    { code: '+970', flag: '🇵🇸', name: 'Palestine' },
    { code: '+507', flag: '🇵🇦', name: 'Panama' },
    { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
    { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
    { code: '+51', flag: '🇵🇪', name: 'Peru' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+1-869', flag: '🇰🇳', name: 'Saint Kitts & Nevis' },
    { code: '+1-758', flag: '🇱🇨', name: 'Saint Lucia' },
    { code: '+1-784', flag: '🇻🇨', name: 'Saint Vincent & Grenadines' },
    { code: '+685', flag: '🇼🇸', name: 'Samoa' },
    { code: '+378', flag: '🇸🇲', name: 'San Marino' },
    { code: '+239', flag: '🇸🇹', name: 'Sao Tome & Principe' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+221', flag: '🇸🇳', name: 'Senegal' },
    { code: '+381', flag: '🇷🇸', name: 'Serbia' },
    { code: '+248', flag: '🇸🇨', name: 'Seychelles' },
    { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
    { code: '+252', flag: '🇸🇴', name: 'Somalia' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+211', flag: '🇸🇸', name: 'South Sudan' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+249', flag: '🇸🇩', name: 'Sudan' },
    { code: '+597', flag: '🇸🇷', name: 'Suriname' },
    { code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+963', flag: '🇸🇾', name: 'Syria' },
    { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: '+670', flag: '🇹🇱', name: 'Timor-Leste' },
    { code: '+228', flag: '🇹🇬', name: 'Togo' },
    { code: '+676', flag: '🇹🇴', name: 'Tonga' },
    { code: '+1-868', flag: '🇹🇹', name: 'Trinidad & Tobago' },
    { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
    { code: '+688', flag: '🇹🇻', name: 'Tuvalu' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
    { code: '+678', flag: '🇻🇺', name: 'Vanuatu' },
    { code: '+379', flag: '🇻🇦', name: 'Vatican City' },
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+967', flag: '🇾🇪', name: 'Yemen' },
    { code: '+260', flag: '🇿🇲', name: 'Zambia' },
    { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' }
];

// Custom Searchable Country Dropdown
const CountrySelect = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef(null);

    const selected = countryCodes.find(c => c.code === value) || countryCodes.find(c => c.name === 'India');

    const filtered = countryCodes.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.includes(search)
    );

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => { setOpen(o => !o); setSearch(''); }}
                className="flex items-center gap-2 px-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black w-full whitespace-nowrap"
            >
                <span className="text-lg">{selected?.flag}</span>
                <span className="text-sm">{selected?.code}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ml-auto ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Search */}
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <input
                            autoFocus
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full bg-transparent outline-none text-sm text-slate-800 dark:text-white placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    {/* List */}
                    <div className="max-h-56 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <div className="p-4 text-center text-slate-400 text-sm">No results</div>
                        ) : filtered.map(c => (
                            <button
                                key={c.name}
                                type="button"
                                onClick={() => { onChange(c.code); setOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors ${value === c.code ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-black' : 'text-slate-700 dark:text-slate-300'
                                    }`}
                            >
                                <span className="text-xl">{c.flag}</span>
                                <span className="flex-1 text-sm font-semibold truncate">{c.name}</span>
                                <span className="text-xs text-slate-400 font-mono">{c.code}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const Register = () => {
    const { register: registerAuth } = useAuth();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

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
        // Combine country code and phone
        const fullPhone = `${selectedCountryCode}${data.phone}`;

        Object.keys(data).forEach(key => {
            if (key === 'photo') {
                formData.append('photo', data.photo[0]);
            } else if (key === 'phone') {
                formData.append('phone', fullPhone);
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
                                        placeholder="Enter first name"
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
                                        placeholder="Enter last name"
                                    />
                                </div>
                                {errors.lastName && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">PHONE NO.</label>
                                <div className="flex gap-2">
                                    <div className="w-2/5">
                                        <CountrySelect
                                            value={selectedCountryCode}
                                            onChange={setSelectedCountryCode}
                                        />
                                    </div>
                                    <div className="flex-1 relative group">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>
                                {(errors.phone || errors.countryCode) && <p className="text-rose-500 text-[10px] ml-4 font-bold">{errors.phone?.message || errors.countryCode?.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">EMAIL ADDRESS</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-all" />
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white font-black placeholder:text-slate-300"
                                        placeholder="Enter email address"
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
