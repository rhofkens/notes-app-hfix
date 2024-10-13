import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tagId) => {
      // First, delete all notes with this tag
      const { error: notesError } = await supabase
        .from('notes')
        .delete()
        .eq('tag', tagId);

      if (notesError) throw notesError;

      // Then, delete the tag itself
      const { error: tagError } = await supabase
        .from('tags')
        .delete()
        .eq('id', tagId);

      if (tagError) throw tagError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      queryClient.invalidateQueries(['notes']);
    },
  });
};

export const useCountNotesByTag = (tagId) => {
  return useQuery({
    queryKey: ['noteCount', tagId],
    queryFn: async () => {
      if (!tagId) return 0;
      const { count, error } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .eq('tag', tagId);

      if (error) throw error;
      return count;
    },
    enabled: !!tagId,
  });
};