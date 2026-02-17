import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center space-x-2 text-white font-black text-xl mb-4">
                            <Shield className="text-blue-500" size={24} />
                            <span>IS-OMS</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Secure, scalable, and efficient operations management for the International Service Mesh. Empowering branches with cutting-edge tools.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/login" className="hover:text-blue-500 transition-colors">Login</Link></li>
                            <li><Link to="/register" className="hover:text-blue-500 transition-colors">Register</Link></li>
                            <li><Link to="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</Link></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Branches */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Our Branches</h3>
                        <ul className="space-y-2 text-sm">
                            <li><span className="cursor-pointer hover:text-blue-500 transition-colors">IT Department</span></li>
                            <li><span className="cursor-pointer hover:text-emerald-500 transition-colors">DOH Rx</span></li>
                            <li><span className="cursor-pointer hover:text-orange-500 transition-colors">DOH Assist</span></li>
                            <li><span className="cursor-pointer hover:text-indigo-500 transition-colors">DOH Shield</span></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="text-blue-500 mt-1" size={16} />
                                <span>1234 Secure Lane, Tech City,<br />Cyber State, 10101</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="text-blue-500" size={16} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="text-blue-500" size={16} />
                                <a href="mailto:support@doh-oms.com" className="hover:text-white transition-colors">support@doh-oms.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} International Service Mesh. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
