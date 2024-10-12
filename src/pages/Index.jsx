import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';
import CreateNoteModal from '../components/CreateNoteModal';
import { useSupabaseAuth, useNotes } from '../integrations/supabase';
import { Alert } from "@/components/ui/alert";

const IndexContent = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { session } = useSupabaseAuth();
  const { data: notes, isLoading: notesLoading, error: notesError } = useNotes();

  const handleAddNote = () => {
    setIsCreateModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (notesLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (notesError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive" className="max-w-md">
          <h2 className="text-lg font-semibold mb-2">Error loading notes</h2>
          <p>{notesError.message}</p>
          <p className="mt-2 text-sm">Please check your network connection and Supabase configuration.</p>
        </Alert>
      </div>
    );
  }

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