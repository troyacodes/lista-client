import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//comps
import Nav from '../../components/Nav/Nav';
//queries
import { LOGIN_USER } from '../../graphql/server';

const Login = props => {
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      cache,
      {
        data: {
          login: { token, __typename, ...userDetails }
        }
      }
    ) {
      cache.writeData({
        data: {
          userDetails: {
            __typename: 'UserDetails',
            ...userDetails
          },
          authenticated: true
        }
      });
      localStorage.setItem('token', token);
      props.history.push('/home');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: loginData.username,
      password: loginData.password
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Fragment>
      <Nav type="forms" />
      <section className="login">
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
              value={loginData.username}
              onChange={handleChange}
              autoComplete="off"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              autoComplete="off"
            />

            {loading ? (
              <Spinner animation="border" className="orange-spinner" />
            ) : (
              <input type="submit" className="btn btn-full-width" />
            )}
          </form>
          <h4 className="g-text">
            Don't have an account?{' '}
            <Link to="/signup" className="o-text">
              Sign up
            </Link>
          </h4>
        </Container>
      </section>
    </Fragment>
  );
};

export default Login;
