import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";
import styles from "./Hero.module.css";
import Highlight from "../Highlight";
import ActionButton from "../buttons/action-button/ActionButton";
import SecondaryButton from "../buttons/secondary-button/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const { accountDispatch } = useContext(AccountContext);
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <Highlight fontSize="0.875rem">
        <p>Simple. Secure. Personal →</p>
      </Highlight>
      <h1 style={{ width: "min(750px, 100%)", fontWeight: 500 }}>
        The smarter, simpler way to launch, manage, and personalize your digital
        wallet experience.
      </h1>
      <div className={styles.buttons}>
        <Link to="/signup">
          <ActionButton style={{ padding: "0.75rem 2rem" }}>
            <p>Get Started →</p>
          </ActionButton>
        </Link>
        <SecondaryButton
          style={{ padding: "0.75rem 2rem" }}
          onClick={() => {
            accountDispatch({ type: "login", payload: "guest_user" });
            navigate("/dashboard");
          }}
        >
          <p>Demo Account</p>
        </SecondaryButton>
      </div>
    </section>
  );
}

export default Hero;
