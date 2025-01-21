import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postSignup from '../api/post-signup.js';
import signup from '/note-icons/signup.png';

function SignupForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        if (
            credentials.username &&
            credentials.email &&
            credentials.password &&
            credentials.confirmPassword
        ) {
            if (credentials.password !== credentials.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            postSignup(
                credentials.username,
                credentials.email,
                credentials.password
            ).then((response) => {
                window.localStorage.setItem('token', response.token);
                navigate('/login');
            });
        }
    };

    return (
        <main className='flex flex-col items-center'>
            {/* Sign Up Heading */}
            <img
                className='mb-5 w-28 md:w-40 lg:w-32 lg:mb-5'
                src={signup}
                alt='Green cartoon-style illustration of a post-it note'
            />
            {/* Sign Up Form */}
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
                    className='p-1.5 bg-green-light/70 focus-visible:outline-1 focus-visible:outline-green-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                {/* Email */}
                <label className='mb-1.5' htmlFor='email'>
                    Email:
                </label>
                <input
                    type='email'
                    id='email'
                    onChange={handleChange}
                    className='p-1.5 bg-green-light/70 focus-visible:outline-1 focus-visible:outline-green-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                {/* Password */}
                <label className='mb-1.5' htmlFor='password'>
                    Password:
                </label>
                <input
                    type='password'
                    id='password'
                    onChange={handleChange}
                    className='p-1.5 bg-green-light/70 focus-visible:outline-1 focus-visible:outline-green-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                <label className='mb-1.5' htmlFor='confirmPassword'>
                    Confirm Password:
                </label>
                <input
                    type='password'
                    id='confirmPassword'
                    onChange={handleChange}
                    className='p-1.5 bg-green-light/70 focus-visible:outline-1 focus-visible:outline-green-dark rounded w-11/12 ml-4 mb-8 md:p-3'
                />

                <button
                    className='w-fit mx-auto py-2 px-6 rounded bg-green-dark font-bold font-accent text-2xl shadow-md shadow-green-dark mb-5 md:text-4xl lg:text-3xl'
                    type='submit'
                >
                    Sign Up
                </button>
            </form>

            {/* Notice */}
            <p className='font-main font-light text-lg md:text-xl'>
                Already have an account?
                <Link className='font-medium' to='/login'>
                    {' '}
                    Log in
                </Link>
            </p>
        </main>
    );
}

export default SignupForm;
