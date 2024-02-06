import { useState } from "react";
import { useModal } from "../../context/Modal";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from '../../redux/session';
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUserLogin = async(e) => {
    e.preventDefault()

    return await dispatch(sessionActions.thunkLogin({email: 'demo@aa.io', password: 'password'}))
    .then(navigate('/')).then(closeModal())
  }

  const openModal = () => {
    setModalContent(<SignupFormModal />)
  }

  const signup = e => {
    e.preventDefault()
    openModal()
  }

  return (
    <div className="login-modal">
      <div className="top-modal">
        <div className="sign-in-title">
          <h2>Sign in</h2>
          <p style={{paddingTop: 3}}>Hey there! Sign in to access Beauty Buzz.</p>
        </div>
        <div className="register-div">
          <button className='register-button' onClick={(e) => signup(e)}>Register</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <label className="form-label">
          Email address
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <span className="error">{errors.email}</span>}
        <label className="form-label">
          Password
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <span className="error">{errors.password}</span>}
        <div className="login-div">
          <button className="login-button" type="submit">Sign in</button>
          <button className='demo-user-login' onClick={demoUserLogin}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
