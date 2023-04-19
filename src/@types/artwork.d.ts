interface IFBConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface IArtworkContextProps {
  children: React.ReactNode;
}

export interface IArtistData {
  url: string;
  title: string;
  id: string;
  lqip: string;
}

export interface IuserState {
  login: boolean;
  update: boolean;
  userData: any;
  favouriteArtists: any;
  favouriteArtworks: any;
}

export interface IArtworkContext {
  mobileView: boolean;
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
  setArtworkID: React.Dispatcj<React.SetStateAction<number | undefined>>;
  actual_artwork: any;
  actual_artwork_url: string;
  actual_artwork_id: string;
  artworks: any;
  artworksMaxPage: number;
  artworksPagination: number;
  setArtworksPagination: React.Dispatch<React.SetStateAction<number>>;
  setNavShown: React.Dispatch<React.SetStateAction<boolean>>;
  navShown: boolean;
  actualArtistArtworksURLS: IArtistData[];
  loading: boolean;
  userState: any;
  userDispatch: React.Dispatch<React.ReducerAction<any>>;
  fetchUserData: Function;
}

interface IChildren {
  children: React.ReactNode;
}
