import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

import {
  TAG_OPTIONS, type FilterTag,} from "@/lib/constants";


type Props = {
  params: Promise<{ slug: string[] }>;
};


export default async function Notes({ params }: Props) {

  const { slug } = await params;

  const slugTag = slug[0];


  const selectedTag: FilterTag | undefined =
    slugTag === "All"
      ? "All"
      : TAG_OPTIONS.includes(
          slugTag as (typeof TAG_OPTIONS)[number]
        )
        ? slugTag as FilterTag
        : undefined;


  const data = await fetchNotes({
    page: 1,
    search: "",
    tag: selectedTag,
  });


  return (
    <NotesClient
      initialData={data}
      tag={selectedTag}
    />
  );
}