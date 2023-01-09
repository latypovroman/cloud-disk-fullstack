import React from "react";
import "./Register.less";
import { TextField } from "@mui/material";
import ColorButton from "../../UI/ColorButton";
import registerUser from "../../utils/registerUser";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="wrapper sign">
      <form className="sign__form">
        <h2 className="sign__title">Регистрация</h2>
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
        <ColorButton
          onClick={() => registerUser(email, password)}
          variant="contained"
        >
          Зарегистрироваться
        </ColorButton>
      </form>
    </div>
  );
};

export default Register;
