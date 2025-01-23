import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import postSignup from '../api/post/post-signup.js';
import signup from '/note-icons/signup.png';
import toast from 'react-hot-toast';
import postLogin from '../api/post/post-login.js';
import { useAuth } from '../hooks/use-auth.js';

const signupSchema = z.object({
    firstName: z.string().min(1, 'Enter your first name'),
    lastName: z.string().min(1, 'Enter your last name'),
    email: z.string().min(1, 'Enter your email').email(),
    username: z.string().min(5, 'Username must be longer than 5 characters'),
    password: z.string().min(1, 'Password required'),
});

function SignupForm() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
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

    const handleSignup = async (e) => {
        e.preventDefault();
        const result = signupSchema.safeParse(credentials);

        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                toast(error.message);
            }
            return;
        }
        try {
            await postSignup(
                result.data.firstName,
                result.data.lastName,
                result.data.username,
                result.data.email,
                result.data.password
            );
            const loginResponse = await postLogin(
                result.data.username,
                result.data.password
            );
            window.localStorage.setItem('token', loginResponse.token);
            window.localStorage.setItem('user_id', loginResponse.user_id);
            window.localStorage.setItem('first_name', loginResponse.first_name);
            setAuth({
                token: loginResponse.token,
                userId: loginResponse.user_id,
                firstName: loginResponse.first_name,
            });
            toast(`Welcome ${loginResponse.first_name}!`);
            navigate('/');
        } catch (error) {
            toast(error.message);
        }
    };

    return (
        <main className='min-h-screen flex flex-col items-center md:mt-6'>
            {/* Sign Up Heading */}
            <img
                className='mb-5 w-28 md:w-40 lg:mb-5'
                src={signup}
                alt='Green cartoon-style illustration of a post-it note'
            />
            {/* Sign Up Form */}
            <form
                onSubmit={handleSignup}
                className='h-fit w-72 flex flex-col font-main font-light text-lg md:w-96'
            >
                {/* First Name */}
                <label className='mb-1.5' htmlFor='firstName'>
                    First Name:
                </label>
                <input
                    type='text'
                    id='firstName'
                    onChange={handleChange}
                    className='p-1.5 bg-pink-light/70 focus-visible:outline-1 focus-visible:outline-pink-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                {/* Last Name */}
                <label className='mb-1.5' htmlFor='lastName'>
                    Last Name:
                </label>
                <input
                    type='text'
                    id='lastName'
                    onChange={handleChange}
                    className='p-1.5 bg-pink-light/70 focus-visible:outline-1 focus-visible:outline-pink-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                {/* Username */}
                <label className='mb-1.5' htmlFor='username'>
                    Username:
                </label>
                <input
                    type='text'
                    id='username'
                    onChange={handleChange}
                    className='p-1.5 bg-pink-light/70 focus-visible:outline-1 focus-visible:outline-pink-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                {/* Email */}
                <label className='mb-1.5' htmlFor='email'>
                    Email:
                </label>
                <input
                    type='email'
                    id='email'
                    onChange={handleChange}
                    className='p-1.5 bg-pink-light/70 focus-visible:outline-1 focus-visible:outline-pink-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                {/* Password */}
                <label className='mb-1.5' htmlFor='password'>
                    Password:
                </label>
                <input
                    type='password'
                    id='password'
                    onChange={handleChange}
                    className='p-1.5 bg-pink-light/70 focus-visible:outline-1 focus-visible:outline-pink-dark rounded w-11/12 ml-4 mb-3 md:p-3'
                />

                <label className='mb-1.5' htmlFor='confirmPassword'>
                    Confirm Password:
                </label>
                <input
                    type='password'
                    id='confirmPassword'
                    onChange={handleChange}
                    className='p-1.5 bg-pink-light/70 focus-visible:outline-1 focus-visible:outline-pink-dark rounded w-11/12 ml-4 mb-8 md:p-3'
                />

                <button
                    className='w-fit mx-auto py-2 px-6 rounded bg-pink-dark font-bold font-accent text-2xl shadow-md shadow-pink-dark mb-5 md:text-4xl lg:text-3xl'
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
