export const initialState = {
  loading: false,
  artists: undefined,
  artist_max_page_num: undefined,
  actual_artist: undefined,
  artist_related_artworks: undefined,
  actual_artist_artwork_max_page: undefined,
};

type dataActionType = {
  type:
    | "loading"
    | "set_artists"
    | "set_artist_max_page_num"
    | "set_actual_artist"
    | "actual_artist_related_artworks"
    | "actual_artist_artwork_max_page_num";
  payload: any;
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
    case "actual_artist_artwork_max_page_num":
      return {
        ...dataState,
        actual_artist_artwork_max_page: dataAction.payload,
      };
    default:
      return dataState;
  }
};

export default dataReducer;
