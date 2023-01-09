import "./App.less";
import React from "react";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux";
import { authUser } from "../../redux/userSlice";

function App() {
  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(authUser());
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/register" element={!isAuth && <Register />} />
        <Route path="/login" element={!isAuth && <Login />} />
      </Routes>
    </div>
  );
}

export default App;
