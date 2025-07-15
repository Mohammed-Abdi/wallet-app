import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ToggleButton from "../../components/buttons/toggle-button/ToggleButton";
import DarkModeIcon from "../../assets/DarkModeIcon";
import LightModeIcon from "../../assets/LightModeIcon";

function ThemeToggle() {
  const { theme, themeDispatch } = useContext(ThemeContext);
  return (
    <ToggleButton
      onClick={
        theme === "dark"
          ? () => themeDispatch({ type: "toggleMode", payload: "light" })
          : theme === "light"
          ? () => themeDispatch({ type: "toggleMode", payload: "dark" })
          : null
      }
    >
      {theme === "dark" && <DarkModeIcon />}
      {theme === "light" && <LightModeIcon />}
    </ToggleButton>
  );
}

export default ThemeToggle;
