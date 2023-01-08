import React from "react";
import logo from "../../assets/images/logo.png";
import "./Header.less";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux";
import ColorButton from "../../UI/ColorButton";
import { logout } from "../../redux/userSlice";

const Header = () => {
  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);
  const dispatch = useAppDispatch();

  const onExitButton = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <div className="wrapper header__wrapper">
        <Link to="/" className="header__logo">
          <img className="header__image" src={logo} alt="logo" />
        </Link>
        <h1 className="header__title">Cloud Disk App</h1>

        <nav className="header__navbar">
          {!isAuth && (
            <Link to="/login" className="header__link">
              Войти
            </Link>
          )}
          {!isAuth && (
            <Link to="/register" className="header__link">
              Регистрация
            </Link>
          )}
          {isAuth && (
            <ColorButton onClick={onExitButton}>Выйти из профиля</ColorButton>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
