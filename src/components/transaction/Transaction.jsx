import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ActionButton from "../buttons/action-button/ActionButton";
import SecondaryButton from "../buttons/secondary-button/SecondaryButton";
import styles from "./Transaction.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { AccountContext } from "../../context/AccountContext";
import { nanoid } from "nanoid";
import Contacts from "../Contacts";
import { convertToUSD } from "../../services/convertToUSD";
import { convertTo } from "../../services/convertTo";
import Highlight from "../Highlight";
import Bank from "../../assets/Bank";
import Checked from "../../assets/Checked";
import PasteButton from "../../assets/PasteButton";

const currencyArray = ["USD", "BTC", "SOL", "ETH", "BNB"];

function Transaction({ user, id, type, balances, setType }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const numericAmount = Number(Number(amount).toFixed(2));
  const amountInput = useRef();

  useEffect(() => {
    if (type && amountInput.current) {
      amountInput.current.focus();
    }
  }, [type]);

  const filteredCurrencyArray = useMemo(() => {
    return currencyArray.filter((cur) => cur !== currency);
  }, [currency]);

  const currentBalance = useMemo(() => {
    return balances?.find((blc) => blc.symbol === currency)?.balance;
  }, [balances, currency]);

  const time = new Date().toISOString();

  const { accounts, accountDispatch } = useContext(AccountContext);
  const { theme } = useContext(ThemeContext);

  let receiverFound = useMemo(() => {
    return accounts.some((account) => account.id === receiver);
  }, [accounts, receiver]);

  const receiverName = useMemo(() => {
    return accounts.find((account) => account.id === receiver)?.personalInfo
      .name;
  }, [accounts, receiver]);

  const inputStyle = {
    border: `2px solid var(--${theme}-border-clr)`,
    backgroundColor: `var(--${theme}-wrapper-clr)`,
    color: "inherit",
    width: "100%",
  };

  useEffect(() => {
    if (type === "deposit") {
      setSuccessMessage(
        `You successfully deposited ${amount} ${currency} ${
          currency !== "USD" && currency !== "USDT"
            ? `($${convertToUSD(amount, currency).toFixed(2)})`
            : ""
        } into your wallet`
      );
    } else if (type === "withdraw") {
      setSuccessMessage(
        `You successfully withdrew ${amount} ${currency} ${
          currency !== "USD" && currency !== "USDT"
            ? `($${convertToUSD(amount, currency).toFixed(2)})`
            : ""
        } from your wallet`
      );
    } else if (type === "send") {
      setSuccessMessage(
        `You successfully sent ${amount} ${currency} ${
          currency !== "USD" && currency !== "USDT"
            ? `($${convertToUSD(amount, currency).toFixed(2)})`
            : ""
        } to ${receiverName}`
      );
    } else if (type === "convert") {
      setSuccessMessage(
        `You successfully converted ${amount} ${currency} to ${convertTo(
          amount,
          currency,
          toCurrency
        )} ${toCurrency}`
      );
    } else {
      setSuccessMessage("");
    }
  }, [type, receiverName, amount, currency, id, toCurrency, setSuccessMessage]);

  useEffect(() => {
    if (
      type?.toLowerCase() === "withdraw" ||
      type?.toLowerCase() === "send" ||
      type?.toLowerCase() === "convert"
    ) {
      if (numericAmount < currentBalance) setMessage("");
      if (currentBalance < numericAmount) setMessage("Insufficient balance");
    }
  }, [currentBalance, amount, type, numericAmount]);

  function handleTransaction(e) {
    e.preventDefault();
    const numericAmount = Number(Number(amount).toFixed(2));
    if (type?.toLowerCase() === "deposit") {
      accountDispatch({
        type: "deposit",
        payload: { id, amount: numericAmount, currency },
      });
      accountDispatch({
        type: "logBalanceTransaction",
        payload: {
          id,
          transactionId: nanoid(),
          type,
          amount: numericAmount,
          currency,
          date: time,
        },
      });
      setIsSuccessful(true);
      setCurrency("USD");
    }
    if (type?.toLowerCase() === "withdraw") {
      if (currentBalance > numericAmount) {
        accountDispatch({
          type: "withdraw",
          payload: { id, amount: numericAmount, currency },
        });
        accountDispatch({
          type: "logBalanceTransaction",
          payload: {
            id,
            transactionId: nanoid(),
            type,
            amount: numericAmount,
            currency,
            date: time,
          },
        });
        setIsSuccessful(true);
      }
    }
    if (type?.toLowerCase() === "send") {
      accountDispatch({
        type: "send",
        payload: { id, receiver, amount: numericAmount, currency, date: time },
      });
      accountDispatch({
        type: "withdraw",
        payload: { id, amount: numericAmount, currency },
      });
      accountDispatch({
        type: "logTransferTransaction",
        payload: {
          id,
          transactionId: nanoid(),
          type,
          receiverName,
          amount: numericAmount,
          currency,
          date: time,
        },
      });
      setIsSuccessful(true);
      setReceiver("");
    }
    if (type?.toLowerCase() === "convert") {
      const convertedAmount = Number(convertTo(amount, currency, toCurrency));

      if (currentBalance > numericAmount) {
        accountDispatch({
          type: "convert",
          payload: {
            id,
            amount: { from: numericAmount, to: convertedAmount },
            currency: { from: currency, to: toCurrency },
          },
        });

        accountDispatch({
          type: "logConversionTransaction",
          payload: {
            id,
            transactionId: nanoid(),
            type: "convert",
            from: {
              amount: numericAmount,
              currency,
            },
            to: {
              amount: convertedAmount,
              currency: toCurrency,
            },
            date: time,
          },
        });
        setIsSuccessful(true);
      }
    }
    setMessage("");
  }

  return type ? (
    <main className={styles.main}>
      {isSuccessful ? (
        <div
          className={styles.successNotification}
          style={{ backgroundColor: `var(--dark-wrapper-clr)` }}
        >
          <Checked
            width={100}
            height={100}
            strokeWidth={1}
            color="var(--accent-clr)"
          />
          <p>{successMessage}</p>
          <ActionButton
            style={{
              width: "100%",
              backgroundColor: "var(--accent-clr)",
              color: "var(--light-text-clr)",
            }}
            onClick={() => {
              setType(null);
              setIsSuccessful(false);
              setAmount("");
              setCurrency("USD");
              setToCurrency("BTC");
            }}
          >
            OK
          </ActionButton>
        </div>
      ) : (
        <form
          onSubmit={handleTransaction}
          className={styles.wrapper}
          style={{
            color: `var(--${theme}-text-clr)`,
            transition:
              "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out",
          }}
        >
          <Highlight>
            <p
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Bank /> Balance:{" "}
              <span
                style={{
                  fontWeight: currency === "USD" ? 500 : 400,
                  color:
                    currency === "USD"
                      ? currentBalance < 1
                        ? "red"
                        : "var(--accent-clr)"
                      : "",
                }}
              >
                {currency === "USD"
                  ? `$${currentBalance.toFixed(2)}`
                  : `${currentBalance} ${currency} ($${convertToUSD(
                      currentBalance,
                      currency
                    ).toFixed(2)})`}
              </span>
            </p>
          </Highlight>

          {/* for deposit and withdraw */}
          <div style={{ display: "flex", gap: "0.5rem", position: "relative" }}>
            <input
              ref={amountInput}
              type="text"
              placeholder="Enter amount..."
              style={inputStyle}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              name="currency"
              id="currencyDropDown"
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "0.75rem",
                width: "25%",
                backgroundColor: `var(--${theme}-wrapper-clr)`,
                color: `var(--${theme}-text-clr)`,
              }}
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                setAmount("");
              }}
            >
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="BNB">BNB</option>
              <option value="SOL">SOL</option>
            </select>
          </div>

          {message && (
            <p style={{ fontSize: "0.875rem", color: "red", fontWeight: 500 }}>
              {message}
            </p>
          )}

          {/* for conversion */}
          {type?.toLowerCase() === "convert" && (
            <div
              style={{ display: "flex", gap: "0.5rem", position: "relative" }}
            >
              <input
                type="text"
                placeholder="Enter amount..."
                style={{ ...inputStyle, background: "none", border: "none" }}
                value={
                  amount
                    ? `${convertTo(amount, currency, toCurrency)} ${toCurrency}`
                    : "Let see what you got"
                }
                onChange={(e) => setToCurrency(e.target.value)}
              />
              <select
                name="currency"
                id="currency"
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "0.75rem",
                  width: "25%",
                  backgroundColor: `var(--${theme}-background)`,
                  color: `var(--${theme}-text-clr)`,
                }}
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {filteredCurrencyArray?.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* for send */}
          {type?.toLowerCase() === "send" && (
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Enter receivers ID..."
                style={inputStyle}
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
              {!receiver && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "0.5rem",
                    transform: "translateY(-30%)",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    try {
                      const paste = await navigator.clipboard.readText();
                      setReceiver(paste);
                    } catch (error) {
                      console.error("Clipboard read failed:", error.message);
                    }
                  }}
                >
                  <PasteButton style={{ opacity: 0.7 }} />
                </div>
              )}
            </div>
          )}

          {receiver ? (
            receiverFound ? (
              <p
                style={{ color: "var(--accent-clr)", fontWeight: 500 }}
              >{`Receiver: ${receiverName}`}</p>
            ) : (
              <p style={{ color: "red", fontWeight: 500 }}>Invalid address</p>
            )
          ) : (
            ""
          )}

          <div className={styles.buttons}>
            <ActionButton
              style={{
                width: "100%",
                borderRadius: "0.25rem",
                paddingBlock: "0.75rem",
              }}
              onClick={handleTransaction}
            >
              {type?.split("").at(0).toUpperCase() + type?.slice(1)}
            </ActionButton>
            <SecondaryButton
              style={{
                color: `var(--${theme}-text-clr)`,
                width: "100%",
                borderRadius: "0.25rem",
                paddingBlock: "0.75rem",
              }}
              onClick={() => {
                setType(null);
                setMessage("");
                setReceiver("");
              }}
            >
              Cancel
            </SecondaryButton>
          </div>

          {type?.toLowerCase() === "send" &&
            user.account.username === "guest_user" && (
              <div>
                <p>Select a contact to paste their ID</p>
                {accounts
                  .filter(
                    (account) => account.status.accountStatus === "contacts"
                  )
                  .map((account) => (
                    <Contacts
                      key={account.id}
                      name={account.personalInfo.name}
                      username={account.account.username}
                      profilePicture={account.personalInfo.profilePicture}
                      verification={account.status.verification}
                      membership={account.status.membership}
                      onClick={() => setReceiver(account.id)}
                    />
                  ))}
              </div>
            )}
        </form>
      )}
    </main>
  ) : (
    ""
  );
}

export default Transaction;
