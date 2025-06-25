import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
// import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  city: "",
  comments: "",
  address: "",

  //nested object
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validate = (values) => {
  //values contain three properties name, email,city and
  // err obj should be similar to that values obj
  //errors.name, errors.email, errors.city
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!values.email.includes("@")) {
    errors.email = "Invalid email";
  }

  if (!values.city) {
    errors.city = "Required";
  }
  return errors;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid Email").required("Required!"),
  city: Yup.string().required("Required!"),
});

//field-level validation
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};
const App = () => {
  return (
    <Formik
      //pass different props to the formik component as same as passed in useFormik hook
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(formik) => (
        <>
          {/* console.log("Form errors", formik.errors); */}
          {console.log("visited field", formik.touched)}
          {/* touched object gives information whether field visited or not */}
          <Form
            className="formik"
            //remove onSubmit prop that automatically hooks into formik handle sunbmit method
            // onSubmit={formik.handleSubmit}
          >
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.name}
                //replace above 3 lines of code with single call

                // {...formik.getFieldProps("name")}
                //remove getFieldProps when using Field
              />
              {/* {formik.touched.name && formik.errors.name ? (
                <div className="err">{formik.errors.name}</div>
              ) : null} */}

              <ErrorMessage name="name" component="div" />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.email}

                //replace above 3 lines of code with single call

                // {...formik.getFieldProps("email")}
                // remove getFieldProps when using Field
              />
              {/* {formik.touched.email && formik.errors.email ? (
                <div className="err">{formik.errors.email}</div>
              ) : null} */}

              <ErrorMessage name="email">
                {(errMsg) => <div className="err">{errMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="city">City</label>
              <Field
                type="text"
                id="city"
                name="city"
                placeholder="City Name"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.city}
                //replace above 3 lines of code with single call

                // {...formik.getFieldProps("city")}
                // remove getFieldProps when using Field
              />
              {/* {formik.touched.city && formik.errors.city ? (
                <div className="err">{formik.errors.city}</div>
              ) : null} */}

              <ErrorMessage name="city" component="div" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>

              <FastField name="address">
                {(props) => {
                  console.log("field render");
                  const { field, form, meta } = props;
                  console.log("render props", props);

                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook Profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter Profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="Phone-number">Primary Phone number</label>
              <Field type="phone" id="primaryph" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="Phone-number">Secondary Phone number</label>
              <Field type="phone" id="primarysec" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of Phone Numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  // console.log("FieldArrayProps is", fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  console.log("Form errors", form.errors);
                  return (
                    <div>
                      {phNumbers.map((x, i) => (
                        <div key={i}>
                          <Field name={`phNumbers[${i}]`} />
                          {i > 0 && (
                            <button type="button" onClick={() => remove(i)}>
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <button type="submit">submit</button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default App;
