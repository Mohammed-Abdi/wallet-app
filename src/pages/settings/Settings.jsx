import { useContext, useMemo, useRef, useState } from "react";
import styles from "./Settings.module.css";
import { AccountContext } from "../../context/AccountContext";
import SettingInput from "../../components/SettingInput";
import { formatDateTime } from "../../services/formatDateTime";
import ActionButton from "../../components/buttons/action-button/ActionButton";

const imageWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBlock: "2rem",
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  border: "2px solid var(--accent-clr)",
};
const imageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
};

function Settings() {
  const { accounts, accountDispatch } = useContext(AccountContext);

  const user = useMemo(() => {
    return accounts.find(
      (account) => account.status.accountStatus === "active"
    );
  }, [accounts]);

  const amongUsPfp = useRef(
    `profile-picture/among-us-${Math.floor(Math.random() * 8) + 1}.webp`
  );

  const profilePicture = user?.personalInfo.profilePicture;

  const [firstName, setFirstName] = useState(
    user?.personalInfo.name.split(" ").at(0) || ""
  );
  const [lastName, setLastName] = useState(
    user?.personalInfo.name.split(" ").at(1) || ""
  );
  const [age, setAge] = useState(user?.personalInfo.age || "");
  const [gender, setGender] = useState(user?.personalInfo.gender || "");

  const [username, setUsername] = useState(user?.account.username || "");
  const [email, setEmail] = useState(user?.account.email || "");
  const [password, setPassword] = useState(user?.account.password || "");

  const [accountStatus] = useState(user?.status.accountStatus || "");
  const [verification] = useState(user?.status.verification || "");
  const [membership] = useState(user?.status.membership || "");

  const [city, setCity] = useState(user?.location.city || "");
  const [country, setCountry] = useState(user?.location.country || "");

  const [createdAt] = useState(user?.timestamps.createdAt || "");
  const [lastLogin] = useState(user?.timestamps.lastLogin || "");

  const hasChanges =
    username !== user?.account.username ||
    email !== user?.account.email ||
    password !== user?.account.password ||
    age !== user?.personalInfo.age ||
    gender !== user?.personalInfo.gender ||
    firstName !== user?.personalInfo.name?.split(" ").at(0) ||
    lastName !== user?.personalInfo.name?.split(" ").at(1) ||
    city !== user?.location.city ||
    country !== user?.location.country;

  function handleChanges() {
    if (username !== user?.account.username) {
      accountDispatch({
        type: "changeUsername",
        payload: { id: user?.id, username },
      });
    }

    if (email !== user?.account.email) {
      accountDispatch({
        type: "changeEmail",
        payload: { id: user?.id, email },
      });
    }

    if (password !== user?.account.password) {
      accountDispatch({
        type: "changePassword",
        payload: { id: user?.id, password },
      });
    }

    if (age !== user?.personalInfo.age) {
      accountDispatch({
        type: "changeAge",
        payload: { id: user?.id, age: Number(age) },
      });
    }

    if (gender !== user?.personalInfo.gender) {
      accountDispatch({
        type: "changeGender",
        payload: { id: user?.id, gender },
      });
    }

    const originalFirst = user?.personalInfo.name?.split(" ").at(0) || "";
    const originalLast = user?.personalInfo.name?.split(" ").at(1) || "";

    if (firstName !== originalFirst || lastName !== originalLast) {
      const fullName = `${firstName} ${lastName}`.trim();
      accountDispatch({
        type: "changeFullName",
        payload: { id: user?.id, name: fullName },
      });
    }

    if (city !== user?.location.city) {
      accountDispatch({
        type: "changeCity",
        payload: { id: user?.id, city },
      });
    }

    if (country !== user?.location.country) {
      accountDispatch({
        type: "changeCountry",
        payload: { id: user?.id, country },
      });
    }
  }

  return (
    <main className={styles.settings}>
      <div className={styles.wrapper}>
        <div style={imageWrapperStyle}>
          <img
            style={imageStyle}
            src={profilePicture ? profilePicture : amongUsPfp.current}
            alt={`${user?.personalInfo.name}'s profile picture`}
          />
        </div>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <div
            className={styles.InputsWrapper}
            style={{
              display: "flex",
              gap: "1.25rem",
              flexDirection: "column",
            }}
          >
            <section>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Name:</span>
                <SettingInput
                  value={firstName}
                  setValue={setFirstName}
                  style={{ width: "8.25rem" }}
                  canChange={true}
                />
                <SettingInput
                  value={lastName}
                  setValue={setLastName}
                  style={{ width: "8.25rem" }}
                  canChange={true}
                />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Age:</span>
                <SettingInput
                  value={age}
                  setValue={setAge}
                  style={{ width: "5rem" }}
                  canChange={true}
                />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Gender:</span>
                <SettingInput
                  value={gender}
                  setValue={setGender}
                  style={{ width: "7rem" }}
                  canChange={true}
                />
              </article>
            </section>
            <section>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Username:</span>
                <SettingInput
                  value={username}
                  setValue={setUsername}
                  style={{ width: "8.25rem" }}
                  canChange={true}
                />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Email:</span>
                <SettingInput
                  value={email}
                  setValue={setEmail}
                  canChange={true}
                />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>password:</span>
                <SettingInput
                  value={password}
                  setValue={setPassword}
                  style={{ width: "8.25rem" }}
                  canChange={true}
                />
              </article>
            </section>
          </div>
          <div
            className={styles.InputsWrapper}
            style={{
              display: "flex",
              gap: "1.25rem",
              flexDirection: "column",
            }}
          >
            <section>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Verification:</span>
                <SettingInput value={verification} />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Membership:</span>
                <SettingInput value={membership} />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Status:</span>
                <SettingInput value={accountStatus} />
              </article>
            </section>
            <section>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Address:</span>
                <SettingInput
                  value={city}
                  setValue={setCity}
                  style={{ width: "8.25rem" }}
                  canChange={true}
                />
                <SettingInput
                  value={country}
                  setValue={setCountry}
                  style={{ width: "8.25rem" }}
                  canChange={true}
                />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Joined on:</span>
                <SettingInput value={formatDateTime(createdAt)} />
              </article>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span>Last login:</span>
                <SettingInput value={formatDateTime(lastLogin)} />
              </article>
            </section>
          </div>
        </div>
      </div>
      {hasChanges && (
        <ActionButton onClick={handleChanges}>Apply changes</ActionButton>
      )}
    </main>
  );
}

export default Settings;
