import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";
import styles from "./Hero.module.css";
import Highlight from "../Highlight";
import ActionButton from "../buttons/action-button/ActionButton";
import SecondaryButton from "../buttons/secondary-button/SecondaryButton";
import WalletAnimation from "../../assets/WalletAnimation";

function Hero() {
  const { accountDispatch } = useContext(AccountContext);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <Highlight fontSize="0.875rem">
          <p>Simple. Secure. Personal →</p>
        </Highlight>
        <h1 style={{ width: "min(750px, 100%)", fontWeight: 500 }}>
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
              accountDispatch({ type: "login", payload: "guest_user" })
            }
          >
            <p>Demo Account</p>
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
