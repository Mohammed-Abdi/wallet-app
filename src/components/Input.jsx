import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import EyeOff from "../assets/EyeOff";
import EyeOn from "../assets/EyeOn";

const today = new Date();
const formatted = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

function Input({
  type = "text",
  isPassword,
  placeholder,
  style,
  getValue = () => {},
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getValue(value);
  }, [value, getValue]);

  return (
    <div style={{ position: "relative" }}>
      <input
        value={type === "date" && !value ? formatted : value}
        onChange={(e) => setValue(e.target.value)}
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
