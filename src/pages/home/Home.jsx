import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import styles from "./Home.module.css";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggle from "../../components/buttons/ThemeToggle";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/Footer";
import { AccountContext } from "../../context/AccountContext";
import Loader from "../../components/Loader";
import { StatusContext } from "../../context/StatusContext";

function Home() {
  const { theme } = useContext(ThemeContext);
  const { accounts } = useContext(AccountContext);
  const { loading, statusDispatch } = useContext(StatusContext);
  const navigate = useNavigate();

  const currentUser = accounts.find(
    (account) => account.status.accountStatus === "active"
  );

  useEffect(() => {
    if (currentUser) {
      statusDispatch({ type: "start" });

      const timer = setTimeout(() => {
        navigate("/dashboard");
        statusDispatch({ type: "success" });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentUser, navigate, statusDispatch]);

  const textStyle = {
    color:
      theme === "dark"
        ? "var(--light-background)"
        : theme === "light"
        ? "var(--dark-background)"
        : "inherit",
    transition: "color 0.3s ease-in-out",
  };

  return (
    <main
      className={styles.homepage}
      style={{
        backgroundColor:
          theme === "dark"
            ? "var(--dark-background)"
            : theme === "light"
            ? "var(--light-background)"
            : "",
      }}
    >
      {loading && <Loader />}
      <NavBar>
        <Logo />
        <div className={styles.right}>
          <ThemeToggle />
          <Link to="/login" style={{ textDecoration: "none" }}>
            <ActionButton>Login</ActionButton>
          </Link>
        </div>
      </NavBar>
      <Hero />
      <Footer>
        <p style={textStyle}>&copy;2025 Mohammed Abdi. All rights reserved</p>
      </Footer>
    </main>
  );
}

export default Home;
