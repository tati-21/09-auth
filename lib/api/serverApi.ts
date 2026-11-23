import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { FetchNotesParams, FetchNotesResponse } from './clientApi';

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: search || undefined,
      tag,
    },
    headers: await getCookieHeader(),
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: await getCookieHeader(),
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>('/users/me', {
    headers: await getCookieHeader(),
  });

  return response.data;
};

export const checkSession = async () => {
  const response = await nextServer.get('/auth/session', {
    headers: await getCookieHeader(),
  });

  return response;
};
