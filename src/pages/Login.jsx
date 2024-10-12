import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    if (session) {
      navigate('/');
    }
    // Check if the user was redirected from a logout action
    if (location.state && location.state.from === 'logout') {
      setLogoutMessage('Logged out successfully!');
    }
  }, [session, navigate, location]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          {logoutMessage || 'Login'}
        </h2>
        <SupabaseAuthUI />
      </div>
    </div>
  );
};

export default Login;