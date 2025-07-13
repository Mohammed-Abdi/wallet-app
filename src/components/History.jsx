import { useState, useEffect, useContext } from "react";
import ArrowUp from "../assets/ArrowUp";
import Loop from "../assets/Loop";
import { formatDateTime } from "../services/formatDateTime";
import { ThemeContext } from "../context/ThemeContext";

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
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        backgroundColor: `var(--${theme}-wrapper-clr)`,
        padding: "1.25rem",
        borderRadius: "0.25rem",
        width: "min(36rem, 100%)",
        marginInline: "0.625rem",
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
          <div style={{ color: "green" }}>
            <Loop />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div>{message}</div>
        <div style={{ fontSize: "0.875rem", opacity: 0.7 }}>
          {formatDateTime(date)}
        </div>
      </div>
    </div>
  );
}

export default History;
