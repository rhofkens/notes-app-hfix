import React from 'react';

const NoteCard = ({ title, category, content, time, date, color }) => {
  return (
    <div className={`${color} rounded-lg p-4 sm:p-6 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg w-[70%] sm:w-full mx-auto`}>
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        <span className="bg-white text-black text-xs px-2 py-1 rounded-full uppercase transition-all duration-300 ease-in-out hover:bg-opacity-80 hover:scale-105">
          {category}
        </span>
      </div>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base">{content}</p>
      <div className="flex justify-between text-xs sm:text-sm">
        <span>{time}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NoteCard;