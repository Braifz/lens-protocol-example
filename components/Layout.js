import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <footer>esto es un footer</footer>
    </div>
  );
};

export default Layout;
