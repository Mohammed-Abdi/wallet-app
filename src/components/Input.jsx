import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import EyeOff from "../assets/EyeOff";
import EyeOn from "../assets/EyeOn";

function Input({ type = "text", isPassword, placeholder, style }) {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ position: "relative" }}>
      <input
        style={{
          ...style,
          border: `2px solid var(--${theme}-border-clr)`,
          backgroundColor: `var(--${theme}-wrapper-clr)`,
          color: `var(--${theme}-text-clr)`,
          padding: "0.75rem",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          width: "100%",
        }}
        type={isPassword ? (isVisible ? "text" : "password") : type}
        placeholder={placeholder}
        required
      />
      <div
        style={{
          position: "absolute",
          right: "0.75rem",
          top: "50%",
          opacity: 0.7,
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={() => setIsVisible((cur) => !cur)}
      >
        {isPassword ? isVisible ? <EyeOn /> : <EyeOff /> : ""}
      </div>
    </div>
  );
}

export default Input;
