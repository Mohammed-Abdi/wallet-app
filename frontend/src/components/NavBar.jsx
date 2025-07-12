const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  paddingBlock: "1.25rem",
};

function NavBar({ children }) {
  return <nav style={navbarStyle}>{children}</nav>;
}

export default NavBar;
