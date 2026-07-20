import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const selectedTag = slug[0] === "All" ? undefined : slug[0];
  const data = await fetchNotes({ page: 1, search: "", tag: selectedTag });

  return <NotesClient initialData={data} tag={selectedTag} />;
}