import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-5 min-h-full">{children}</main>
      <footer>esto es un footer</footer>
    </div>
  );
};

export default Layout;
