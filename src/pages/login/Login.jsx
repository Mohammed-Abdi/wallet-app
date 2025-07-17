import styles from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import { AccountContext } from "../../context/AccountContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { theme } = useContext(ThemeContext);
  const { accounts, accountDispatch } = useContext(AccountContext);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const user = accounts.find(
      (account) => account.account.email === email.trim().toLowerCase()
    );

    if (!user) {
      setMessage("Incorrect email");
      return;
    }

    if (user.account.password !== password) {
      setMessage("Incorrect password");
      accountDispatch({ type: "failedLogin", payload: user.account.username });
      return;
    }

    accountDispatch({ type: "login", payload: user.account.username });
    setMessage("");
    setEmail("");
    setPassword("");
    navigate("/dashboard");
  }

  useEffect(() => {
    setMessage("");
  }, [email, password]);

  return (
    <main className={styles.login}>
      <NavBar>
        <Logo />
        <p className={styles.option}>
          <span style={{ opacity: 0.7 }}>Don't have an account?</span>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span
              className={styles.goto}
              style={{
                color: `var(--${theme}-text-clr)`,
                marginLeft: "0.5rem",
              }}
            >
              Sign Up
            </span>
          </Link>
        </p>
      </NavBar>

      <div className={styles.body}>
        <div className={styles.leftSide}>
          <section className={styles.mainText}>
            <h1>Welcome back, we've missed you!</h1>
          </section>
          <section className={styles.subText}>
            <p>Access your wallet securely and quickly.</p>
            <p>Enjoy all features without delay.</p>
          </section>
        </div>

        <div className={styles.rightSide}>
          <form className={styles.form} onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email address"
              getValue={setEmail}
            />
            <Input
              type="password"
              isPassword={true}
              placeholder="Password"
              getValue={setPassword}
            />

            {message && (
              <p style={{ color: "red", textAlign: "center", fontWeight: 500 }}>
                {message}
              </p>
            )}

            <ActionButton
              type="submit"
              style={{ width: "100%", paddingBlock: "0.75rem" }}
            >
              Login
            </ActionButton>
          </form>

          <p className={styles.notice}>
            This project is for portfolio and development purposes only. No real
            user data is stored or used.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
