const footerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  justifyContent: "center",
  alignItems: "center",
  paddingBlock: "1.25rem",
  width: "100%",
};

function Footer({ children }) {
  return <footer style={footerStyle}>{children}</footer>;
}

export default Footer;
