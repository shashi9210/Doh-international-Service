import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShieldModule = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/users?branch=DOH SHIELD');
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load Shield staff');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div className="p-6 text-slate-600 dark:text-slate-400">Loading Shield Staff...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">DOH Shield Team</h2>

            {users.length === 0 ? (
                <p className="text-slate-500">No active staff found in DOH Shield branch.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div
                            key={user._id}
                            className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 hover:shadow-md transition-shadow"
                        >
                            <img
                                src={`http://localhost:5000${user.photo}`}
                                alt={user.firstName}
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                            />
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white">{user.firstName} {user.lastName}</h3>
                                <p className="text-xs text-blue-500 font-semibold uppercase">{user.post}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user.employeeId}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShieldModule;
