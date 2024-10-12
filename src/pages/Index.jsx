import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';
import CreateNoteModal from '../components/CreateNoteModal';
import { useSupabaseAuth } from '../integrations/supabase';

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { session } = useSupabaseAuth();

  const handleAddNote = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div className="flex bg-gray-800 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onAddNote={handleAddNote} />
        <NotesGrid />
        <CreateNoteModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;