import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Title from "../../components/Title";
import FormValidator from "../../services/validate";
import FormRules from "../../services/validateConfig/signup";
import { withRouter } from "react-router-dom";

const SIGNNUP_FORM = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      email
    }
  }
`;

const Signup = (props) => {
  const [form, setForm] = useState({ email: "", password: "", repassword: "" });
  const [errors, setError] = useState({});
  const onChange = ({ value, name }) => {
    setForm({ ...form, [name]: value });
  };

  const [
    createUser,
    { loading: mutationLoading, error: { message: graphqlError } = {} },
  ] = useMutation(SIGNNUP_FORM);

  const formSubmit = async () => {
    try {
      const validation = validator.validate({ ...form });
      if (!validation.isValid) {
        setError({ ...validation });
        return;
      }

      setError({});

      await createUser({
        variables: {
          userInput: { email: form.email, password: form.password },
        },
      });

      props.history.push("/login");
    } catch (error) {}
  };

  const validator = new FormValidator(FormRules);

  return (
    <div className="LoginForm">
      <Title title="Signup" />
      <Input
        placeholder="Enter your email here."
        type="email"
        name="email"
        label="Enter Your Email"
        onChange={onChange}
        error={errors && errors.email && errors.email.isInvalid}
        helperText={(errors && errors.email && errors.email.message) || ""}
        placeholderImage="/assets/images/email.svg"
      />
      <Input
        placeholder="Enter your password here."
        type="password"
        name="password"
        label="Enter Your Password"
        onChange={onChange}
        error={errors && errors.password && errors.password.isInvalid}
        helperText={
          (errors && errors.password && errors.password.message) || ""
        }
        placeholderImage="/assets/images/lock.svg"
      />
      <Input
        placeholder="Confirm your password."
        type="password"
        name="repassword"
        label="Repeat password"
        onChange={onChange}
        error={errors && errors.repassword && errors.repassword.isInvalid}
        helperText={
          (errors && errors.repassword && errors.repassword.message) || ""
        }
        placeholderImage="/assets/images/lock.svg"
      />
      <Button
        label="Signup"
        onClick={formSubmit}
        className="login-button"
        size="medium"
      />
      {mutationLoading && <p>Loading...</p>}
      {graphqlError && <p className="error">{graphqlError}</p>}
    </div>
  );
};

export default withRouter(Signup);
