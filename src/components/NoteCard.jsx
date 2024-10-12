import React from 'react';

const NoteCard = ({ title, category, content, time, date, color }) => {
  return (
    <div className={`${color} rounded-lg p-6 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="bg-white text-black text-xs px-2 py-1 rounded-full uppercase">
          {category}
        </span>
      </div>
      <p className="mb-6">{content}</p>
      <div className="flex justify-between text-sm">
        <span>{time}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NoteCard;