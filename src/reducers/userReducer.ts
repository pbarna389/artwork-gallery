export const userInitialState = {
  login: false,
};

const userReducer = (userState: any, userAction: any) => {
  switch (userAction.type) {
    case "setLogin":
      return { ...userState, login: userAction.payload };
    default:
      return userState;
  }
};

export default userReducer;
