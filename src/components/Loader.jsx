import Spinner from "../assets/Spinner";

const loaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100%",
  backdropFilter: "blur(20px)",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10,
};

function Loader() {
  return (
    <div style={loaderStyle}>
      <Spinner />
    </div>
  );
}

export default Loader;
