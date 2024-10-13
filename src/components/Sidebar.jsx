import React, { useState, useEffect } from 'react';
import { CircleUserRound, ChevronLeft, ChevronRight, Check, X, Plus } from 'lucide-react';
import { useSupabaseAuth, useNotes } from '../integrations/supabase';
import { useTags } from '../integrations/supabase/hooks/useTags';
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
import AddTagModal from './AddTagModal';
import TagItem from './TagItem';

const Sidebar = ({ activeFilters, toggleFilter, clearFilters }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const { data: notes, isLoading: notesLoading } = useNotes();
  const { data: tags, isLoading: tagsLoading } = useTags();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
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

  const getCategoryCount = (tagName) => {
    if (notesLoading || !notes) return 0;
    return notes.filter(note => note.tag === tagName).length;
  };

  if (tagsLoading) {
    return <div>Loading tags...</div>;
  }

  return (
    <div className={`bg-gray-900 text-white p-6 flex flex-col h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-10 sm:w-20' : 'w-32 sm:w-64'}`}>
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
      <nav className="flex-grow">
        {tags.map((tag) => (
          <TagItem
            key={tag.id}
            tag={tag}
            isActive={activeFilters.includes(tag.tag)}
            count={getCategoryCount(tag.tag)}
            onClick={toggleFilter}
            isCollapsed={isCollapsed}
          />
        ))}
        {!isCollapsed && (
          <Button
            variant="ghost"
            className="w-full mt-2 flex items-center justify-center text-sm"
            onClick={() => setIsAddTagModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Tag
          </Button>
        )}
      </nav>

      {activeFilters.length > 0 && !isCollapsed && (
        <Button
          variant="ghost"
          className="mt-4 w-full flex items-center justify-center text-sm"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
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

      <AddTagModal
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;