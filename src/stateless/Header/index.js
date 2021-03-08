import logo from "./logo.png";
import "./index.css";

const Header = () => {
  return <div className="header-root">
    <img className="logo" src={logo} alt="Logo" />
  </div>
}

export default Header;