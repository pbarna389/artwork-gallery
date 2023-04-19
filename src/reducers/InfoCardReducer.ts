import { IInfoCardState } from "../@types/artwork";

export const infoCardInitialState = {
  infoCard: false,
  infoCardText: null,
  infoCardTimeoutID: null,
  clickedAgain: false,
  clickedAgainTimeoutID: undefined,
};

const InfoCardReducer = (
  infoCardState: IInfoCardState,
  infoCardAction: any
) => {
  switch (infoCardAction.type) {
    case "setInfoCard": {
      return { ...infoCardState, infoCard: infoCardAction.payload };
    }
    case "setInfoCardText": {
      return { ...infoCardState, infoCardText: infoCardAction.payload };
    }
    case "setInfoCardTimeoutID": {
      return { ...infoCardState, infoCardTimeoutID: infoCardAction.payload };
    }
    case "setClickedAgain": {
      return { ...infoCardState, clickedAgain: infoCardAction.payload };
    }
    case "setClickedAgainTimeoutID": {
      return {
        ...infoCardState,
        clickedAgainTimeoutID: infoCardAction.payload,
      };
    }
    default:
      return infoCardState;
  }
};

export default InfoCardReducer;
