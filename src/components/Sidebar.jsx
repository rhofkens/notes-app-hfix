import React from 'react';
import { CircleUserRound } from 'lucide-react';

const categories = [
  { name: 'Videos', count: '07', color: 'bg-purple-500' },
  { name: 'Wishlist', count: '11', color: 'bg-amber-600' },
  { name: 'Assignment', count: '02', color: 'bg-blue-600' },
  { name: 'Projects', count: '05', color: 'bg-teal-500' },
  { name: 'Work', count: '01', color: 'bg-pink-500' },
  { name: 'Study', count: '12', color: 'bg-amber-600' },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col h-screen">
      <div className="flex items-center mb-8">
        <CircleUserRound className="h-10 w-10 text-gray-400" />
        <span className="ml-3 text-lg font-semibold">Steve Dean</span>
      </div>
      <nav>
        {categories.map((category) => (
          <div key={category.name} className="flex items-center mb-4">
            <div className={`w-2 h-2 rounded-full ${category.color} mr-3`}></div>
            <span className="flex-grow">{category.name}</span>
            <span className={`${category.color} text-xs px-2 py-1 rounded-full`}>
              {category.count}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;