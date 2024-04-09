import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";

import css from "./ContactForm.module.css";

export default function ContactForm({ onAdd }) {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Name is required!"),
    number: Yup.string()
      .required("Phone number is required!")
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        "The phone number should be in the format: 123-45-67"
      ),
  });

  const nameFieldId = useId();
  const telFieldId = useId();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const id = nanoid();
        onAdd({ ...values, id }, actions);
      }}
    >
      <Form className={css.form}>
        <div className={css.fieldWrapper}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.fieldWrapper}>
          <label htmlFor={telFieldId}>Number</label>
          <Field
            className={css.field}
            type="tel"
            name="number"
            id={telFieldId}
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
