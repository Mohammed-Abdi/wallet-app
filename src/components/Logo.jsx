import { Link } from "react-router-dom";
import WalletIcon from "../assets/WalletIcon";

const logoContentStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "24px",
  fontWeight: 500,
};

function Logo() {
  return (
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <div style={logoContentStyle}>
        <WalletIcon size={32} color="var(--accent-clr)" />
        <p>Wallet</p>
      </div>
    </Link>
  );
}

export default Logo;
