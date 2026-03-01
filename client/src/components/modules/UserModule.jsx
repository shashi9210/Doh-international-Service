import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users as UsersIcon } from 'lucide-react';

const UserModule = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/users');
                setUsers(res.data.data || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load staff list');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div className="p-6 text-slate-600 dark:text-slate-400">Loading Staff List...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                    <UsersIcon className="text-blue-500" size={28} />
                    All Staff Members
                </h2>
                <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/50">
                    {users.length} Total
                </span>
            </div>

            {users.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 font-medium">No active staff found in the system.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div
                            key={user._id}
                            className="flex items-center space-x-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 hover:shadow-md transition-all group"
                        >
                            <div className="relative">
                                <img
                                    src={`http://localhost:5000${user.photo}`}
                                    alt={user.firstName}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 font-bold uppercase tracking-tight">
                                        {user.branch}
                                    </span>
                                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">
                                        {user.post}
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">ID: {user.employeeId}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserModule;
