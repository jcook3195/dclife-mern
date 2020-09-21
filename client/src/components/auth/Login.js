import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../store/actions/auth';

import InputSubmit from '../ui/buttons/InputSubmit';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/landing' />;
  }

  return (
    <div className='form-container'>
      <div className='row'>
        <form className='col s12' onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <div className='col s12'>
              <h2 className='center-align section-header'>Login</h2>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='email'
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
          <div className='row mb-0'>
            <div className='input-field col s12'>
              <input
                id='password'
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
            <div className='col s12'>
              <p className='mt-0 mb-0'>
                <Link to='/forgot-password' className='red-text text-darken-2'>
                  Forgot Password
                </Link>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col s6'>
              <InputSubmit
                classes='waves-effect waves-light btn red darken-1 white-text'
                text='Login'
              />
            </div>
            <div className='col s6'>
              <p className='mt-0'>
                Don't have an account?{' '}
                <Link to='/register' className='red-text text-darken-2'>
                  Create one here.
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
