import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Router;
