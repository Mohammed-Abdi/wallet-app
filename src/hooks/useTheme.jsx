import { useEffect, useReducer } from "react";

const initialThemeState = {
  theme: "dark",
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleMode":
      return { ...state, theme: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

export function useTheme() {
  const [themeState, themeDispatch] = useReducer(
    reducer,
    initialThemeState,
    () => {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme ? JSON.parse(storedTheme) : initialThemeState;
    }
  );
  const { theme } = themeState;

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeState));
  }, [themeState]);

  return { theme, themeDispatch };
}
