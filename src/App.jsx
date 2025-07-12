import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { ThemeContext } from "./context/ThemeContext";
import { AccountContext } from "./context/AccountContext";
import { useTheme } from "./hooks/useTheme";
import { useAccount } from "./hooks/useAccount";
import { useAppStatus } from "./hooks/useAppStatus";
import { StatusContext } from "./context/StatusContext";

function App() {
  const { theme, themeDispatch } = useTheme();
  const { admins, accounts, status, message, accountDispatch } = useAccount();
  const { loading, error, statusDispatch } = useAppStatus();

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
