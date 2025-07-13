import { useContext, useState } from "react";
import ActionButton from "../buttons/action-button/ActionButton";
import SecondaryButton from "../buttons/secondary-button/SecondaryButton";
import styles from "./Transaction.module.css";
import { ThemeContext } from "../../context/ThemeContext";

function Transaction({ type, currentBalance }) {
  const [amount, setAmount] = useState("");
  const { theme } = useContext(ThemeContext);
  const inputStyle = {
    border: `2px solid var(--${theme}-border-clr)`,
    backgroundColor: `var(--${theme}-button-hover-clr)`,
    color: `var(--${theme}-text-clr)`,
  };

  return type ? (
    <main className={styles.main}>
      <div
        className={styles.wrapper}
        style={{
          color: `var(--${theme}-text-clr)`,
          transition:
            "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
      >
        <input
          type="text"
          placeholder="Enter amount"
          style={inputStyle}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className={styles.buttons}>
          <ActionButton style={{ width: "100%", borderRadius: "0.25rem" }}>
            {type?.split("").at(0).toUpperCase() + type?.slice(1)}
          </ActionButton>
          <SecondaryButton
            style={{
              color: `var(--${theme}-text-clr)`,
              width: "100%",
              borderRadius: "0.25rem",
            }}
          >
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </main>
  ) : (
    ""
  );
}

export default Transaction;
