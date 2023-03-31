import React, { useState } from "react";
import { User } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { showToastMessage } from "../common-component/utils/toastMessage";

const Login = () => {
  const navigate = useNavigate();

  const [loginCredential, setLoginCredential] = useState({
    emailOrUsername: "",
    password: "",
  });

  const onChangeHanlder = (event) => {
    setLoginCredential({
      ...loginCredential,
      [event.target.name]: event.target.value,
    });
  };

  const loginRequestHandler = (e) => {
    e.preventDefault();
    if (loginCredential?.emailOrUsername && loginCredential?.password) {
      navigate("/");
    } else {
      showToastMessage("warning", "Email or password is missing");
    }
  };

  return (
    <React.Fragment>
      <div className="row ">
        <div className="col">
          <div className="login-register">
            <div className="login-register-form">
              <div>
                <h4 className="text-center">
                  <User className="user-icon" />
                </h4>
              </div>
              <h4 className="text-center">Sign in</h4>
              <form
                className="row gy-2 mt-4"
                onSubmit={(e) => loginRequestHandler(e)}
              >
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Username/Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    name="emailOrUsername"
                    onChange={onChangeHanlder}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    name="password"
                    onChange={onChangeHanlder}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="submit"
                    value="Sign in"
                    className="form-control login-btn mt-3"
                    id="submit-btn"
                  />
                </div>
              </form>
              <p className="pt-2">
                Don't have account?<Link to="/register"> Register</Link> here
                <Link to="/forgot/password"> Forgot password?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
