export interface IArtworkContextProps {
  children: React.ReactNode;
}

export interface IArtworkContext {
  artworks: any;
  artists: any;
  artistPagination: number;
  artistMaxPage: number;
  setArtistPagination: React.Dispatch<React.SetStateAction<number>>;
  message: string;
}
