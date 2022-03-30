import { useState } from "react";
function AddUser() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const [userFormErrs, setUserFormErrs] = useState({
    emailErr: null,
    passwordErr: null
  });

  const handleFormChange = (event) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regexPassword=new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
    console.log(event.target.id, event.target.value);
    if (event.target.id === "email") {
      setUserForm({
        ...userForm,
        email: event.target.value,
      });
      setUserFormErrs({
        ...userFormErrs,
        emailErr:
          event.target.value.length === 0
            ? "This field is required"
            :regex.test(event.target.value) === false
              ? "this is not invalid Emails"
              : null,
      });
    } else if (event.target.id === "password") {
      setUserForm({
        ...userForm,
        password: event.target.value,
      });
      setUserFormErrs({
        ...userFormErrs,
        passwordErr:
          event.target.value.length === 0
            ? "This field is required"
            :regexPassword.test(event.target.value) === false
            ? "password should be complicated"
              : null,
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !userFormErrs.emailErr &&
      !userFormErrs.passwordErr
    ) {
      console.log(userForm);
    }
  };

  return (

    <form onSubmit={handleSubmitForm}>
      <h2>Login Form</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="text"
          className={`form-control ${userFormErrs.emailErr ? "border-danger" : ""
            }`}
          id="email"
          aria-describedby="emailHelp"
          value={userForm.email}
          onChange={handleFormChange}
        />
        <div id="emailHelp" className="form-text text-danger">
          {userFormErrs.emailErr}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          password
        </label>
        <input
          type="text"
          className="form-control"
          id="password"
          aria-describedby="passwordHelp"
          value={userForm.password}
          onChange={handleFormChange}
        />
        <div id="passwordHelp" className="form-text text-danger">
          {userFormErrs.passwordErr}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddUser;
