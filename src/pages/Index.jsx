import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';
import CreateNoteModal from '../components/CreateNoteModal';
import Login from '../components/Login';
import { SupabaseAuthProvider, useSupabaseAuth } from '../integrations/supabase';

const IndexContent = () => {
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
        <div className="p-4">
          <Login />
        </div>
        {session ? (
          <>
            <NotesGrid />
            <CreateNoteModal
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white text-2xl">
            Please log in to view and manage your notes.
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => (
  <SupabaseAuthProvider>
    <IndexContent />
  </SupabaseAuthProvider>
);

export default Index;