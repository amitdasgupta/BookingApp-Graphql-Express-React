import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../stylesheets/components/header.module.scss";
import cx from "classnames";
import PropTypes from "prop-types";
import { logOut } from "../../auth";
const Header = (props) => {
  const { className, isLoggedIn } = props;
  const _classname = cx(className, styles.main);
  const _mainClassname = cx({
    [styles.loggedInNav]: isLoggedIn,
  });
  return (
    <div className={_classname}>
      <h1>
        <NavLink to="/app">Event Manager</NavLink>
      </h1>
      <div>
        {(isLoggedIn && (
          <nav>
            <ul className={_mainClassname}>
              <li>
                <NavLink to="/app/events">Create Events</NavLink>
              </li>
              <li>
                <NavLink to="/app/bookings">All My Bookings</NavLink>
              </li>
              <li>
                <NavLink onClick={logOut} to="/login">
                  Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        )) || (
          <nav>
            <ul>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: "",
};

export default Header;
