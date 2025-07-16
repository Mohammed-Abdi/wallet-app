import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import NotFound from "../pages/not-found/NotFound";
import { useContext, useMemo } from "react";
import { AccountContext } from "../context/AccountContext";

function Router() {
  const { accounts } = useContext(AccountContext);

  const userIsActive = useMemo(() => {
    return accounts.some(
      (account) => account.status.accountStatus === "active"
    );
  }, [accounts]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={userIsActive ? <Dashboard /> : <NotFound />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
