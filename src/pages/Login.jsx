import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <SupabaseAuthUI />
      </div>
    </div>
  );
};

export default Login;