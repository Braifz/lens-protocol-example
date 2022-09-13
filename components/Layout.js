import Header from "./Header";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer className={styles.footer}>esto es un footer</footer>
    </div>
  );
};

export default Layout;
