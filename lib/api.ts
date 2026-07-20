import axios from "axios";
import type { Note } from "../types/note";
import { NOTES_PER_PAGE } from "@/lib/constants";

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: string;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("❌ NEXT_PUBLIC_NOTEHUB_TOKEN is not defined in environment variables");
  } else {
    console.warn("⚠️ Warning: NoteHub token is missing — requests may fail.");
  }
}

const noteServiceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});


export async function fetchNotes({ search, page = 1, tag }: FetchNotesParams) {
  const params: FetchNotesParams = {
    page,
    perPage: NOTES_PER_PAGE,
  };

  if (search) params.search = search;
  if (tag && tag !== 'All') params.tag = tag;

  const response = await noteServiceClient.get<FetchNotesHTTPResponse>("/", { params });
  return response.data;
}

export async function fetchNoteById(id: number) {
  const response = await noteServiceClient.get<Note>(`/${id}`);
  return response.data;
}

export async function createNote({ title, content = "", tag }: CreateNoteParams) {
  const response = await noteServiceClient.post<Note>("/", {
    title,
    content,
    tag,
  });
  return response.data;
}

export async function deleteNote(id: number) {
  const response = await noteServiceClient.delete<Note>(`/${id}`);
  return response.data;
}