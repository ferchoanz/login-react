import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import axios from '../../plugins/axios';
import CryptoJS from "crypto-js";

const key = "Star*Wars*SWAPI*-Test/2022-08-09";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);
  const [loadApi, setLoadApi] = useState(false);
  const navigate = useNavigate();

  const init = async () => {
    const response = await axios.get('people')
      .then(res => res.data.results)
      .catch(() => []);
    setPeople(response);
  };

  useEffect(() => {
    if (loadApi) return;
    setLoadApi(true);
  }, [])

  useEffect(() => {
    if (!loadApi) return;
    init();
  }, [loadApi]);

  const loginSubmit = event => {
    event.preventDefault();
    const encrypt = CryptoJS.AES.encrypt(password, key).toString();
    const user = people.find(person => person.name === userName) || ({ hair_color: null });
    const userEncrypt = CryptoJS.AES.encrypt(user.hair_color, key).toString();

    if (CryptoJS.AES.decrypt(encrypt, key).toString() === CryptoJS.AES.decrypt(userEncrypt, key).toString()) {
      setError(false);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/list', { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="Login mt-5">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <Alert key="alert" variant="danger" className="mt-2" show={error}>
              Username or password incorrect
            </Alert>
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="username"
                  aria-describedby="userNameHelp"
                  placeholder="User Name"
                  required
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}