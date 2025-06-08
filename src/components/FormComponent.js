import React from "react";

const emailValidator =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const passwordValidator =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharRegex = /^\d{12}$/;

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      showPassword: false,
      showPasswordConfirmation: false,
      countryCode: "+91",
      phoneNo: "",
      country: "",
      city: "",
      panNo: "",
      aadharNo: "",

      firstNameError: "",
      lastNameError: "",
      userNameError: "",
      emailAddressError: "",
      passwordError: "",
      passwordConfirmationError: "",
      countryCodeError: "",
      PhoneNoError: "",
      countryError: "",
      cityError: "",
      panNoError: "",
      aadharNoError: "",

      isFormSubmitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleBlur(event) {
    this.validateField(event.target.name);
  }

  handleSubmit(event) {
    event.preventDefault();
    const fields = [
      "firstName",
      "lastName",
      "userName",
      "emailAddress",
      "password",
      "passwordConfirmation",
      "countryCode",
      "phoneNo",
      "country",
      "city",
      "panNo",
      "aadharNo",
    ];

    let isValid = true;
    fields.forEach((field) => {
      isValid = this.validateField(field) && isValid;
    });

    this.setState({ isFormSubmitted: isValid });
  }

  toggleShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  toggleShowPasswordConfirmation = () => {
    this.setState((prevState) => ({
      showPasswordConfirmation: !prevState.showPasswordConfirmation,
    }));
  };

  validateField(name) {
    let isValid = false;

    switch (name) {
      case "firstName":
        isValid = this.validateFirstName();
        break;
      case "lastName":
        isValid = this.validateLastName();
        break;
      case "userName":
        isValid = this.validateUsername();
        break;
      case "emailAddress":
        isValid = this.validateEmailAddress();
        break;
      case "password":
        isValid = this.validatePassword();
        break;
      case "passwordConfirmation":
        isValid = this.validatePasswordConfirmation();
        break;
      case "phoneNo":
        isValid = this.validatePhoneNo();
        break;
      case "countryCode":
        isValid = this.validateCountryCode();
        break;
      case "country":
        isValid = this.validateCountry();
        break;
      case "city":
        isValid = this.validateCity();
        break;
      case "panNo":
        isValid = this.validatePanNo();
        break;
      case "aadharNo":
        isValid = this.validateAadharNo();
        break;
      default:
        break;
    }

    return isValid;
  }

  validateFirstName() {
    const value = this.state.firstName.trim();
    const error = value ? "" : "First Name is required";
    this.setState({ firstNameError: error });
    return !error;
  }

  validateLastName() {
    const value = this.state.lastName.trim();
    const error = value ? "" : "Last Name is required";
    this.setState({ lastNameError: error });
    return !error;
  }

  validateUsername() {
    const value = this.state.userName.trim();
    const error = value ? "" : "User Name is required";
    this.setState({ userNameError: error });
    return !error;
  }

  validateEmailAddress() {
    const value = this.state.emailAddress.trim();
    let error = "";
    if (!value) error = "Email Address is required";
    else if (!emailValidator.test(value)) error = "Email is not valid";
    this.setState({ emailAddressError: error });
    return !error;
  }

  validatePassword() {
    const value = this.state.password.trim();
    let error = "";
    if (!value) error = "Password is required";
    else if (!passwordValidator.test(value))
      error =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
    this.setState({ passwordError: error });
    return !error;
  }

  validatePasswordConfirmation() {
    let error = "";
    if (this.state.password !== this.state.passwordConfirmation)
      error = "Password does not match Confirmation";
    this.setState({ passwordConfirmationError: error });
    return !error;
  }

  validatePhoneNo() {
    const phone = this.state.phoneNo.trim();
    let error = "";

    if (!phone) {
      error = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      error = "Phone Number must be exactly 10 digits";
    }

    this.setState({ PhoneNoError: error });
    return !error;
  }

  validateCountryCode() {
    const code = this.state.countryCode.trim();
    let error = "";
    if (!code) {
      error = "Country Code is required";
    }
    this.setState({ countryCodeError: error });
    return !error;
  }

  validateCountry() {
    const value = this.state.country.trim();
    const error = value ? "" : "Country is required";
    this.setState({ countryError: error });
    return !error;
  }

  validateCity() {
    const value = this.state.city.trim();
    const error = value ? "" : "City is required";
    this.setState({ cityError: error });
    return !error;
  }

  validatePanNo() {
    let panNoError = "";
    const value = this.state.panNo.trim().toUpperCase();
    if (!value) panNoError = "PAN Number is required";
    else if (!panRegex.test(value))
      panNoError = "PAN Number is invalid (format: ABCDE1234F)";
    this.setState({ panNoError });
    return panNoError === "";
  }

  validateAadharNo() {
    let aadharNoError = "";
    const value = this.state.aadharNo.trim();
    if (!value) aadharNoError = "Aadhar Number is required";
    else if (!aadharRegex.test(value))
      aadharNoError = "Aadhar Number must be exactly 12 digits";
    this.setState({ aadharNoError });
    return aadharNoError === "";
  }

  render() {
    return (
      <div className="main">
        <h1>SignUp Form</h1>
        {this.state.isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>Email Address: {this.state.emailAddress}</div>
            <div>UserName: {this.state.userName}</div>
            <div>Phone No. {this.state.phoneNo}</div>
            <div>Country: {this.state.country}</div>
            <div>City: {this.state.city}</div>
            <div>Pan No. {this.state.panNo}</div>
            <div>Aadhar No. {this.state.aadharNo}</div>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.firstNameError && (
              <div className="errorMsg">{this.state.firstNameError}</div>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.lastNameError && (
              <div className="errorMsg">{this.state.lastNameError}</div>
            )}

            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={this.state.userName}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.userNameError && (
              <div className="errorMsg">{this.state.userNameError}</div>
            )}

            <input
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              value={this.state.emailAddress}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.emailAddressError && (
              <div className="errorMsg">{this.state.emailAddressError}</div>
            )}

            <div className="password-container">
              <input
                type={this.state.showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
                style={{ paddingRight: "40px" }}
              />
              <button
                type="button"
                className="password-toggle-icon"
                onClick={this.toggleShowPassword}
              >
                <i
                  className={`fa ${
                    this.state.showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            <br />
            {this.state.passwordError && (
              <div className="errorMsg">{this.state.passwordError}</div>
            )}

            <div className="password-container">
              <input
                type={this.state.showPasswordConfirmation ? "text" : "password"}
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
                style={{ paddingRight: "40px" }}
              />
              <button
                type="button"
                className="password-toggle-icon"
                onClick={this.toggleShowPasswordConfirmation}
              >
                <i
                  className={`fa ${
                    this.state.showPasswordConfirmation
                      ? "fa-eye-slash"
                      : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            <br />
            {this.state.passwordConfirmationError && (
              <div className="errorMsg">
                {this.state.passwordConfirmationError}
              </div>
            )}

            <div className="phone-input-container">
              <select
                name="countryCode"
                value={this.state.countryCode}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>

              <input
                type="tel"
                name="phoneNo"
                placeholder="Phone Number (10 digits)"
                value={this.state.phoneNo}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                maxLength="10"
                pattern="\d{10}"
                autoComplete="off"
              />
            </div>

            {this.state.countryCodeError && (
              <div className="errorMsg">{this.state.countryCodeError}</div>
            )}
            {this.state.PhoneNoError && (
              <div className="errorMsg">{this.state.PhoneNoError}</div>
            )}

            <select
              className="country-select"
              name="country"
              value={this.state.country}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            <br />
            {this.state.countryError && (
              <div className="errorMsg">{this.state.countryError}</div>
            )}

            <select
              className="city-select"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            >
              <option value="">Select City</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
            <br />
            {this.state.cityError && (
              <div className="errorMsg">{this.state.cityError}</div>
            )}

            <input
              type="text"
              name="panNo"
              placeholder="Pan Number"
              value={this.state.panNo}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.panNoError && (
              <div className="errorMsg">{this.state.panNoError}</div>
            )}

            <input
              type="text"
              name="aadharNo"
              placeholder="Aadhar Number"
              value={this.state.aadharNo}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.aadharNoError && (
              <div className="errorMsg">{this.state.aadharNoError}</div>
            )}

            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    );
  }
}

export default FormComponent;
