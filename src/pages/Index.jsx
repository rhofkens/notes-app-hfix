import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';

const Index = () => {
  return (
    <div className="flex bg-gray-800 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <NotesGrid />
      </div>
    </div>
  );
};

export default Index;