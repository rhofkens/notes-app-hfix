import React, { useState, useEffect } from 'react';
import { CircleUserRound, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSupabaseAuth } from '../integrations/supabase';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

const categories = [
  { name: 'Videos', count: '07', color: 'bg-purple-500' },
  { name: 'Wishlist', count: '11', color: 'bg-amber-600' },
  { name: 'Assignment', count: '02', color: 'bg-blue-600' },
  { name: 'Projects', count: '05', color: 'bg-teal-500' },
  { name: 'Work', count: '01', color: 'bg-pink-500' },
  { name: 'Study', count: '12', color: 'bg-amber-600' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    setIsLogoutDialogOpen(false);
    await logout();
    navigate('/login', { state: { from: 'logout' } });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm:ss');
  };

  return (
    <div className={`bg-gray-900 text-white p-6 flex flex-col h-screen transition-all duration-300 ${isCollapsed ? 'w-10 sm:w-20' : 'w-32 sm:w-64'}`}>
      <div className="flex items-center mb-8 justify-between">
        {!isCollapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center focus:outline-none">
                <CircleUserRound className="h-10 w-10 text-gray-400" />
                <span className="ml-3 text-sm font-semibold truncate">
                  {session?.user?.email || 'User'}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <nav>
        {categories.map((category) => (
          <div key={category.name} className="flex items-center mb-4">
            <div className={`w-2 h-2 rounded-full ${category.color} mr-3`}></div>
            {!isCollapsed && (
              <>
                <span className="flex-grow">{category.name}</span>
                <span className={`${category.color} text-xs px-2 py-1 rounded-full`}>
                  {category.count}
                </span>
              </>
            )}
          </div>
        ))}
      </nav>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to log in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <strong>Email:</strong> {session?.user?.email || 'N/A'}
            </div>
            <div>
              <strong>Last Login:</strong> {formatDate(session?.user?.last_sign_in_at)}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsProfileDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;