import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Highlight({ fontSize = "0.875rem", children }) {
  const { theme } = useContext(ThemeContext);
  const borderRadius = Number(fontSize.split("").slice(0, -3).join(""));
  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        padding: "0.5rem 0.75rem",
        fontSize: fontSize,
        fontWeight: 400,
        borderRadius: `${borderRadius * 2}rem`,
        border: `2px solid var(--${theme}-border-clr)`,
        transition: "border-color 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default Highlight;
