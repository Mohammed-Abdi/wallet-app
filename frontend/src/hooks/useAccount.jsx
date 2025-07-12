import { useReducer } from "react";
import { useRandomContacts } from "./useRandomContacts";

const initialAccountState = {
  accounts: [],
  currentUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setContacts":
      return { ...state, contacts: [...state.contacts, action.payload] };
    default:
      throw new Error("Unknown action");
  }
}

export function useAccount() {
  const [{ accounts, currentUser }, accountDispatch] = useReducer(
    reducer,
    initialAccountState
  );

  const { contacts, loading, error } = useRandomContacts();
  return { currentUser, accounts, contacts, loading, error, accountDispatch };
}
