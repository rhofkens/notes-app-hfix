import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';
import { useNote, useNotes, useAddNote, useUpdateNote, useDeleteNote, useTags } from './hooks/useNotes';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useNote,
  useNotes,
  useAddNote,
  useUpdateNote,
  useDeleteNote,
  useTags
};