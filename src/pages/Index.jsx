import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';
import CreateNoteModal from '../components/CreateNoteModal';
import { useSupabaseAuth } from '../integrations/supabase';

const IndexContent = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { session } = useSupabaseAuth();

  const handleAddNote = () => {
    setIsCreateModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex bg-gray-800 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onAddNote={handleAddNote} onSearch={handleSearch} />
        <NotesGrid searchQuery={searchQuery} />
        <CreateNoteModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;