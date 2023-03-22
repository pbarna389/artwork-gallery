export const initialState = {
  loading: false,
  artists: undefined,
};

type dataActionType = {
  type: "loading" | "set_artists" | "set_artist_pagination";
  payload: any;
};

const dataReducer = (dataState: any, dataAction: dataActionType) => {
  switch (dataAction.type) {
    case "loading":
      return { ...dataState, loading: dataAction.payload };
    case "set_artists":
      return { ...dataState, artists: dataAction.payload };
    case "set_artist_pagination":
      return { ...dataState, artist_pagination: dataAction.payload };
    default:
      return dataState;
  }
};

export default dataReducer;
