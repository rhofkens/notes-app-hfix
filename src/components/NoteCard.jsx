import React from 'react';
import { format } from 'date-fns';

const NoteCard = ({ title, content, color, tag, created_at }) => {
  const createdDate = new Date(created_at);
  const formattedTime = format(createdDate, 'hh:mm a');
  const formattedDate = format(createdDate, 'dd MMMM yyyy');

  return (
    <div className={`bg-${color}-500 rounded-lg p-6 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="bg-white text-black text-xs px-2 py-1 rounded-full uppercase transition-all duration-300 ease-in-out hover:bg-opacity-80 hover:scale-105">
          {tag}
        </span>
      </div>
      <p className="mb-6">{content}</p>
      <div className="flex justify-between text-sm">
        <span>{formattedTime}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default NoteCard;