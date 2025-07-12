import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Highlight({ fontSize, children }) {
  const { theme } = useContext(ThemeContext);
  const borderRadius = Number(fontSize.split("").slice(0, -3).join(""));
  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        padding: "0.5rem 0.75rem",
        fontSize: fontSize,
        borderRadius: `${borderRadius * 2}rem`,
        border: `2px solid ${
          theme === "dark"
            ? "var(--dark-border-clr)"
            : theme === "light"
            ? "var(--light-border-clr)"
            : ""
        }`,
        transition: "border-color 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default Highlight;
