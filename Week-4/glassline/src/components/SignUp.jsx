import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.firstName) {
      errors.firstName = "First name is required.";
    }
    if (!formValues.lastName) {
      errors.lastName = "Last name is required.";
    }
    if (!formValues.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formValues.password) {
      errors.password = "Password is required.";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully:", formValues);
      // Proceed with form submission (API call, etc.)
      postFormData();

    }
  };

  const postFormData = async () => {
    const data = await fetch("http://localhost:5000/users",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
     },
     body: JSON.stringify(formValues),
    });
    const dataJson = await data.json();
    navigate("/login")
  }

  return (
    <section className="text-center text-lg-start">
      <div className="container py-4">
        <div className="row g-0 justify-content-center align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right bg-body-tertiary"
              style={{ backdropFilter: 'blur(30px)' }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className={`form-control ${formErrors.firstName ? "is-invalid" : ""}`}
                          value={formValues.firstName}
                          onChange={handleInputChange}
                        />
                        <label className="form-label" htmlFor="firstName">
                          First name
                        </label>
                        {formErrors.firstName && (
                          <div className="invalid-feedback">
                            {formErrors.firstName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className={`form-control ${formErrors.lastName ? "is-invalid" : ""}`}
                          value={formValues.lastName}
                          onChange={handleInputChange}
                        />
                        <label className="form-label" htmlFor="lastName">
                          Last name
                        </label>
                        {formErrors.lastName && (
                          <div className="invalid-feedback">
                            {formErrors.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    {formErrors.email && (
                      <div className="invalid-feedback">
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                      value={formValues.password}
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    {formErrors.password && (
                      <div className="invalid-feedback">
                        {formErrors.password}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default SignUp;
