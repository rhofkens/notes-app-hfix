import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';
import CreateNoteModal from '../components/CreateNoteModal';
import { useSupabaseAuth, useAddNote, useNotes } from '../integrations/supabase';

const IndexContent = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useSupabaseAuth();
  const addNote = useAddNote();
  const { data: existingNotes, refetch } = useNotes();

  useEffect(() => {
    const initializeNotes = async () => {
      setIsLoading(true);
      if (existingNotes && existingNotes.length === 0) {
        const newNotes = [
          { title: "Meeting Prep", content: "Prepare agenda for team meeting. Review last week's minutes.", tag: "Work", color: "pink" },
          { title: "Grocery List", content: "Milk, eggs, bread, and vegetables for the week.", tag: "Wishlist", color: "yellow" },
          { title: "Workout Plan", content: "Monday: Cardio, Wednesday: Strength, Friday: Yoga", tag: "Projects", color: "teal" },
          { title: "Book Summary", content: "Chapter 1-3 summary for literature class assignment.", tag: "Study", color: "orange" },
          { title: "Coding Tutorial", content: "Watch React hooks tutorial. Practice with small project.", tag: "Videos", color: "purple" }
        ];

        for (const note of newNotes) {
          await addNote.mutateAsync(note);
        }
        await refetch(); // Refetch notes after adding new ones
      }
      setIsLoading(false);
    };

    initializeNotes();
  }, []);  // Remove dependencies to ensure this only runs once on mount

  const handleAddNote = () => {
    setIsCreateModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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