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
        backgroundColor: `var(--${theme}-bright-clr)`,
        border: `1px solid var(--${theme}-border-clr)`,
        transition:
          "border-color 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default Card;
