import React from 'react';
import NoteCard from './NoteCard';
import { useNotes } from '../integrations/supabase';
import { parseISO, compareDesc } from 'date-fns';

const NotesGrid = () => {
  const { data: notes, isLoading, error } = useNotes();

  if (isLoading) return <div>Loading notes...</div>;
  if (error) return <div>Error loading notes: {error.message}</div>;

  // Sort notes by created_at in descending order (newest first)
  const sortedNotes = notes?.sort((a, b) => 
    compareDesc(parseISO(a.created_at), parseISO(b.created_at))
  ) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sortedNotes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
};

export default NotesGrid;