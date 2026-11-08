import { createContext, useContext } from 'react';

export const LibraryContext = createContext(null);

export function useLibrary() {
  const library = useContext(LibraryContext);
  if (!library) throw new Error('useLibrary requires LibraryProvider');
  return library;
}
