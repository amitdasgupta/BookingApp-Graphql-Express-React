const descriptionLength = (description) => description.length > 50;
const FormRules = [
  {
    field: "title",
    method: "isEmpty",
    validWhen: false,
    message: "Title is required.",
  },
  {
    field: "description",
    method: "isEmpty",
    validWhen: false,
    message: "Description is required.",
  },
  {
    field: "price",
    method: "isEmpty",
    validWhen: false,
    message: "Price is required.",
  },
  {
    field: "date",
    method: "isEmpty",
    validWhen: false,
    message: "Date is required.",
  },
  {
    field: "description",
    method: descriptionLength,
    validWhen: true,
    message: "Description must be atleast 25 charcters long.",
  },
];

export default FormRules;
