import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import Signup from "../pages/signup/Signup";

function Router() {
  const { accounts } = useContext(AccountContext);

  const currentUser = accounts.find(
    (account) => account.status.accountStatus === "active"
  );

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Dashboard /> : <Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Router;
