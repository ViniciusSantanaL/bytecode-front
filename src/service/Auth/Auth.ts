import { UserForm } from "../../pages/Login/form/UserForm";
import { http } from "../api";
import { TokenDTO } from "./TokenDTO";

export async function AuthService({ username, password }: UserForm) {
  return await http
    .post<TokenDTO>("auth", { userName: username, password: password })
    .then((response) => {
      return response.data
    }).catch((err) => {console.log(err)});
}
