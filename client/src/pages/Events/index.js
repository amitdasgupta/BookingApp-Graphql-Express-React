import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Title from "../../components/Title";
import FormValidator from "../../services/validate";
import FormRules from "../../services/validateConfig/createform";
import { CREATE_EVENT_FORM, GET_EVENTS } from "../../graphql/eventsQuery";

const CreateEvent = (props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
  });
  const [errors, setError] = useState({});
  const onChange = ({ value, name }) => {
    setForm({ ...form, [name]: value });
  };

  const [
    createEvent,
    { loading: queryLoading, error: { message: graphqlError } = {} },
  ] = useMutation(CREATE_EVENT_FORM);

  const validator = new FormValidator(FormRules);
  const formSubmit = async () => {
    try {
      const validation = validator.validate({ ...form });
      if (!validation.isValid) {
        setError(validation);
        return;
      }
      await createEvent({
        variables: {
          eventInput: {
            title: form.title,
            description: form.description,
            price: parseFloat(form.price),
            date: new Date(form.date).toISOString(),
          },
        },
        update: (cache, { data: { createEvent } }) => {
          const allEvents = cache.readQuery({ query: GET_EVENTS });
          cache.writeQuery({
            query: GET_EVENTS,
            data: { events: [createEvent, ...allEvents.events] },
          });
        },
      });
      setForm({
        title: "",
        description: "",
        price: "",
        date: "",
      });
      setError({});
    } catch (error) {}
  };
  return (
    <div className="LoginForm">
      <Title title="Create Event" />
      <form>
        <Input
          placeholder="Title"
          type="text"
          name="title"
          label="Enter event title"
          onChange={onChange}
          error={errors && errors.title && errors.title.isInvalid}
          helperText={(errors && errors.title && errors.title.message) || ""}
          value={form.title}
        />
        <Input
          placeholder="Description"
          type="text"
          name="description"
          label="Enter event description"
          onChange={onChange}
          error={errors && errors.description && errors.description.isInvalid}
          helperText={
            (errors &&
              errors.description &&
              errors &&
              errors.description.message) ||
            ""
          }
          multi={true}
          value={form.description}
        />
        <Input
          placeholder="Price"
          type="text"
          name="price"
          label="Enter event price"
          onChange={onChange}
          error={errors && errors.price && errors.price.isInvalid}
          helperText={(errors && errors.price && errors.price.message) || ""}
          value={form.price}
        />
        <Input
          placeholder="Date"
          type="date"
          name="date"
          label="Enter event date"
          onChange={onChange}
          error={errors && errors.date && errors.date.isInvalid}
          helperText={(errors && errors.date && errors.date.message) || ""}
          value={form.date}
        />
        <Button
          label="Create Event"
          onClick={formSubmit}
          className="login-button"
          size="large"
        />
        {queryLoading && <p>Loading...</p>}
        {graphqlError && <p className="error">{graphqlError}</p>}
      </form>
    </div>
  );
};

export default CreateEvent;
