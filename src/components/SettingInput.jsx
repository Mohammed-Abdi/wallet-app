import { useContext, useRef, useState } from "react";
import Edit from "../assets/Edit";
import { ThemeContext } from "../context/ThemeContext";

const inputWrapperStyle = {
  position: "relative",
};

const inputStyle = {
  border: "none",
  outline: "none",
  padding: "0.25rem 0.75rem",
  fontSize: "1rem",
  borderRadius: "0.25rem",
  width: "100%",
};

const editorIconStyle = {
  position: "absolute",
  top: "50%",
  right: "0.75rem",
  transform: "translateY(-30%)",
  cursor: "pointer",
};

function SettingInput({ canChange, type = "text", value, setValue, style }) {
  const { theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const input = useRef(null);
  return (
    <div style={inputWrapperStyle}>
      <input
        ref={input}
        style={{
          ...inputStyle,
          ...style,
          backgroundColor: `var(--${theme}-${
            isEditing ? "wrapper-clr" : "background"
          })`,
        }}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!isEditing}
      />
      {canChange && (
        <div
          style={editorIconStyle}
          onClick={() => {
            setIsEditing((cur) => !cur);
            input.current.focus();
          }}
        >
          {isEditing ? "" : <Edit style={{ opacity: 0.7 }} />}
        </div>
      )}
    </div>
  );
}

export default SettingInput;
