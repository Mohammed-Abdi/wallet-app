import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import styles from "./Home.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggle from "../../components/buttons/ThemeToggle";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/Footer";

function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={styles.homepage}
      style={{
        color: `var(--${theme}-text-clr)`,
        backgroundColor: `var(--${theme}-background)`,
        transition: "color 0.3s ease-in-out, background-color 0.3s ease-in-out",
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
        <p>&copy;2025 Mohammed Abdi. All rights reserved</p>
      </Footer>
    </main>
  );
}

export default Home;
