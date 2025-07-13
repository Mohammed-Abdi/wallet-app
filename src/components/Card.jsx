import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  alignItems: "center",
  justifyContent: "center",
  width: "7rem",
  height: "6.25rem",
  borderRadius: "0.5rem",
  outline: "2px solid var(--accent-clr)",
  cursor: "pointer",
};

function Card({ icon, text }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="card"
      style={{
        ...cardStyle,
        backgroundColor: `var(--${theme}-wrapper-clr)`,
        border: `1px solid var(--${theme}-border-clr)`,
        transition:
          "border-color 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    >
      <span
        style={{
          color: "var(--accent-clr)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {icon}
      </span>
      <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{text}</p>
    </div>
  );
}

export default Card;
