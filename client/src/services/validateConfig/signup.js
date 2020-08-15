const passwordMatch = (repassword, form) => form.password === repassword;

const FormRules = [
  {
    field: "email",
    method: "isEmpty",
    validWhen: false,
    message: "Email is required.",
  },
  {
    field: "email",
    method: "isEmail",
    validWhen: true,
    message: "That is not a valid email.",
  },
  {
    field: "password",
    method: "isEmpty",
    validWhen: false,
    message: "Password is required.",
  },
  {
    field: "password",
    method: "matches",
    args: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/],
    validWhen: true,
    message: "Password must be 8 digits and alphanumeric.",
  },
  {
    field: "repassword",
    method: "isEmpty",
    validWhen: false,
    message: "Password confirmation is required.",
  },
  {
    field: "repassword",
    method: passwordMatch,
    validWhen: true,
    message: "Password did not match.",
  },
];

export default FormRules;
