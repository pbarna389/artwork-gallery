export interface initialState {
  name: string;
}

const dataReducer = (dataState: any, dataAction: any) => {
  switch (dataAction.type) {
    case "loading":
      return { ...dataState, loading: dataAction.payload };
    default:
      return dataState;
  }
};
