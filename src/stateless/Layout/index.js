import Header from "../Header";
import "./index.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-root">
      <Header />
      <div className="children">
        {children}
      </div>
    </div>
  )
}

export default Layout;