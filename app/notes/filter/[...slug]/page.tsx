import { QueryClient, HydrationBoundary, dehydrate,} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

import {
  TAG_OPTIONS,
  type FilterTag,
} from "@/lib/constants";

import { fetchNotes } from "@/lib/api";


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


  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({

    queryKey: [
      "notes",
      selectedTag,
      "",
      1,
    ],


    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag: selectedTag,
      }),

  });



  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <NotesClient tag={selectedTag} />
    </HydrationBoundary>
  );
}