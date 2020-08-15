import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Title from "../../components/Title";
import FormValidator from "../../services/validate";
import FormRules from "../../services/validateConfig/login";
import { logIn } from "../../auth";

const LOGIN_FORM = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authToken
      userId
    }
  }
`;

const Login = (props) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setError] = useState({});
  const onChange = ({ value, name }) => {
    setForm({ ...form, [name]: value });
  };

  const [
    login,
    {
      loading: queryLoading,
      data: { login: { authToken } = {} } = {},
      error: { message: graphqlError } = {},
    },
  ] = useLazyQuery(LOGIN_FORM);

  const validator = new FormValidator(FormRules);
  const formSubmit = async () => {
    try {
      const validation = validator.validate({ ...form });
      if (!validation.isValid) {
        setError(validation);
        return;
      }

      await login({
        variables: {
          email: form.email,
          password: form.password,
        },
      });
      setError({});
    } catch (error) {}
  };

  if (authToken) {
    logIn(authToken);
  }
  return (
    <div className="LoginForm">
      <Title title="Login" />
      <form>
        <Input
          placeholder="Enter your email here"
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
        <Button
          label="Login"
          onClick={formSubmit}
          className="login-button"
          size="medium"
        />
        {queryLoading && <p>Loading...</p>}
        {graphqlError && <p className="error">{graphqlError}</p>}
      </form>
    </div>
  );
};

export default Login;
