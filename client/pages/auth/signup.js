import { useState } from 'react';

import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      firstname,
      lastname,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1 className="signupin">Sign Up</h1>
        <div className="form-group">
          <label>E-mail Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Firstname</label>
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn-signup">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
