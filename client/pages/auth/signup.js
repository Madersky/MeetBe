import { useState } from 'react';
import Router from 'next/router';
import {
    ArrowRight,
    PersonFill,
    ChatRightDotsFill,
    ShieldLockFill,
} from 'react-bootstrap-icons';

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
        <div className="container-lg mt-5">
            <div className="row justify-content-start mt-5">
                <div className="col-4 bg-light mt-5">
                    <form onSubmit={onSubmit}>
                        <h1 className="lead fs-1">Sign Up</h1>

                        {/* EMAIL ADDRESS */}

                        <label for="email" className="form-label mt-1">
                            E-mail Address
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <ChatRightDotsFill />
                            </span>
                            <input
                                type="email"
                                id="email"
                                placeholder="e.g. example@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <label for="firstname" className="form-label mt-1">
                            Firstname
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <PersonFill />
                            </span>
                            <input
                                type="text"
                                id="firstname"
                                placeholder="e.g. Andrew"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <label for="lastname" className="form-label mt-1">
                            Lastname
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <PersonFill />
                            </span>
                            <input
                                type="text"
                                id="lastname"
                                placeholder="e.g Muller"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <label for="password" className="form-label mt-1">
                            Password
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <ShieldLockFill />
                            </span>

                            <input
                                id="passowrd"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control"
                            />
                        </div>
                        {errors}
                        <div className="justify-content-center text-center">
                            <button className="btn btn-light border my-5 ">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
