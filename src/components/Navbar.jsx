import PropTypes from "prop-types";
import Logo from "./Logo";
import Search from "./Search";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

Navbar.propTypes = {
  movies: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default Navbar;
