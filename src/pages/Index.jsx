import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotesGrid from '../components/NotesGrid';
import CreateNoteModal from '../components/CreateNoteModal';
import { useSupabaseAuth, useNotes, useTags } from '../integrations/supabase';

const IndexContent = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { session } = useSupabaseAuth();
  const { data: notes, isLoading: notesLoading } = useNotes();
  const { data: tags, isLoading: tagsLoading } = useTags();

  const handleAddNote = () => {
    setIsCreateModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTagClick = (tag) => {
    toggleFilter(tag);
  };

  if (notesLoading || tagsLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex bg-gray-800 min-h-screen">
      <Sidebar
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        clearFilters={clearFilters}
        categories={tags}
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
          categories={tags}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;