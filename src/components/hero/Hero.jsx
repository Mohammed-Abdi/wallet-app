import styles from "./Hero.module.css";
import Highlight from "../Highlight";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ActionButton from "../buttons/action-button/ActionButton";
import SecondaryButton from "../buttons/secondary-button/SecondaryButton";
import WalletAnimation from "../../assets/WalletAnimation";
import { AccountContext } from "../../context/AccountContext";

function Hero() {
  const { theme } = useContext(ThemeContext);
  const { accountDispatch } = useContext(AccountContext);

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
    <section className={styles.hero}>
      <div className={styles.left}>
        <Highlight fontSize="0.875rem">
          <p style={textStyle}>Simple. Secure. Personal →</p>
        </Highlight>
        <h1
          style={{ ...textStyle, width: "min(750px, 100%)", fontWeight: 500 }}
        >
          The smarter, simpler way to launch, manage, and personalize your
          digital wallet experience.
        </h1>
        <div className={styles.buttons}>
          <ActionButton style={{ padding: "0.75rem 2rem" }}>
            <p>Get Started →</p>
          </ActionButton>
          <SecondaryButton
            style={{ padding: "0.75rem 2rem" }}
            onClick={() =>
              accountDispatch({ type: "login", payload: "@guest_user" })
            }
          >
            <p style={textStyle}>Demo Account</p>
          </SecondaryButton>
        </div>
      </div>
      <div className={styles.right}>
        <WalletAnimation />
      </div>
    </section>
  );
}

export default Hero;
