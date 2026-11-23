import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    setStore => {
      return {
        draft: initialDraft,

        setDraft: note => {
          setStore(s => {
            return { draft: { ...s.draft, ...note } };
          });
        },

        clearDraft: () => {
          setStore({ draft: initialDraft });
        },
      };
    },
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
