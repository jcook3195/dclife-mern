import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';

import InputSubmit from '../ui/buttons/InputSubmit';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstName, lastName, email, phoneNumber, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/landing' />;
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <div className='row'>
          <form className='col s12' onSubmit={(e) => onSubmit(e)}>
            <div className='row'>
              <div className='col s12'>
                <h2 className='center-align section-header'>Create Account</h2>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='firstName'
                  type='text'
                  className='validate'
                  name='firstName'
                  value={firstName}
                  onChange={(e) => onChange(e)}
                  required
                />
                <label htmlFor='firstName'>First Name</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='lastName'
                  type='text'
                  className='validate'
                  name='lastName'
                  value={lastName}
                  onChange={(e) => onChange(e)}
                  required
                />
                <label htmlFor='lastName'>Last Name</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='email'
                  className='validate'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
                <label htmlFor='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='tel'
                  className='validate'
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => onChange(e)}
                  required
                />
                <label htmlFor='phoneNumber'>Phone</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='password'
                  className='validate'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='password'
                  className='validate'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => onChange(e)}
                  required
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>
                <InputSubmit
                  classes='waves-effect waves-light btn red darken-1 white-text'
                  text='Register'
                />
              </div>
              <div className='col s6'>
                <p className='mt-0'>
                  Have an account?{' '}
                  <Link to='/login' className='red-text text-darken-2'>
                    Login here.
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
