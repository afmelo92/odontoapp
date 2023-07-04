import { SignUpInputs } from "@/app/(auth)/signup/_components/SignUpForn";
import HttpClient from "./HttpClient";

const httpClient = new HttpClient("http://localhost:3333");

const signUpMutation = async ({
  name,
  email,
  cpf_cnpj,
  account_type,
  password,
  confirm_password,
}: SignUpInputs) => {
  return httpClient.post({
    path: "/users",
    options: {
      body: JSON.stringify({
        name,
        email,
        cpf_cnpj,
        account_type,
        password,
        confirm_password,
      }),
    },
  });
};

export { signUpMutation };
