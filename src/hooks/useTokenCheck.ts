import jwt from "jsonwebtoken";
import { useMutation } from "@apollo/react-hooks";
import { LOG_USER_OUT } from "../queries/globalQueries";

export const useTokenCheck = () => {
  const token = localStorage.getItem("token");
  const secret = process.env.REACT_APP_JWT_SECRET!;
  const [logout] = useMutation(LOG_USER_OUT);
  if (token) {
    jwt.verify(token, secret, (error, _) => {
      if (error) {
        logout();
      }
    });
  }
  return null;
};
