import { useReducer } from "react";

const initialState = {
  loading: false,
  error: null,
};

function statusReducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, loading: true, error: null };
    case "success":
      return { ...state, loading: false };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function useAppStatus() {
  const [{ loading, error }, statusDispatch] = useReducer(
    statusReducer,
    initialState
  );

  return {
    loading,
    error,
    statusDispatch,
  };
}
