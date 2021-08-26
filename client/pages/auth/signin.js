import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doRequest, errors] = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <div className="container-sm mt-5">
      <div className="row justify-content-center text-muted ">
        <div className="col-sm-6 mt-5">
          <form onSubmit={onSubmit}>
            <h1 className="display-5 text-center">Sign In</h1>
            <label className="form-label mt-1" htmlFor="emailin">
              E-mail Address
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-chat-right-dots-fill"></i>
              </span>
              <input
                placeholder="e.g. example@example.com"
                id="emailin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <label className="form-label mt-1" htmlFor="passwordin">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-shield-lock-fill"></i>
              </span>
              <input
                placeholder="********"
                id="passwordin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
              />
            </div>
            {errors}
            <div className="text-center">
              <button className="btn btn-muted  mt-4 border-secondary">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 border-top"></div>
    </div>
  );
};

export default Signin;
