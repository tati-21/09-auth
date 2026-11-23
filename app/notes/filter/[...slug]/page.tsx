import { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { notFound } from 'next/navigation';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  const tagVariable =
    slug[0] === 'all'
      ? `All your notes in one place.`
      : `All your notes tagged ${tag} in one place.`;

  return {
    title: `${tag} notes | NoteHub`,
    description: tagVariable,

    openGraph: {
      title: `${tag} notes | NoteHub`,
      description: tagVariable,
      url: `https://08-zustand-one-tau.vercel.app/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
      type: 'website',
    },
  };
}

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const queryClient = new QueryClient();

  if (tag && !tags.includes(tag)) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
