import { useContext, useMemo, useState } from "react";
import ThemeToggle from "../../components/buttons/ThemeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from "./Dashboard.module.css";
import Profile from "../../components/Profile";
import { AccountContext } from "../../context/AccountContext";
import Card from "../../components/Card";
import Deposit from "../../assets/Deposit";
import Withdraw from "../../assets/Withdraw";
import Send from "../../assets/Send";
import Exchange from "../../assets/Exchange";
import History from "../../components/History";
import Transaction from "../../components/transaction/Transaction";
import { calcTotal } from "../../services/calcTotal";
import { formatDateTime } from "../../services/formatDateTime";
import { useLiveDate } from "../../hooks/useLiveDate";
import ActionButton from "../../components/buttons/action-button/ActionButton";

const switchStyle = {
  width: "10rem",
  paddingBlock: "0.5rem",
  border: "none",
  background: "none",
  color: "inherit",
  fontSize: "inherit",
  cursor: "pointer",
};

function Dashboard() {
  const [isOnActivities, setIsOnActivities] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [type, setType] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { accounts, accountDispatch } = useContext(AccountContext);

  const date = useLiveDate(60_000);

  const currentUser = useMemo(() => {
    return accounts.find(
      (account) => account.status.accountStatus === "active"
    );
  }, [accounts]);

  const totalBalance = useMemo(() => {
    return calcTotal(currentUser?.balances, currency);
  }, [currency, currentUser?.balances]);

  const sortedTransactions = useMemo(() => {
    return [...currentUser.transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [currentUser.transactions]);

  const sortedLogins = useMemo(() => {
    return [...currentUser.logins].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [currentUser.logins]);

  return (
    <main className={styles.dashboard}>
      <NavBar style={{ paddingBlock: "2rem" }}>
        <Link
          to={`/dashboard/${currentUser.personalInfo.name
            .split(" ")
            .join("-")
            .toLowerCase()}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
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
          <Link to="/">
            <ActionButton
              onClick={() => {
                accountDispatch({
                  type: "logout",
                  payload: currentUser?.account?.username?.toLowerCase(),
                });
              }}
            >
              Logout
            </ActionButton>
          </Link>
        </div>
      </NavBar>
      <div className={styles.balances}>
        <p style={{ opacity: 0.7 }}>Est total value</p>
        <div className={styles.total}>
          <h1 style={{ fontSize: "3rem" }}>
            {currency === "BTC"
              ? totalBalance?.toFixed(4)
              : totalBalance?.toFixed(2)}
          </h1>
          <select
            style={{
              color: `var(--${theme}-text-clr)`,
              backgroundColor: `var(--${theme}-background)`,
              transition:
                "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            }}
            name="currency"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="BNB">BNB</option>
            <option value="SOL">SOL</option>
          </select>
        </div>
        <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>
          Today is {formatDateTime(date)}
        </p>
      </div>
      <div className={styles.transactions}>
        <Card
          text="Deposit"
          icon={<Deposit />}
          onClick={() => setType("deposit")}
        />
        <Card
          text="Withdraw"
          icon={<Withdraw />}
          onClick={() => setType("withdraw")}
        />
        <Card text="Send" icon={<Send />} onClick={() => setType("send")} />
        <Card
          text="Convert"
          icon={<Exchange />}
          onClick={() => setType("convert")}
        />
      </div>

      <div className={styles.activity}>
        <div>
          <button
            style={{
              ...switchStyle,
              borderBottom: isOnActivities
                ? "2px solid var(--accent-clr)"
                : "none",
            }}
            onClick={() => setIsOnActivities(true)}
          >
            Activities
          </button>
          <button
            style={{
              ...switchStyle,
              borderBottom: !isOnActivities
                ? "2px solid var(--accent-clr)"
                : "none",
            }}
            onClick={() => setIsOnActivities(false)}
          >
            Logins
          </button>
        </div>
        {isOnActivities
          ? sortedTransactions.map((transaction) => (
              <History
                key={transaction.id}
                type={transaction.type}
                id={transaction.receiver}
                date={transaction.date}
                amount={transaction.amount}
                currency={transaction.currency}
                from={transaction.from}
                to={transaction.to}
              />
            ))
          : sortedLogins.map((login) => (
              <History
                key={login.date}
                status={login.status}
                date={login.date}
                location={login.location}
              />
            ))}
      </div>
      <Transaction
        user={currentUser}
        id={currentUser.id}
        type={type}
        setType={setType}
        balances={currentUser.balances}
      />
    </main>
  );
}

export default Dashboard;
