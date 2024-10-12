import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseAuthProvider, useSupabaseAuth } from './integrations/supabase';
import Index from "./pages/Index";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { session } = useSupabaseAuth();
  return session ? children : <Navigate to="/login" />;
};

const AppContent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SupabaseAuthProvider>
        <AppContent />
      </SupabaseAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;