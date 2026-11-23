import { nextServer } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface AuthRequest {
  email: string;
  password: string;
}

interface CheckSessionResponse {
  success: boolean;
}

export interface UpdateMeParams {
  username: string;
}

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
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);

  return response.data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', note);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const register = async (data: AuthRequest): Promise<User> => {
  const response = await nextServer.post<User>('/auth/register', data);

  return response.data;
};

export const login = async (data: AuthRequest): Promise<User> => {
  const response = await nextServer.post<User>('/auth/login', data);

  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const response = await nextServer.get<CheckSessionResponse>('/auth/session');

  return response.data.success;
};

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>('/users/me');

  return response.data;
};

export const updateMe = async (data: UpdateMeParams): Promise<User> => {
  const response = await nextServer.patch<User>('/users/me', data);

  return response.data;
};
