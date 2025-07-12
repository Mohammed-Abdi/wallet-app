const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  paddingBlock: "1.25rem",
};

function NavBar({ children, style }) {
  return <nav style={{ ...navbarStyle, ...style }}>{children}</nav>;
}

export default NavBar;
