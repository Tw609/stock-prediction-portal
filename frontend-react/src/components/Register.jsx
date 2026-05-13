import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoding] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoding(true);

    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/register/",
        userData,
      );
      console.log("response.data==>", response.data);
      console.log("Registration successful");
      if (errors) {
        setError({});
      }
      setSuccess(true);
    } catch (error) {
      setError(error.response.data);
      console.error("Regitration error==>", error.response.data);
    } finally {
      setLoding(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-4">Create an Account</h3>
            <form onSubmit={handleRegistration}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <small>
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="Password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <small>
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </small>
              </div>
              {success && (
                <div className="alert alert-success">
                  Registration Successfull!!
                </div>
              )}
              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto"
                  disabled>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Please Wait...
                </button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
