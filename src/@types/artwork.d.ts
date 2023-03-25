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
  setArtistID: React.Dispatch<React.SetStateAction<number | undefined>>;
  actual_artist: any;
  setArtistName: React.Dispatch<React.SetStateAction<string | undefined>>;
  artistArtworks: any;
  artistArtworkMaxPage: number;
  artistArtworkPag: number;
  setArtistArtworkPag: React.Dispatch<React.SetStateAction<number>>;
}
