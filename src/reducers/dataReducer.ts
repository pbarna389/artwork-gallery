import { dataActionType } from "../@types/artwork";

export const initialState = {
  loading: false,
  artists: undefined,
  artist_max_page_num: undefined,
  actual_artist: undefined,
  artist_related_artworks: undefined,
  actual_artist_artworks_URLS: undefined,
  actual_artist_artwork_max_page: undefined,
  actual_artwork: undefined,
  actual_artwork_URL: undefined,
  actual_artwork_ID: undefined,
  artworks: undefined,
  artworks_max_page_num: undefined,
};

const dataReducer = (dataState: any, dataAction: dataActionType) => {
  switch (dataAction.type) {
    case "loading":
      return { ...dataState, loading: dataAction.payload };
    case "set_artists":
      return { ...dataState, artists: dataAction.payload };
    case "set_artist_max_page_num":
      return { ...dataState, artist_max_page_num: dataAction.payload };
    case "set_actual_artist":
      return { ...dataState, actual_artist: dataAction.payload };
    case "actual_artist_related_artworks":
      return { ...dataState, artist_related_artworks: dataAction.payload };
    case "actual_artist_artworks_URLS":
      return { ...dataState, actual_artist_artworks_URLS: dataAction.payload };
    case "actual_artist_artwork_max_page_num":
      return {
        ...dataState,
        actual_artist_artwork_max_page: dataAction.payload,
      };
    case "set_actual_artwork":
      return { ...dataState, actual_artwork: dataAction.payload };
    case "set_actual_artwork_URL":
      return { ...dataState, actual_artwork_URL: dataAction.payload };
    case "set_actual_artwork_ID":
      return { ...dataState, actual_artwork_ID: dataAction.payload };
    case "set_artworks":
      return { ...dataState, artworks: dataAction.payload };
    case "set_artworks_max_page_num":
      return { ...dataState, artworks_max_page_num: dataAction.payload };
    default:
      return dataState;
  }
};

export default dataReducer;
