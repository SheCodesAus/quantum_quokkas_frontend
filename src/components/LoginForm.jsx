import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.js';
import z from 'zod';
import postLogin from '../api/post/post-login.js';
import login from '/note-icons/login.png';
import toast from 'react-hot-toast';
import getUser from '../api/get/get-user.js';

const loginSchema = z.object({
    username: z.string().min(5, 'Username required'),
    password: z.string().min(1, 'Password required'),
});

function LoginForm() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // if user is on log in page because they clicked post note
    const from = location.state?.from || '/';

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

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                toast(error.message);
            }
            return;
        } else {
            try {
                const loginResponse = await postLogin(
                    result.data.username,
                    result.data.password
                );
                window.localStorage.setItem('token', loginResponse.token);
                window.localStorage.setItem('user_id', loginResponse.user_id);
                window.localStorage.setItem('first_name', loginResponse.first_name);


                // Get extra info on user
                const userData = await getUser(loginResponse.user_id);
                window.localStorage.setItem('is_superuser', userData.is_superuser);
                window.localStorage.setItem('is_staff', userData.is_staff);
                setAuth({
                    token: loginResponse.token,
                    userId: loginResponse.user_id,
                    firstName: loginResponse.first_name,
                    isSuper: userData.is_superuser,
                    isAdmin: userData.is_staff,
                });
                toast(`Welcome back ${loginResponse.first_name}!`);
                navigate(from);
            } catch (error) {
                toast(error.message);
            }
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
                onSubmit={handleLogin}
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
                <Link
                    className='font-medium not-italic ml-2'
                    to='/signup'
                    state={{ from }}
                >
                    {' '}
                    Sign up!
                </Link>
            </p>
        </main>
    );
}

export default LoginForm;
