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

export interface IInfoCardState {
  infoCard: boolean;
  infoCardText: string | null;
  infoCardTimeoutID: number | null;
  clickedAgain: boolean;
  clickedAgainTimeoutID: number | undefined;
}

export type dataActionType = {
  type:
    | "loading"
    | "set_artists"
    | "set_artist_max_page_num"
    | "set_actual_artist"
    | "actual_artist_related_artworks"
    | "actual_artist_artworks_URLS"
    | "actual_artist_artwork_max_page_num"
    | "set_actual_artwork"
    | "set_actual_artwork_URL"
    | "set_actual_artwork_ID"
    | "set_artworks"
    | "set_artworks_max_page_num";
  payload: any;
};

export interface IRecState {
  artist: any;
  artwork: any;
  artist_id: number | undefined;
  artwork_id: number | undefined;
  artist_total: number;
  artwork_total: number;
}

export type TRecAction = {
  type: "artist" | "artwork" | "artist_total" | "artwork_total";
  payload: any;
};

export interface IArtworkContext {
  mobileView: boolean;
  artists: any;
  artistPagination: number;
  artistMaxPage: number;
  setArtistPagination: React.Dispatch<React.SetStateAction<number>>;
  message: string;
  artistId: number | undefined;
  artworkId: number | undefined;
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
  dataDispatch: any;
  recState: IRecState;
  recDispatch: any;
  fetchUserData: Function;
  handleTimeout: Function;
  handleInfoCard: Function;
  handleSetArtist: Function;
  infoCardState: any;
}

interface IChildren {
  children: React.ReactNode;
}
