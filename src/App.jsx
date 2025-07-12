import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { ThemeContext } from "./context/ThemeContext";
import { AccountContext } from "./context/AccountContext";
import { useTheme } from "./hooks/useTheme";
import { useAccount } from "./hooks/useAccount";

function App() {
  const { theme, themeDispatch } = useTheme();
  const { currentUser, accounts, accountDispatch } = useAccount();

  return (
    <BrowserRouter>
      <AccountContext.Provider
        value={{ currentUser, accounts, accountDispatch }}
      >
        <ThemeContext.Provider value={{ theme, themeDispatch }}>
          <Router />
        </ThemeContext.Provider>
      </AccountContext.Provider>
    </BrowserRouter>
  );
}

export default App;
