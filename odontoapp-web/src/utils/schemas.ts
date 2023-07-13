import * as yup from "yup";

const signUpSchema = yup
  .object({
    name: yup.string().required(),
    cpf: yup
      .string()
      .matches(
        /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
        "Allowed 123.456.789-55"
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

const signInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const updateUserProfileSchema = yup.object({
  user_address: yup.string(),
  user_birth: yup.string(),
  user_company: yup.string(),
  user_cpf: yup.string(),
  user_email: yup.string().email(),
  user_confirm_email: yup
    .string()
    .email()
    .test("emails-match", "E-mails must match", function (value) {
      return this.parent.user_email === value;
    }),
  user_name: yup.string(),
  user_password: yup.string(),
  user_confirm_password: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.user_password === value;
    }),
  user_post: yup.string(),
  user_cro: yup.string(),
});

const updateCompanyProfileSchema = yup.object({
  company_name: yup.string(),
  company_cnpj: yup
    .string()
    .matches(
      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      "Allowed 12.345.678/0001-11"
    ),
  company_address: yup.string(),
  company_primary_email: yup.string().email(),
  company_secondary_email: yup
    .string()
    .email()
    .test(
      "company-emails-must-not-match",
      "Primary and secondary emails must be differents",
      function (value) {
        return this.parent.company_primary_email !== value || value === "";
      }
    ),
  company_cellphone: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/,
      "Allowed 55 11 9 9123-1234"
    ),
  company_phone: yup.string(),
  company_website: yup.string(),
});

const createPatientsSchema = yup.object({
  patient_name: yup.string().required(),
  patient_cellphone: yup
    .string()
    .matches(
      /^(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/,
      "Allowed 11 9 9123-1234"
    )
    .required(),
  patient_phone: yup.string(),
  patient_address: yup.string().required(),
  patient_email: yup.string().email().required(),
  patient_cpf: yup
    .string()
    .matches(
      /(^\d{3}[\.]?\d{3}[\.]?\d{3}[\-]?\d{2}$)|(^\d{2}[\.]?\d{3}[\.]?\d{3}[\/]?\d{4}[\-]?\d{2}$)/,
      "Allowed 123.456.789-55"
    )
    .required(),
  patient_birth: yup.string().required(),
  patient_zip: yup
    .string()
    .matches(/[0-9]{5}-?[\d]{3}/, "Allowed 12345-678")
    .required(),
  patient_sex: yup.string().oneOf(["M", "F", ""]).required(),
});

export {
  signUpSchema,
  signInSchema,
  updateUserProfileSchema,
  updateCompanyProfileSchema,
  createPatientsSchema,
};
