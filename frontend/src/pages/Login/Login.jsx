import { login } from "../../data/user";
import { useRef, useState } from "react";
import "./Login.css";
import LoginEmp from "../LoginEmp/LoginEmp";

function Login({ setToken, setRole, setIsUser }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <div className="login-container">
      {isAdmin ? (
        <div>
          <div class="mb-3" className="login-header">
            <label for="exampleFormControlInput1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
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

                if(!isAdmin){
                  if(userInfo && userInfo.role === 'user'){
                    setToken(userInfo.token)
                    setRole(userInfo.role)
                  }else {
                    alert("Wrong User Username or password");
                  }
                }else{
                  if(userInfo && userInfo.role === 'admin'){
                    setToken(userInfo.token)
                    setRole(userInfo.role)
                  }else {
                    alert("Wrong Admin Username or password");
                  }
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
                checked={isAdmin}
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
                checked={!isAdmin}
                onChange={() => setIsAdmin(false)}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                User
              </label>
            </div>
          </div>
        </div>
      ) : (
        <LoginEmp setRole={setRole} setToken={setToken}  setIsAdmin={setIsAdmin}/>
      )}
    </div>
  );
}

export default Login;
