import { IRecState, TRecAction } from "../@types/artwork";

export const recInitialState = {
  artist: undefined,
  artwork: undefined,
  artist_id: undefined,
  artwork_id: undefined,
  artwork_total: 0,
  artist_total: 0,
};

const recommendReducer = (recState: IRecState, recAction: any) => {
  switch (recAction.type) {
    case "artist":
      return { ...recState, artist: recAction.payload };
    case "artwork":
      return { ...recState, artwork: recAction.payload };
    case "artwork_total":
      return { ...recState, artwork_total: recAction.payload };
    case "artist_total":
      return { ...recState, artist_total: recAction.payload };
    case "artist_id":
      return { ...recState, artist_id: recAction.payload };
    case "artwork_id":
      return { ...recState, artwork_id: recAction.payload };
    default:
      return recState;
  }
};

export default recommendReducer;
