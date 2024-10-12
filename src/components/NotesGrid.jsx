import React from 'react';
import NoteCard from './NoteCard';
import { useNotes } from '../integrations/supabase';

const NotesGrid = () => {
  const { data: notes, isLoading, error } = useNotes();

  if (isLoading) return <div>Loading notes...</div>;
  if (error) return <div>Error loading notes: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {notes && notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
};

export default NotesGrid;