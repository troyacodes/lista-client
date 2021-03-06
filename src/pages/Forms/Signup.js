import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//comps
import StaticNav from '../../components/layout/Nav/StaticNav';
//queries
import { SIGNUP_USER } from '../../graphql/mutations';
//Redux Imports
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userActions';

const Signup = props => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
    update(_, { data }) {
      dispatch(login(data.signup, props.history));
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      confirmPassword: signupData.confirmPassword
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    signupUser();
  };

  return (
    <Fragment>
      <StaticNav type="forms" />
      <div className="forms">
        <section className="signup">
          {Object.keys(errors).length > 0 ? (
            <div className="form-errors">
              <Container>
                {Object.values(errors).map(err => (
                  <h4 key={err}>{err}</h4>
                ))}
              </Container>
            </div>
          ) : null}
          <Container className="form-container">
            <form className="form" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={signupData.username}
                onChange={handleChange}
                autoComplete="off"
                className="form-input"
              />
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                autoComplete="off"
                className="form-input"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
                autoComplete="off"
                className="form-input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
                className="form-input"
              />

              {loading ? (
                <Spinner animation="border" className="orange-spinner" />
              ) : (
                <input type="submit" className="btn btn-full-width" />
              )}
            </form>
            <h4 className="g-text">
              Already have an account?{' '}
              <Link to="/login" className="o-text">
                Log in
              </Link>
            </h4>
          </Container>
        </section>
      </div>
    </Fragment>
  );
};

export default Signup;
