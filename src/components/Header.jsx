import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = ({ onAddNote, onSearch, title }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex justify-between items-center p-6 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold hidden sm:block">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-gray-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={onAddNote}>
          Add New Note
        </Button>
      </div>
    </div>
  );
};

export default Header;