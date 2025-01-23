import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postLogin from '../api/post/post-login.js';
import { useAuth } from '../hooks/use-auth.js';
import login from '/note-icons/login.png';

function LoginForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
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
                    window.localStorage.setItem('user_id', response.user_id);
                    window.localStorage.setItem('first_name', response.first_name);
                    setAuth({
                        token: response.token,
                        userId: response.user_id,
                        firstName: response.first_name
                    })
                    navigate('/');
                }
            );
        }
    };

    return (
        <main className='min-h-screen flex flex-col md:mt-8 lg:mt-24 xl:mt-16 items-center'>
            {/* Log In Heading */}
            <img
                className='mb-5 w-28 md:w-40 lg:mb-5'
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
                    className='p-1.5 bg-blue-light/40 focus-visible:outline-1 focus-visible:outline-blue-light rounded w-11/12 ml-4 mb-6 md:p-3'
                />

                {/* Password */}
                <label className='mb-1.5' htmlFor='password'>
                    Password:
                </label>
                <input
                    type='password'
                    id='password'
                    onChange={handleChange}
                    className='p-1.5 bg-blue-light/40 focus-visible:outline-1 focus-visible:outline-blue-light rounded w-11/12 ml-4 mb-8 md:p-3'
                />

                <button
                    className='w-fit mx-auto py-2 px-6 rounded bg-blue-light font-bold font-accent text-2xl shadow-md shadow-blue-dark mb-8 md:text-4xl'
                    type='submit'
                >
                    Go
                </button>
            </form>

            {/* Notice */}
            <p className='font-main font-light text-xl italic md:text-2xl'>
                Don't have an account yet?
                <Link className='font-medium not-italic ml-2' to='/signup'>
                    {' '}
                    Sign up!
                </Link>
            </p>
        </main>
    );
}

export default LoginForm;
