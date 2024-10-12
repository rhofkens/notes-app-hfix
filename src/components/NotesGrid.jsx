import React from 'react';
import NoteCard from './NoteCard';
import { useNotes } from '../integrations/supabase';
import { parseISO, compareDesc } from 'date-fns';
import { Button } from "@/components/ui/button";

const NotesGrid = ({ searchQuery, activeFilters, currentPage, onPageChange }) => {
  const { data: notes, isLoading, error } = useNotes();
  const notesPerPage = 12;

  if (isLoading) return <div>Loading notes...</div>;
  if (error) return <div>Error loading notes: {error.message}</div>;

  // Sort notes by created_at in descending order (newest first)
  const sortedNotes = notes?.sort((a, b) => 
    compareDesc(parseISO(a.created_at), parseISO(b.created_at))
  ) || [];

  // Filter notes based on search query and active filters
  const filteredNotes = sortedNotes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tag.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(note.tag);

    return matchesSearch && matchesFilter;
  });

  // Paginate notes
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const paginatedNotes = filteredNotes.slice(startIndex, startIndex + notesPerPage);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {paginatedNotes.map((note) => (
          <NoteCard key={note.id} {...note} />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NotesGrid;