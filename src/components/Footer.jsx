const footerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBlock: "3rem",
  position: "absolute",
  width: "100%",
  bottom: 0,
  left: 0,
};

function Footer({ children }) {
  return <footer style={footerStyle}>{children}</footer>;
}

export default Footer;
