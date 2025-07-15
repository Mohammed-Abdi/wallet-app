import styles from "./Signup.module.css";
import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import { getAge } from "../../services/getAge";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Not specified");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useContext(ThemeContext);

  const userInfo = useMemo(() => {
    return {
      name: `${firstName} ${lastName}`,
      gender,
      age: getAge(birthdate),
      birthdate,
      email,
      password: newPassword === confirmPassword ? newPassword : "error",
    };
  }, [
    firstName,
    lastName,
    gender,
    birthdate,
    email,
    newPassword,
    confirmPassword,
  ]);

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
                <option value="Not specified" disabled>
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
            <Input
              type="email"
              placeholder="Email address"
              getValue={setEmail}
            />
            <Input
              type="password"
              isPassword={true}
              placeholder="New Password"
              getValue={setNewPassword}
            />
            <Input
              type="password"
              isPassword={true}
              placeholder="Confirm Password"
              getValue={setConfirmPassword}
            />
            <ActionButton style={{ width: "100%", paddingBlock: "0.75rem" }}>
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
