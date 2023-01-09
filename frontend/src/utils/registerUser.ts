import axios from "axios";
import getErrorMessage from "../utils/getErrorMessage";

const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      { email, password }
    );

    console.log(response.data.message);
  } catch (err) {
    console.log(getErrorMessage(err));
  }
};

export default registerUser;
