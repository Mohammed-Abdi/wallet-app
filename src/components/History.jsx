import { useState, useEffect } from "react";
import ArrowUp from "../assets/ArrowUp";
import Loop from "../assets/Loop";

function History({ id, date, type, amount, currency, from, to }) {
  const [message, setMessage] = useState("");

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
    <div>
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
      <div>
        <div>{message}</div>
        <div>{date}</div>
      </div>
    </div>
  );
}

export default History;
