import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fetchTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('tag', { ascending: true });
  
  if (error) throw error;
  return data;
};

const addTag = async (newTag) => {
  const { data, error } = await supabase
    .from('tags')
    .insert([newTag])
    .select();

  if (error) throw error;
  return data[0];
};

export const useTags = () => useQuery({
  queryKey: ['tags'],
  queryFn: fetchTags,
});

export const useAddTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};