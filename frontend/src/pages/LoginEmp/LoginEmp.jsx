import "./LoginEmp.css";

import { login } from "../../data/user";
import { useRef } from "react";

function LoginEmp({ setToken, setRole, setIsAdmin }) {
  const userRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="loginEmp-container">
      <div class="mb-3" className="login-header">
        <label for="exampleFormControlInput1" class="form-label">
          ID Card Number
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Id Card Number"
          ref={userRef}
        />
      </div>
      <div class="mb-3">
        <label for="inputPassword5" class="form-label">
          Password
        </label>
        <input
          type="password"
          id="inputPassword5"
          placeholder="Enter password"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          ref={passwordRef}
        />

        <button
          className="btn btn-primary"
          onClick={() => {
            const user = userRef.current.value.trim();
            const password = passwordRef.current.value.trim();
            const userInfo = login(user, password);
            userRef.current.value = "";
            passwordRef.current.value = "";

            if (userInfo && userInfo.role === "user") {
              setToken(userInfo.token);
              setRole(userInfo.role);
            } else {
              alert("Wrong User Username or password");
            }
          }}
        >
          Login
        </button>
      </div>
      <div className="checkBox">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="role"
            id="roleAdmin"
            onChange={() => setIsAdmin(true)}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Admin
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="role"
            id="roleUser"
            onChange={() => setIsAdmin(false)}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            User
          </label>
        </div>
      </div>
    </div>
  );
}

export default LoginEmp;
