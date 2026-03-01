import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ITModule from './components/modules/ITModule';
import RxModule from './components/modules/RxModule';
import AssistModule from './components/modules/AssistModule';
import ShieldModule from './components/modules/ShieldModule';
import UserModule from './components/modules/UserModule';
import SettingsModule from './components/modules/SettingsModule';
import { Layout } from 'lucide-react';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public Route Wrapper (Redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/it" element={
        <ProtectedRoute>
          <ITModule />
        </ProtectedRoute>
      } />
      <Route path="/rx" element={
        <ProtectedRoute>
          <RxModule />
        </ProtectedRoute>
      } />
      <Route path="/assist" element={
        <ProtectedRoute>
          <AssistModule />
        </ProtectedRoute>
      } />
      <Route path="/shield" element={
        <ProtectedRoute>
          <ShieldModule />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <UserModule />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsModule />
        </ProtectedRoute>
      } />
    </Routes>
  );
}


import Navbar from './components/Navbar';
import Footer from './components/Footer';

const LayoutWrapper = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {user && <Navbar />}
      <div className="flex-grow flex flex-col">
        <main className="flex-grow bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <AppRoutes />
          </div>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="font-['Inter'] antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Router>
          <LayoutWrapper />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
