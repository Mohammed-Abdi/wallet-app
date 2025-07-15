import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { ThemeContext } from "./context/ThemeContext";
import { AccountContext } from "./context/AccountContext";
import { useTheme } from "./hooks/useTheme";
import { useAccount } from "./hooks/useAccount";
import { useAppStatus } from "./hooks/useAppStatus";
import { StatusContext } from "./context/StatusContext";
import { useEffect } from "react";

function App() {
  const { theme, themeDispatch } = useTheme();
  const { admins, accounts, status, message, accountDispatch } = useAccount();
  const { loading, error, statusDispatch } = useAppStatus();

  useEffect(() => {
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return (
    <BrowserRouter>
      <StatusContext.Provider value={{ loading, error, statusDispatch }}>
        <AccountContext.Provider
          value={{ admins, accounts, status, message, accountDispatch }}
        >
          <ThemeContext.Provider value={{ theme, themeDispatch }}>
            <Router />
          </ThemeContext.Provider>
        </AccountContext.Provider>
      </StatusContext.Provider>
    </BrowserRouter>
  );
}

export default App;
