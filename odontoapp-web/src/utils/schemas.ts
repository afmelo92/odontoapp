import * as yup from "yup";

const signUpSchema = yup
  .object({
    name: yup.string().required(),
    cpf_cnpj: yup
      .string()
      .matches(
        /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
        "Allowed 123.456.789-55 or 11.222.333/0001-55"
      )
      .required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
    account_type: yup
      .number()
      .oneOf([1, 2], "Only availables options allowed")
      .required(),
  })
  .required();

export { signUpSchema };
