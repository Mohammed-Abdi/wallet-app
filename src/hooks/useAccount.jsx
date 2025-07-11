import { useReducer } from "react";

const initialAccountState = {
  accounts: [],
  currentUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "":
      return;
    default:
      throw new Error("Unknown action");
  }
}

export function useAccount() {
  const [{ accounts, currentUser }, accountDispatch] = useReducer(
    reducer,
    initialAccountState
  );
  return { currentUser, accounts, accountDispatch };
}
