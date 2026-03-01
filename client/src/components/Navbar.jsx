import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    Monitor,
    Pill,
    HeartHandshake,
    ShieldCheck,
    Users,
    Settings,
    LogOut,
    LayoutDashboard,
    Menu,
    X,
    Bell,
    Search,
    Sun,
    Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'IT Branch', path: '/it', icon: Monitor, color: 'text-blue-500' },
        { name: 'DohRx', path: '/rx', icon: Pill, color: 'text-green-500' },
        { name: 'DohAssist', path: '/assist', icon: HeartHandshake, color: 'text-purple-500' },
        { name: 'DohShield', path: '/shield', icon: ShieldCheck, color: 'text-red-500' },
        { name: 'Users', path: '/users', icon: Users },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Desktop Nav */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                IS<span className="text-blue-600">-OMS</span>
                            </span>
                        </Link>

                        <div className="hidden lg:ml-10 lg:flex lg:space-x-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) => `
                                        inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                                        ${isActive
                                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'}
                                    `}
                                >
                                    <item.icon size={18} className={`mr-2 ${item.color || ''}`} />
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right side icons */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-4">
                        <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-lg bg-slate-100 dark:bg-slate-800"
                            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

                        {/* User Profile Dropdown Placeholder */}
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">{user?.firstName}</p>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">{user?.post}</p>
                            </div>
                            {user?.photo && user.photo !== 'default-avatar.png' ? (
                                <img
                                    src={`http://localhost:5000${user.photo}`}
                                    alt={user.firstName}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                />
                            ) : null}
                            <div
                                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white dark:border-slate-800 shadow-sm"
                                style={{ display: user?.photo && user.photo !== 'default-avatar.png' ? 'none' : 'flex' }}
                            >
                                {user?.firstName?.charAt(0) || 'U'}
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden animate-in slide-in-from-top-4 duration-200">
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center px-3 py-3 rounded-md text-base font-medium
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}
                                `}
                            >
                                <item.icon size={20} className={`mr-4 ${item.color || ''}`} />
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-slate-200 dark:border-slate-800 px-4">
                        <div className="flex items-center px-3 mb-4">
                            <div className="flex-shrink-0">
                                {user?.photo && user.photo !== 'default-avatar.png' ? (
                                    <img
                                        src={`http://localhost:5000${user.photo}`}
                                        alt={user.firstName}
                                        className="h-10 w-10 rounded-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                    />
                                ) : null}
                                <div
                                    className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold"
                                    style={{ display: user?.photo && user.photo !== 'default-avatar.png' ? 'none' : 'flex' }}
                                >
                                    {user?.firstName?.charAt(0) || 'U'}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-slate-900 dark:text-white">{user?.firstName} {user?.lastName}</div>
                                <div className="text-sm font-medium text-slate-500">{user?.post}</div>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="flex w-full items-center px-3 py-3 rounded-md text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 mb-2"
                        >
                            {theme === 'light' ? <Moon size={20} className="mr-4" /> : <Sun size={20} className="mr-4" />}
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </button>
                        <button
                            onClick={logout}
                            className="flex w-full items-center px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                        >
                            <LogOut size={20} className="mr-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
