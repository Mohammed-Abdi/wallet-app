import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Settings.module.css";
import { AccountContext } from "../../context/AccountContext";
import SettingInput from "../../components/SettingInput";
import { formatDateTime } from "../../services/formatDateTime";
import ActionButton from "../../components/buttons/action-button/ActionButton";
import Loader from "../../components/Loader";

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accountStatus] = useState("");
  const [verification] = useState("");
  const [membership] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [createdAt] = useState("");
  const [lastLogin] = useState("");

  useEffect(() => {
    if (!user) return;

    const nameParts = user.personalInfo.name.split(" ");
    setFirstName(nameParts[0] || "");
    setLastName(nameParts.slice(1).join(" ") || "");
    setAge(user.personalInfo.age || "");
    setGender(user.personalInfo.gender || "");
    setUsername(user.account.username || "");
    setEmail(user.account.email || "");
    setPassword(user.account.password || "");
    setCity(user.location.city || "");
    setCountry(user.location.country || "");
  }, [user]);

  const hasChanges = useMemo(() => {
    if (!user) return false;

    if (username !== "" && username !== user.account.username) return true;
    else if (email !== "" && email !== user.account.email) return true;
    else if (password !== "" && password !== user.account.password) return true;
    else if (age !== "" && age !== user.personalInfo.age) return true;
    else if (gender !== "" && gender !== user.personalInfo.gender) return true;

    const originalFirstName = user.personalInfo.name.split(" ").at(0);
    if (firstName !== "" && firstName !== originalFirstName) return true;

    const originalLastName = user.personalInfo.name
      .split(" ")
      .slice(1)
      .join(" ");
    if (lastName !== "" && lastName !== originalLastName) return true;

    if (city !== "" && city !== user.location.city) return true;
    if (country !== "" && country !== user.location.country) return true;

    return false;
  }, [
    user,
    username,
    email,
    password,
    age,
    gender,
    firstName,
    lastName,
    city,
    country,
  ]);

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

  if (!user) return <Loader />;

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
