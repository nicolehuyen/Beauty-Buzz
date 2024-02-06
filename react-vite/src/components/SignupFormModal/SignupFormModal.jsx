import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import * as sessionActions from '../../redux/session';
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (String(first_name).length > 40) {
      return setErrors({
        first_name: 'First name cannot exceed 40 characters.'
      })
    }

    if (String(last_name).length > 40) {
      return setErrors({
        last_name: 'Last name cannot exceed 40 characters.'
      })
    }

    if (String(password).length < 8) {
      return setErrors({
        password: 'Password must be 8 characters or more.'
      })
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field."
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name,
        last_name,
        email,
        password
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

  return (
    <div className="login-modal">
      <h2>Create your account</h2>
      <p style={{paddingTop: 3, paddingBottom: 10}}>Registration is easy.</p>
      {errors.server && <span className="error">{errors.server}</span>}
      <form onSubmit={handleSubmit} className="sign-in-form">
        <label className="form-label">
          First name
          <input
            className="form-input"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.first_name && <span className="error">{errors.first_name}</span>}
        <label className="form-label">
          Last name
          <input
            className="form-input"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
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
        <label className="form-label">
          Confirm password
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        <div className="login-div">
          <button className="login-button" type="submit">Register</button>
          <button className='demo-user-login' onClick={demoUserLogin}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;

{/* <label>
Username
<input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  required
/>
</label>
{errors.username && <p>{errors.username}</p>} */}
