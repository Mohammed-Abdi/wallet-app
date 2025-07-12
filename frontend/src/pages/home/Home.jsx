import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from "./Home.module.css";
import Logo from "../../components/Logo";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggle from "../../components/buttons/ThemeToggle";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/Footer";
import { useAccount } from "../../hooks/useAccount";

function Home() {
  const { theme } = useContext(ThemeContext);
  const { contacts } = useAccount();
  console.log(contacts);

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
