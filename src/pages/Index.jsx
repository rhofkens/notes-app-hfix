import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';
import CreateNoteModal from '../components/CreateNoteModal';
import { useSupabaseAuth, useNotes } from '../integrations/supabase';

const IndexContent = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { session } = useSupabaseAuth();
  const { data: notes, isLoading: notesLoading } = useNotes();

  const handleAddNote = () => {
    setIsCreateModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setCurrentPage(1); // Reset to first page on clearing filters
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTagClick = (tag) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
    }
    setCurrentPage(1); // Reset to first page when adding a new filter
  };

  if (notesLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex bg-gray-800 min-h-screen">
      <Sidebar
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        clearFilters={clearFilters}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          onAddNote={handleAddNote} 
          onSearch={handleSearch}
          title={activeFilters.length > 0 ? "Filtered Notes" : "All Notes"}
        />
        <NotesGrid 
          searchQuery={searchQuery} 
          activeFilters={activeFilters}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onTagClick={handleTagClick}
        />
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