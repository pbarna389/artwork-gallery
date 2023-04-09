import { IuserState } from "../@types/artwork";

export const userInitialState = {
  login: false,
  update: false,
  userData: undefined,
  favouriteArtists: undefined,
  favouriteArtworks: undefined,
};

type TUserAction = {
  type:
    | "setLogin"
    | "setUpdate"
    | "setUserData"
    | "setFavouriteArtists"
    | "setFavouriteArtworks"
    | "deleteFromArtists";
  payload: any;
};

const userReducer = (userState: IuserState, userAction: any) => {
  switch (userAction.type) {
    case "setLogin":
      return { ...userState, login: userAction.payload };
    case "setUpdate":
      return { ...userState, update: userAction.payload };
    case "setUserData":
      return { ...userState, userData: userAction.payload };
    case "setFavouriteArtists":
      return { ...userState, favouriteArtists: userAction.payload };
    case "setFavouriteArtworks":
      return { ...userState, favouriteArtworks: userAction.payload };
    // case "deleteFromArtists":
    //   return { ...userState, favouriteArtists: userState.favouriteArtists.filter()}
    default:
      return userState;
  }
};

export default userReducer;
