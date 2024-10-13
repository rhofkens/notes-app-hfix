import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fetchTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('tag', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const useTags = () => useQuery({
  queryKey: ['tags'],
  queryFn: fetchTags,
});