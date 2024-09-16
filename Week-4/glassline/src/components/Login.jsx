import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const [usersData, setUsersData] = useState([]);  // To store users fetched from the server
  const [email, setEmail] = useState("");  // To store entered email
  const [password, setPassword] = useState("");  // To store entered password
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // For error display
  const navigate = useNavigate()
  const { login,  } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch("http://localhost:5000/users");
      const dataJson = await data.json();
      setUsersData(dataJson);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();  // Prevent form from submitting and refreshing the page

    const user = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      login()
     navigate("/")
      // Here you can redirect the user or save the logged-in user's info
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-light text-dark"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  {errorMessage && <p className="text-danger">{errorMessage}</p>}

                  <form onSubmit={handleLogin}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Update email state
                        required
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // Update password state
                        required
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      className="btn bg-primary btn-outline-light btn-lg px-5"
                      type="submit"
                      disabled={isLoading}  // Disable button when data is loading
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?
                    <a href="/signup" className="text-dark-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
