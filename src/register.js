import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";





function AddNewUser() {
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setUserForm({ ...userForm, showPassword: !userForm.showPassword });
  };
  

  const [userFormErrs, setUserFormErrs] = useState({
    firstNameErr: null,
    lastNameErr:null,
    emailErr: null,
    passwordErr: null,
  });

  const handleFormChange = (event) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regexPassword=new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
    
    console.log(event.target.id, event.target.value);
    if (event.target.id === "firstName") {
      setUserForm({
        ...userForm,
        firstName: event.target.value,
      });
      setUserFormErrs({
        ...userFormErrs,
        firstNameErr:
          event.target.value.length === 0
            ? "This field is required"
            : event.target.value.length < 3
            ? "Min. length is 3 characters"
            : null,
      });
    } else if (event.target.id === "email") {
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
    }else if (event.target.id === "lastName") {
        setUserForm({
          ...userForm,
          lastName: event.target.value,
        });
        setUserFormErrs({
          ...userFormErrs,
          lastNameErr:
            event.target.value.length === 0
              ? "This field is required"
              : event.target.value.length < 3
              ? "Last name should be more than 3 letters"
              : null,
        });
      } 
    else {
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
      !userFormErrs.firstNameErr &&
      !userFormErrs.emailErr &&
      !userFormErrs.passwordErr
    ) {
      console.log(userForm);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
        <h2>Register Form</h2>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          firstName
        </label>
        <input
          type="text"
          className={`form-control ${
            userFormErrs.firstNameErr ? "border-danger" : ""
          }`}
          id="firstName"
          aria-describedby="firstNameHelp"
          value={userForm.firstName}
          onChange={handleFormChange}
        />
        <div id="firstNameHelp" className="form-text text-danger">
          {userFormErrs.firstNameErr}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          lastName
        </label>
        <input
          type="text"
          className={`form-control ${
            userFormErrs.lastNameErr ? "border-danger" : ""
          }`}
          id="lastName"
          aria-describedby="lastNameHelp"
          value={userForm.lastName}
          onChange={handleFormChange}
        />
        <div id="lastNameHelp" className="form-text text-danger">
          {userFormErrs.lastNameErr}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="text"
          className="form-control"
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
        <Input
        type={userForm.showPassword ? "text" : "password"}
          className="form-control"
          id="password"
          aria-describedby="passwordHelp"
          value={userForm.password}
          onChange={handleFormChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleFormChange}
              >
                {userForm.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
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

export default AddNewUser;
