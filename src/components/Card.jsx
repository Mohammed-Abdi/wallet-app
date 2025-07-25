import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  gap: "0.25rem",
  alignItems: "center",
  justifyContent: "center",
  width: "7rem",
  height: "6.25rem",
  borderRadius: "0.5rem",
  outline: "2px solid var(--accent-clr)",
  cursor: "pointer",
};

function Card({ icon, text, onClick }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      onClick={onClick}
      className="card"
      style={{
        ...cardStyle,
        border: `1px solid var(--${theme}-border-clr)`,
        transition: "border-color 0.3s ease-in-out",
      }}
    >
      <span
        style={{
          color: "var(--accent-clr)",
          marginTop: "-1rem",
        }}
      >
        {icon}
      </span>
      <p
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          position: "absolute",
          bottom: "0.75rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default Card;
