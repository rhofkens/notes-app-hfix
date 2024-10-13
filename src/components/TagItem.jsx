import React from 'react';
import { Check } from 'lucide-react';

const mapColorToTailwind = (color) => {
  const colorMap = {
    'blue': 'bg-blue-600',
    'red': 'bg-red-500',
    'green': 'bg-green-500',
    'yellow': 'bg-yellow-500',
    'purple': 'bg-purple-500',
    'pink': 'bg-pink-500',
    'indigo': 'bg-indigo-500',
    'teal': 'bg-teal-500',
    'orange': 'bg-orange-500',
    'gray': 'bg-gray-500',
    'emerald': 'bg-emerald-500',
    'cyan': 'bg-cyan-500',
    'lime': 'bg-lime-500',
    'fuchsia': 'bg-fuchsia-500',
  };
  return colorMap[color.toLowerCase()] || 'bg-gray-500';
};

const TagItem = ({ tag, isActive, count, onClick, isCollapsed }) => {
  return (
    <div
      className="flex items-center mb-2 cursor-pointer hover:bg-gray-800 rounded-md p-2 transition-colors"
      onClick={() => onClick(tag.tag)}
    >
      {isActive ? (
        <Check className={`w-3 h-3 ${mapColorToTailwind(tag.color)} rounded-full mr-3`} />
      ) : (
        <div className={`w-2 h-2 rounded-full ${mapColorToTailwind(tag.color)} mr-3`}></div>
      )}
      {!isCollapsed && (
        <>
          <span className="flex-grow">{tag.tag}</span>
          <span className={`${mapColorToTailwind(tag.color)} text-xs px-2 py-1 rounded-full min-w-[24px] flex items-center justify-center`}>
            {count.toString()}
          </span>
        </>
      )}
    </div>
  );
};

export default TagItem;