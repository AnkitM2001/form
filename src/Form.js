import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
    checkFormValidity();
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character');
    } else {
      setPasswordError('');
    }
    checkFormValidity();
  };

  const checkFormValidity = () => {
    setIsFormValid(validateEmail(email) && validatePassword(password));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert('Form submitted successfully!');
    } else {
      alert('Please correct the errors in the form');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={emailError ? 'error' : ''}
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={passwordError ? 'error' : ''}
          />
          {passwordError && <span className="error-message">{passwordError}</span>}
        </div>
        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
