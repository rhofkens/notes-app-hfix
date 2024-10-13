import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tagId) => {
      // First, get the tag text
      const { data: tagData, error: tagError } = await supabase
        .from('tags')
        .select('tag')
        .eq('id', tagId)
        .single();

      if (tagError) throw tagError;

      // Delete all notes with this tag
      const { error: notesError } = await supabase
        .from('notes')
        .delete()
        .eq('tag', tagData.tag);

      if (notesError) throw notesError;

      // Then, delete the tag itself
      const { error: tagDeleteError } = await supabase
        .from('tags')
        .delete()
        .eq('id', tagId);

      if (tagDeleteError) throw tagDeleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      queryClient.invalidateQueries(['notes']);
    },
  });
};

export const useCountNotesByTag = (tagText) => {
  return useQuery({
    queryKey: ['noteCount', tagText],
    queryFn: async () => {
      if (!tagText) return 0;
      const { count, error } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .eq('tag', tagText);

      if (error) throw error;
      return count;
    },
    enabled: !!tagText,
  });
};