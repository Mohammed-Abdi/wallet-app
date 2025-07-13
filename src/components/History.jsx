import { useState, useEffect, useContext } from "react";
import ArrowUp from "../assets/ArrowUp";
import Loop from "../assets/Loop";
import { formatDateTime } from "../services/formatDateTime";
import { ThemeContext } from "../context/ThemeContext";

const containerStyles = {
  display: "flex",
  alignItems: "center",
  gap: "1.25rem",
  padding: "1.25rem",
  borderRadius: "0.5rem",
  width: "min(36rem, 100%)",
};

const columnStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  flex: 1,
  minWidth: 0,
};

const messageStyles = {
  wordWrap: "break-word",
  overflowWrap: "break-word",
  whiteSpace: "normal",
  width: "100%",
};

const dateStyles = {
  fontSize: "0.875rem",
  opacity: 0.7,
};

function History({ id, date, type, amount, currency, from, to }) {
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (type === "deposit")
      setMessage(
        `You successfully deposited ${amount} ${currency} into your wallet.`
      );
    else if (type === "withdraw")
      setMessage(
        `You successfully withdrew ${amount} ${currency} from your wallet.`
      );
    else if (type === "send")
      setMessage(
        `You successfully sent ${amount} ${currency} to user ID: ${id}.`
      );
    else if (type === "convert")
      setMessage(
        `You successfully converted ${from.amount} ${from.currency} to ${to.amount} ${to.currency}.`
      );
    else setMessage("");
  }, [type, amount, currency, id, from, to]);

  return (
    <div
      style={{
        ...containerStyles,
        backgroundColor: `var(--${theme}-wrapper-clr)`,
      }}
    >
      <div>
        {type === "deposit" && (
          <div style={{ transform: "rotate(180deg)", color: "green" }}>
            <ArrowUp />
          </div>
        )}
        {type === "withdraw" && (
          <div style={{ color: "red" }}>
            <ArrowUp />
          </div>
        )}
        {type === "send" && (
          <div style={{ color: "red" }}>
            <ArrowUp />
          </div>
        )}
        {type === "convert" && (
          <div style={{ color: "#9929EA" }}>
            <Loop />
          </div>
        )}
      </div>

      <div style={columnStyles}>
        <div style={messageStyles}>{message}</div>
        <div style={dateStyles}>{formatDateTime(date)}</div>
      </div>
    </div>
  );
}

export default History;
