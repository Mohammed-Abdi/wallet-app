import { useContext, useEffect, useState } from "react";
import ActionButton from "../buttons/action-button/ActionButton";
import SecondaryButton from "../buttons/secondary-button/SecondaryButton";
import styles from "./Transaction.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { AccountContext } from "../../context/AccountContext";

function Transaction({ id, type, currentBalance, setType }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  const numericAmount = Number(Number(amount).toFixed(2));

  const { accountDispatch } = useContext(AccountContext);
  const { theme } = useContext(ThemeContext);

  const inputStyle = {
    border: `2px solid var(--${theme}-border-clr)`,
    backgroundColor: `var(--${theme}-button-hover-clr)`,
    color: `var(--${theme}-text-clr)`,
    width: "100%",
  };

  useEffect(() => {
    if (type?.toLowerCase() === "withdraw") {
      if (numericAmount < currentBalance) setMessage("");
      if (currentBalance < numericAmount) setMessage("Insufficient balance");
    }
  }, [currentBalance, amount, type, numericAmount]);

  function handleTransaction() {
    if (type?.toLowerCase() === "deposit") {
      accountDispatch({
        type: "deposit",
        payload: { id, amount: numericAmount, currency },
      });
      setType(null);
      setAmount("");
      setCurrency("USDT");
    }
    if (type?.toLowerCase() === "withdraw") {
      if (currentBalance > numericAmount) {
        accountDispatch({
          type: "withdraw",
          payload: { id, amount: numericAmount, currency },
        });
        setType(null);
        setAmount("");
        setCurrency("USDT");
      }
    }
    if (type?.toLowerCase() === "send") {
      accountDispatch({
        type: "send",
        payload: { id, receiver, amount: numericAmount, currency },
      });
      setType(null);
      setAmount("");
      setCurrency("USDT");
    }
    if (type?.toLowerCase() === "convert") {
      accountDispatch({
        type: "convert",
        payload: { id, amount: numericAmount },
      });
      setType(null);
    }
  }

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
        {/* for deposit and withdraw */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Enter amount..."
            style={inputStyle}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            name="currency"
            id="currency"
            style={{
              backgroundColor: `var(--${theme}-border-clr)`,
              color: `var(--${theme}-text-clr)`,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USDT">USDT</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="BNB">BNB</option>
            <option value="SOL">SOL</option>
          </select>
        </div>

        {/* for conversion */}
        {type?.toLowerCase() === "convert" && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Enter amount..."
              style={inputStyle}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              name="currency"
              id="currency"
              style={{
                backgroundColor: `var(--${theme}-border-clr)`,
                color: `var(--${theme}-text-clr)`,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="BNB">BNB</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
        )}

        {/* for send */}
        {type?.toLowerCase() === "send" && (
          <input
            type="text"
            placeholder="Enter receivers ID..."
            style={inputStyle}
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        )}

        <p style={{ fontSize: "0.875rem", color: "red", fontWeight: 500 }}>
          {message}
        </p>

        <div className={styles.buttons}>
          <ActionButton
            style={{ width: "100%", borderRadius: "0.25rem" }}
            onClick={handleTransaction}
          >
            {type?.split("").at(0).toUpperCase() + type?.slice(1)}
          </ActionButton>
          <SecondaryButton
            style={{
              color: `var(--${theme}-text-clr)`,
              width: "100%",
              borderRadius: "0.25rem",
            }}
            onClick={() => setType(null)}
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
