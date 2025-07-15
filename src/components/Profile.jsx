import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Verified from "../assets/Verified";
import Highlight from "./Highlight";

const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1.25rem",
};

const imageWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "2px solid var(--accent-clr)",
};
const imageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
};

function Profile({ name, username, profilePicture, verification, membership }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ ...wrapperStyle }}>
      <div style={imageWrapperStyle}>
        <img
          src={profilePicture}
          alt={`${name}'s profile picture`}
          style={{
            ...imageStyle,
            border: `2px solid var(--${theme}-border-clr)`,
            transition: "border-color 0.3s ease-in-out",
          }}
        />
      </div>
      <div>
        <h2 style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {name?.split(" ").at(0)}{" "}
          <span style={{ transform: "translateY(0.25rem)" }}>
            {verification === "verified" ? (
              <Verified />
            ) : (
              <Highlight fontSize="0.75rem">unverified</Highlight>
            )}
          </span>
        </h2>
        <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ opacity: 0.7 }}>@{username}</span>
          <span style={{ color: "var(--accent-clr)" }}>
            {membership?.split("").at(0).toUpperCase() + membership?.slice(1)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Profile;
