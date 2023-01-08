import axios from "axios";
import getErrorMessage from "../utils/getErrorMessage";

export const registerUser = async (email: string, password: string) => {
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

// export const loginUser = async (email: string, password: string) => {
//   try {
//     const response = await axios.post("http://localhost:5000/api/auth/login", {
//       email,
//       password,
//     });
//
//     console.log(response.data.message);
//   } catch (err) {
//     console.log(getErrorMessage(err));
//   }
// };
