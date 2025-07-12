import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggle from "../../components/buttons/ThemeToggle";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { theme } = useContext(ThemeContext);

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
      className={styles.dashboard}
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
            {/* Profile goes here */}
          </Link>
        </div>
      </NavBar>
    </main>
  );
}

export default Dashboard;
