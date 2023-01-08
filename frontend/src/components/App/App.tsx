import "./App.less";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

function App() {
  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);

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
