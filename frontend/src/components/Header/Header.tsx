import React from "react";
import logo from "../../assets/images/logo.png";
import "./Header.less";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="wrapper header__wrapper">
        <Link to="/" className="header__logo">
          <img className="header__image" src={logo} alt="logo" />
        </Link>
        <h1 className="header__title">Cloud Disk App</h1>
        <nav className="header__navbar">
          <Link to="/login" className="header__link">
            Войти
          </Link>
          <Link to="/register" className="header__link">
            Регистрация
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
