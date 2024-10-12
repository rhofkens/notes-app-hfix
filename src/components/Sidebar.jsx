import React, { useState, useEffect } from 'react';
import { CircleUserRound, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useSupabaseAuth } from '../integrations/supabase';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../integrations/supabase';
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
  { name: 'Videos', color: 'bg-purple-500' },
  { name: 'Wishlist', color: 'bg-yellow-500' },
  { name: 'Assignment', color: 'bg-blue-600' },
  { name: 'Projects', color: 'bg-teal-500' },
  { name: 'Work', color: 'bg-pink-500' },
  { name: 'Study', color: 'bg-orange-500' },
];

const Sidebar = ({ activeFilters, toggleFilter, clearFilters }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { data: notes, isLoading } = useNotes();

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

  const getCategoryCount = (categoryName) => {
    if (isLoading || !notes) return 0;
    return notes.filter(note => note.tag === categoryName).length;
  };

  return (
    <div className={`bg-gray-900 text-white flex flex-col h-screen transition-all duration-300 ${isCollapsed ? 'w-10 sm:w-20' : 'w-32 sm:w-64'}`}>
      <div className="p-6 flex-shrink-0">
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
      </div>
      <nav className="flex-grow overflow-y-auto">
        <div className="px-6 space-y-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center cursor-pointer"
              onClick={() => toggleFilter(category.name)}
            >
              {activeFilters.includes(category.name) ? (
                <Check className={`w-3 h-3 ${category.color} rounded-full mr-3`} />
              ) : (
                <div className={`w-2 h-2 rounded-full ${category.color} mr-3`}></div>
              )}
              {!isCollapsed && (
                <>
                  <span className="flex-grow">{category.name}</span>
                  <span className={`${category.color} text-xs px-2 py-1 rounded-full min-w-[24px] flex items-center justify-center`}>
                    {getCategoryCount(category.name).toString()}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </nav>
      {activeFilters.length > 0 && !isCollapsed && (
        <div className="p-6 flex-shrink-0">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center text-sm"
            onClick={clearFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        </div>
      )}

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