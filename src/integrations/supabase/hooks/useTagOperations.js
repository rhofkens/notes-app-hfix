import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { useSupabaseAuth } from '../auth';

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  const { session } = useSupabaseAuth();

  return useMutation({
    mutationFn: async (tagId) => {
      // First, get the tag text
      const { data: tagData, error: tagError } = await supabase
        .from('tags')
        .select('tag')
        .eq('id', tagId)
        .eq('user_id', session?.user?.id)
        .single();

      if (tagError) throw tagError;

      // Delete all notes with this tag
      const { error: notesError } = await supabase
        .from('notes')
        .delete()
        .eq('tag', tagData.tag)
        .eq('user_id', session?.user?.id);

      if (notesError) throw notesError;

      // Then, delete the tag itself
      const { error: tagDeleteError } = await supabase
        .from('tags')
        .delete()
        .eq('id', tagId)
        .eq('user_id', session?.user?.id);

      if (tagDeleteError) throw tagDeleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      queryClient.invalidateQueries(['notes']);
    },
  });
};

export const useCountNotesByTag = (tagText) => {
  const { session } = useSupabaseAuth();
  return useQuery({
    queryKey: ['noteCount', tagText],
    queryFn: async () => {
      if (!tagText) return 0;
      const { count, error } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .eq('tag', tagText)
        .eq('user_id', session?.user?.id);

      if (error) throw error;
      return count;
    },
    enabled: !!tagText && !!session?.user?.id,
  });
};