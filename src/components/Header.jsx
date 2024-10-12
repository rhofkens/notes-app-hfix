import React from 'react';
import { Search } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">All Notes</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">ON</span>
          <Switch />
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          Add New Note
        </Button>
      </div>
    </div>
  );
};

export default Header;