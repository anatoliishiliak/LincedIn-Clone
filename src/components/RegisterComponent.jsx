import React, { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import { postUserData } from '../api/FirestoreAPI';
import LinkedinLogo from '../assets/linkedinLogo.png';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from '../helpers/getUniqueId';
import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';

export default function RegisterComponent() {
  //qwerty@gmail.com   123456
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success('Account created!');
      postUserData({
        userID: getUniqueId(),
        name: credentials.name,
        email: credentials.email,
        imageLink:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      });
      localStorage.setItem('userEmail', res.user.email);
      navigate('/home');
    } catch (err) {
      console.log(err);
      toast.error('Cannot create Your Account!');
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    navigate('/home');
  };

  return (
    <div className="login-wraper">
      <img src={LinkedinLogo} alt="#" className="linkedinLogo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)
            "
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
        <hr data-content="or" className="hr-text" />
        <div className="google-btn-container">
          <GoogleButton className="google-btn" onClick={googleSignIn} />
          <p className="go-to-signup">
            Already on LinkedIn?{' '}
            <span
              className="join-now"
              onClick={() => {
                navigate('/');
              }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
