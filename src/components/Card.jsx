import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "6.25rem",
  height: "6.25rem",
  borderRadius: "0.5rem",
};

function Card({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        ...cardStyle,
        backgroundColor:
          theme === "dark"
            ? "var(--dark-background)"
            : theme === "light"
            ? "var(--light-background)"
            : "inherit",
        border: `1px solid ${
          theme === "dark"
            ? "var(--dark-border-clr)"
            : theme === "light"
            ? "var(--light-border-clr)"
            : "inherit"
        }`,
      }}
    >
      {children}
    </div>
  );
}

export default Card;
