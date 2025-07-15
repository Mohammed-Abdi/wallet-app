import styles from "./Signup.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import Hero from "../../components/hero/Hero";

function Signup() {
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={styles.signup}
      style={{
        color: `var(--${theme}-text-clr)`,
        backgroundColor: `var(--${theme}-background)`,
        transition: "color 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    >
      <NavBar>
        <Logo />
        <div className={styles.right}>
          <p style={{ opacity: 0.8 }}>Already have an account?</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <p
              className={styles.goto}
              style={{
                color: `var(--${theme}-text-clr)`,
                transition: "color 0.3s ease-in-out",
              }}
            >
              Login
            </p>
          </Link>
        </div>
      </NavBar>
      <div className={styles.body}>
        <div className={styles.leftSide}>
          <section className={styles.mainText}>
            <h1>Let's get</h1>
            <h1>you started</h1>
          </section>
          <section className={styles.subText}>
            <p>
              Getting started is simple, and it’s the last time you’ll ever need
              to do it.
            </p>
            <p style={{ marginTop: "0.625rem" }}>
              Our process is quick and straightforward.
            </p>
            <p>
              Once you're in, you’ll enjoy all the powerful features with zero
              hassle moving forward.
            </p>
          </section>
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </main>
  );
}

export default Signup;
