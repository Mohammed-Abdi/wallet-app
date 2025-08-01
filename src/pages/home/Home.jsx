import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import styles from "./Home.module.css";
import ThemeToggle from "../../components/buttons/ThemeToggle";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/Footer";
import Disclaimer from "../../components/Disclaimer";

function Home() {
  return (
    <main className={styles.homepage}>
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
        <Disclaimer />
        <p>&copy;2025 Mohammed Abdi. All rights reserved</p>
      </Footer>
    </main>
  );
}

export default Home;
