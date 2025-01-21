import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postLogin from '../api/post-login.js';
import login from '/note-icons/login.png';

function LoginForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(credentials.username, credentials.password).then(
                (response) => {
                    window.localStorage.setItem('token', response.token);
                    navigate('/');
                }
            );
        }
    };

    return (
        <main className='flex flex-col items-center'>
            {/* Log In Heading */}
            <img
                className='mb-5 w-28 md:w-40 lg:w-32 lg:mb-5'
                src={login}
                alt='Purple cartoon-style illustration of a post-it note'
            />

            {/* Log In Form */}
            <form
                onSubmit={handleSubmit}
                className='h-fit w-72 flex flex-col font-main font-light text-lg md:w-96'
            >
                {/* Username */}
                <label className='mb-1.5' htmlFor='username'>
                    Username:
                </label>
                <input
                    type='text'
                    id='username'
                    onChange={handleChange}
                    autoCapitalize='none'
                    className='p-1.5 bg-purple-light/40 focus-visible:outline-1 focus-visible:outline-purple-light rounded w-11/12 ml-4 mb-8 md:p-3'
                />

                {/* Password */}
                <label className='mb-1.5' htmlFor='password'>
                    Password:
                </label>
                <input
                    type='password'
                    id='password'
                    onChange={handleChange}
                    className='p-1.5 bg-purple-light/40 focus-visible:outline-1 focus-visible:outline-purple-light rounded w-11/12 ml-4 mb-8 md:p-3'
                />

                <button
                    className='w-fit mx-auto py-2 px-6 rounded bg-purple-dark font-bold font-accent text-2xl shadow-md shadow-purple-dark mb-5 md:text-4xl'
                    type='submit'
                >
                    Go
                </button>
            </form>

            {/* Notice */}
            <p className='font-main font-light text-lg md:text-xl'>
                Don't have an account yet?
                <Link className='font-medium' to='/signup'>
                    {' '}
                    Sign up
                </Link>
            </p>
        </main>
    );
}

export default LoginForm;
