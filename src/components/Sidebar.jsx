import React, { useState, useEffect } from 'react';
import { CircleUserRound, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSupabaseAuth } from '../integrations/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    await logout();
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
    </div>
  );
};

export default Sidebar;