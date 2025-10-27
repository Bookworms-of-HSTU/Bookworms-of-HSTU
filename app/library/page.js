import LibraryClient from './LibraryClient';

export const metadata = {
  title: 'Library | Bookworms of HSTU',
  description: 'Explore the digital and physical collection of books available in the Bookworms of HSTU library. View PDF versions of available books.',
};

export default function Library() {
  return <LibraryClient />;
}
