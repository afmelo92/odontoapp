import { SignUpInputs } from "@/app/(auth)/signup/_components/SignUpForm";
import HttpClient from "./HttpClient";
import { UpdateUserProfileInputs } from "@/app/(dashboard)/profile/_components/Forms/UpdateUserProfile";
import { UpdateCompanyProfileInputs } from "@/app/(dashboard)/profile/_components/Forms/UpdateCompanyProfile";

const httpClient = new HttpClient("http://localhost:3333");

const signUpMutation = async ({
  name,
  email,
  cpf,
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
        cpf,
        account_type,
        password,
        confirm_password,
      }),
    },
  });
};

type CompleteUpdatProps = {
  user_id: string;
  user_token: string;
} & Partial<UpdateUserProfileInputs> &
  Partial<UpdateCompanyProfileInputs>;

const updateUserMutation = async ({
  user_name,
  user_email,
  user_address,
  user_birth,
  user_company,
  user_confirm_password,
  user_password,
  user_cpf,
  user_post,
  user_id,
  user_token,
  user_cro,
  company_name,
  company_address,
  company_cellphone,
  company_cnpj,
  company_phone,
  company_primary_email,
  company_secondary_email,
  company_website,
}: CompleteUpdatProps) => {
  return httpClient.put({
    path: `/users/${user_id}`,
    options: {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
      body: JSON.stringify({
        user_name,
        user_email,
        user_address,
        user_birth,
        user_company,
        user_confirm_password,
        user_password,
        user_cpf,
        user_post,
        user_cro,
        company_name,
        company_address,
        company_cellphone,
        company_cnpj,
        company_phone,
        company_primary_email,
        company_secondary_email,
        company_website,
      }),
    },
  });
};

export { signUpMutation, updateUserMutation };
