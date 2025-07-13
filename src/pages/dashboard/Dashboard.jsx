import { useContext } from "react";
import ThemeToggle from "../../components/buttons/ThemeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from "./Dashboard.module.css";
import Profile from "../../components/Profile";
import { AccountContext } from "../../context/AccountContext";
import { getBalance } from "../../services/getBalance";
import { convertToUSD } from "../../services/convertToUSD";
import Card from "../../components/card";

function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const { accounts } = useContext(AccountContext);

  const currentUser = accounts.find(
    (account) => account.status.accountStatus === "active"
  );

  const { name, balance, symbol } = getBalance(currentUser.balances);

  const usdBalance = convertToUSD(balance, symbol);

  return (
    <main
      className={styles.dashboard}
      style={{
        color: `var(--${theme}-text-clr)`,
        backgroundColor: `var(--${theme}-background)`,
        transition: "color 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    >
      <NavBar style={{ paddingBlock: "2rem" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Profile
            name={currentUser.personalInfo.name}
            username={currentUser.account.username}
            profilePicture={currentUser.personalInfo.profilePicture}
            verification={currentUser.status.verification}
            membership={currentUser.status.membership}
          />
        </Link>
        <div className={styles.right}>
          <ThemeToggle />
        </div>
      </NavBar>
      <div className={styles.balances}>
        <p style={{ paddingLeft: "0.5rem" }}>{name} (USD)</p>
        <h1 style={{ fontSize: "3rem" }}>
          ${usdBalance < 10 && 0}
          {usdBalance.toFixed(2)}
        </h1>
        <p
          style={{ paddingLeft: "0.5rem", fontSize: "0.875rem", opacity: 0.7 }}
        >
          {balance + " " + symbol}
        </p>
      </div>
      <div>
        <Card>
          <span>$</span>
          <p>Deposit</p>
        </Card>
      </div>
    </main>
  );
}

export default Dashboard;
