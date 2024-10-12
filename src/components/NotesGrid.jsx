import React from 'react';
import NoteCard from './NoteCard';

const notes = [
  {
    title: 'Client Meeting Review',
    category: 'WORK',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    time: '09:38PM',
    date: '07 JANUARY 2021',
    color: 'bg-pink-500',
  },
  {
    title: 'Water Supply Chain Power',
    category: 'WISHLIST',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    time: '02:45AM',
    date: '22 DECEMBER 2020',
    color: 'bg-amber-600',
  },
  {
    title: 'Social Media Chat',
    category: 'ASSIGNMENT',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    time: '12:23PM',
    date: '01 JANUARY 2021',
    color: 'bg-blue-600',
  },
  {
    title: 'Client Meeting Review',
    category: 'PROJECTS',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    time: '03:50AM',
    date: '10 SEPTEMBER 2020',
    color: 'bg-teal-500',
  },
  {
    title: 'Musical Instruments',
    category: 'VIDEO',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    time: '11:32PM',
    date: '22 DECEMBER 2020',
    color: 'bg-purple-500',
  },
  {
    title: 'Media Chapter II',
    category: 'STUDY',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    time: '06:25PM',
    date: '11 SEPTEMBER 2020',
    color: 'bg-amber-600',
  },
];

const NotesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {notes.map((note, index) => (
        <NoteCard key={index} {...note} />
      ))}
    </div>
  );
};

export default NotesGrid;