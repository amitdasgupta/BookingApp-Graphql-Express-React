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
    message: "Password is empty",
  },
];

export default FormRules;
