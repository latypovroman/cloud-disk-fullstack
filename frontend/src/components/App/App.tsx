import "./App.less";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/register" element={<Register />} />
        {/*<Route path="/login" element={<Login />} />*/}
      </Routes>
    </div>
  );
}

export default App;
