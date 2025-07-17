import styles from "./Signup.module.css";
import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import { getAge } from "../../services/getAge";
import { AccountContext } from "../../context/AccountContext";
import { nanoid } from "nanoid";
import Checked from "../../assets/Checked";

const miniMessageStyle = {
  position: "absolute",
  right: "0.75rem",
  top: "50%",
  transform: "translateY(-50%)",
  fontWeight: 500,
};

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Not specified");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useContext(ThemeContext);
  const { accounts, accountDispatch } = useContext(AccountContext);
  const navigate = useNavigate();

  const userNameMatch = useMemo(() => {
    return accounts.some(
      (account) =>
        account?.account?.username?.toLowerCase() === username?.toLowerCase()
    );
  }, [username, accounts]);

  const userInfo = useMemo(() => {
    return {
      id: nanoid(),

      personalInfo: {
        name: `${
          firstName?.split("").at(0)?.toUpperCase() +
          firstName?.toLowerCase().slice(1)
        } ${
          lastName?.split("").at(0)?.toUpperCase() +
          lastName?.toLowerCase().slice(1)
        }`,
        profilePicture: null,
        age: getAge(birthdate),
        gender: gender,
      },

      location: { city: city, country: country },

      account: {
        username: username?.toLowerCase(),
        email: email?.toLowerCase(),
        password: newPassword === confirmPassword ? newPassword : "error",
      },

      status: {
        accountStatus: "inactive",
        verification: "verified",
        membership: "pro",
      },

      balances: [
        { symbol: "BTC", name: "Bitcoin", balance: 0 },
        { symbol: "ETH", name: "Ethereum", balance: 0 },
        { symbol: "USD", name: "Dollar", balance: 0 },
        { symbol: "BNB", name: "Binance Coin", balance: 0 },
        { symbol: "SOL", name: "Solana", balance: 0 },
      ],

      transactions: [],
      logins: [],

      timestamps: {
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
    };
  }, [
    firstName,
    lastName,
    gender,
    city,
    country,
    birthdate,
    username,
    email,
    newPassword,
    confirmPassword,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    accountDispatch({ type: "addNewUser", payload: userInfo });
    accountDispatch({ type: "login", payload: username.toLowerCase() });
    setFirstName("");
    setLastName("");
    setGender("Not specified");
    setBirthdate("");
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    navigate("/dashboard");
  }

  return (
    <main className={styles.signup}>
      <NavBar>
        <Logo />

        <p className={styles.option}>
          <span style={{ opacity: 0.7 }}>Already have an account?</span>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span
              className={styles.goto}
              style={{
                color: `var(--${theme}-text-clr)`,
                transition: "color 0.3s ease-in-out",
                opacity: 1,
                marginLeft: "0.5rem",
              }}
            >
              Login
            </span>
          </Link>
        </p>
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
        <div className={styles.rightSide}>
          <form className={styles.form}>
            <article
              style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
            >
              <Input
                type="text"
                placeholder="First name"
                getValue={setFirstName}
              />
              <Input type="text" placeholder="Surname" getValue={setLastName} />
            </article>

            <article
              style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
            >
              <Input type="text" placeholder="City" getValue={setCity} />
              <Input type="text" placeholder="Country" getValue={setCountry} />
            </article>

            <article
              style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
            >
              <select
                required
                name="gender"
                id="gender"
                style={{
                  padding: "0.75rem",
                  backgroundColor: `var(--dark-wrapper-clr)`,
                  color: `var(--dark-text-clr)`,
                  width: "100%",
                  borderRadius: "0.5rem",
                  border: `2px solid var(--dark-border-clr)`,
                  fontSize: "1rem",
                }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="None" disabled>
                  Choose your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <Input
                type="date"
                placeholder="Birthdate"
                getValue={setBirthdate}
              />
            </article>
            <article style={{ position: "relative" }}>
              <Input
                type="text"
                placeholder="Username"
                getValue={setUsername}
              />
              {username.length >= 3 && (
                <div style={miniMessageStyle}>
                  {userNameMatch ? (
                    <p style={{ color: "red" }}>Username already taken</p>
                  ) : (
                    <Checked />
                  )}
                </div>
              )}
            </article>

            <Input
              type="email"
              placeholder="Email address"
              getValue={setEmail}
            />
            <article style={{ position: "relative" }}>
              <Input
                type="password"
                isPassword={true}
                placeholder="New Password"
                getValue={setNewPassword}
              />
              {confirmPassword && (
                <div
                  style={{
                    ...miniMessageStyle,
                    right: "2.5rem",
                  }}
                >
                  {newPassword === confirmPassword ? <Checked /> : ""}
                </div>
              )}
            </article>
            <article style={{ position: "relative" }}>
              <Input
                type="password"
                isPassword={true}
                placeholder="Confirm Password"
                getValue={setConfirmPassword}
              />

              {confirmPassword && (
                <div
                  style={{
                    ...miniMessageStyle,
                    right: "2.5rem",
                    transform: "translateY(-65%)",
                  }}
                >
                  {newPassword === confirmPassword ? (
                    <div style={{ transform: "translateY(15%)" }}>
                      <Checked />
                    </div>
                  ) : (
                    <p style={{ color: "red" }}>Passwords don't Match</p>
                  )}
                </div>
              )}
            </article>
            <ActionButton
              onClick={handleSubmit}
              style={{ width: "100%", paddingBlock: "0.75rem" }}
            >
              Sign Up
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

export default Signup;
