import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import WalletIcon from "../assets/WalletIcon";

const logoContentStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "24px",
  fontWeight: 500,
  color: "#00cc89",
};

function Logo() {
  const { theme } = useContext(ThemeContext);
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div style={logoContentStyle}>
        <WalletIcon size={32} />
        <p
          style={{
            color:
              theme === "dark"
                ? "var(--light-background)"
                : theme === "light"
                ? "var(--dark-background)"
                : "inherit",
            transition: "color 0.3s ease-in-out",
          }}
        >
          Wallet
        </p>
      </div>
    </Link>
  );
}

export default Logo;
