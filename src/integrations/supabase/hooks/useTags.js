import { useQuery } from '@tanstack/react-query';

const defaultCategories = [
  { name: 'Videos', color: 'bg-purple-500' },
  { name: 'Wishlist', color: 'bg-yellow-500' },
  { name: 'Assignment', color: 'bg-blue-600' },
  { name: 'Projects', color: 'bg-teal-500' },
  { name: 'Work', color: 'bg-pink-500' },
  { name: 'Study', color: 'bg-orange-500' },
  { name: 'Money', color: 'bg-emerald-500' },
];

export const useTags = () => useQuery({
  queryKey: ['tags'],
  queryFn: () => defaultCategories,
});

export const useAddTag = () => ({
  mutate: (newTag) => {
    console.log('Adding new tag:', newTag);
    // In a real implementation, this would add the tag to the database
    // For now, we'll just log it
  },
});