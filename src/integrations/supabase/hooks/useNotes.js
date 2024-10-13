import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { useSupabaseAuth } from '../auth';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useNote = (id) => {
    const { session } = useSupabaseAuth();
    return useQuery({
        queryKey: ['notes', id],
        queryFn: () => fromSupabase(supabase.from('notes').select('*').eq('id', id).eq('user_id', session?.user?.id).single()),
        enabled: !!session?.user?.id,
    });
};

export const useNotes = () => {
    const { session } = useSupabaseAuth();
    return useQuery({
        queryKey: ['notes'],
        queryFn: () => fromSupabase(supabase.from('notes').select('*').eq('user_id', session?.user?.id)),
        enabled: !!session?.user?.id,
    });
};

export const useAddNote = () => {
    const queryClient = useQueryClient();
    const { session } = useSupabaseAuth();
    return useMutation({
        mutationFn: (newNote) => fromSupabase(supabase.from('notes').insert([{ ...newNote, user_id: session?.user?.id }])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
};

export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    const { session } = useSupabaseAuth();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('notes').update(updateData).eq('id', id).eq('user_id', session?.user?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    const { session } = useSupabaseAuth();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('notes').delete().eq('id', id).eq('user_id', session?.user?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
};