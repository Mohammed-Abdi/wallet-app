import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <main className={styles.notFound}>
      <h1>Page Not Found :(</h1>
      <Link to="/">Go to homepage</Link>
    </main>
  );
}

export default NotFound;
