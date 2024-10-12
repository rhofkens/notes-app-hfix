import React from 'react';
import { SupabaseAuthUI } from '../integrations/supabase';
import { useSupabaseAuth } from '../integrations/supabase';
import { Button } from "@/components/ui/button";

const Login = () => {
  const { session, logout } = useSupabaseAuth();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span>Logged in as: {session.user.email}</span>
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }

  return <SupabaseAuthUI />;
};

export default Login;