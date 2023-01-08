import React from "react";
import { TextField } from "@mui/material";
import ColorButton from "../../UI/ColorButton";
import { fetchUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();

  const userLogin = () => {
    const data = { email, password };
    dispatch(fetchUser(data));
  };

  return (
    <div className="wrapper sign">
      <form className="sign__form">
        <h2 className="sign__title">Логин</h2>
        <TextField
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          id="standard-basic"
          label="Введите email.."
          variant="standard"
        />
        <TextField
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
          id="standard-basic"
          label="Введите пароль.."
          variant="standard"
          type="password"
        />
        <ColorButton onClick={userLogin} variant="contained">
          Авторизоваться
        </ColorButton>
      </form>
    </div>
  );
};

export default Login;
