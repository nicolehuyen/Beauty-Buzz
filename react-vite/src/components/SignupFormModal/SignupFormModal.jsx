import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import * as sessionActions from '../../redux/session';
import "../LoginFormModal/LoginForm.css";

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
  const [submitted, setSubmitted] = useState(false)
  // const [username, setUsername] = useState("");

  useEffect(() => {
    const newErrors = {}

    // if(!first_name) newErrors.first_name = 'First name is required.'
    if(String(first_name).length > 40) newErrors.first_name = 'First name cannot exceed 40 characters.'
    // if(!last_name) newErrors.last_name = 'Last name is required.'
    if(String(last_name).length > 40) newErrors.last_name = 'Last name cannot exceed 40 characters.'
    // if(!email) newErrors.email = 'Email is required.'
    if(String(password).length < 8) newErrors.password = 'Password must be 8 characters or more.'
    if(password !== confirmPassword) newErrors.confirmPassword = "Confirm Password field must be the same as the Password field."

    setErrors(newErrors)
  }, [first_name, last_name, email, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)

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
      <h2>Create Your Account</h2>
      <p style={{paddingTop: 3}}>Registration is easy.</p>
      <div style={{minHeight: 30}}>{submitted && errors.server ? <span className="error">{errors.server}</span> : ' '}</div>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <label className="form-label">
          First Name
          <input
            className="form-input"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            // required
          />
        </label>
        <div style={{minHeight: 30}}>{submitted && errors.first_name ? <span className="error">{errors.first_name}</span> : ' '}</div>
        <label className="form-label">
          Last Name
          <input
            className="form-input"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            // required
          />
        </label>
        <div style={{minHeight: 30}}>{submitted && errors.last_name ? <span className="error">{errors.last_name}</span> : ' '}</div>
        <label className="form-label">
          Email Address
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </label>
        <div style={{minHeight: 30}}>{submitted && errors.email ? <span className="error">{errors.email}</span> : ' '}</div>
        <label className="form-label">
          Password
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        <div style={{minHeight: 30}}>{submitted && errors.password ? <span className="error">{errors.password}</span> : ' '}</div>
        <label className="form-label">
          Confirm Password
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
        </label>
        <div style={{minHeight: 30}}>{submitted && errors.confirmPassword ? <span className="error">{errors.confirmPassword}</span> : ' '}</div>
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
