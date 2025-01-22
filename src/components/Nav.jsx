import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import toast, { Toaster } from 'react-hot-toast';

import home from '/note-icons/home.png';
import workshops from '/note-icons/workshops.png';
import postnote from '/note-icons/postnote.png';
import login from '/note-icons/login.png';
import signup from '/note-icons/signup.png';
import account from '/note-icons/account.png';
import logout from '/note-icons/logout.png';
import hamburger from '/custom-btns/hamburger.png';
import close from '/custom-btns/close.png';
import logo from '/logo/logo.png';

const Nav = () => {
    const { auth, setAuth } = useAuth();
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowNav(false);
        toast('Goodbye!');
        setTimeout(() => {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user_id');
            window.localStorage.removeItem('first_name');
            setAuth({ token: null, user: '', firstName: '' });
            navigate('/');
        }, 1000);
    };

    const handleClick = () => setShowNav(!showNav);

    const handleRedirect = () => {
        toast('Please log in to Post-A-Note!');
        setTimeout(() => {
            setShowNav(false)
            navigate('/login');
        }, 1200);
    };

    return (
        <main className='min-h-screen flex flex-col bg-pink-50'>
            <Toaster position='top-center' />
            <nav>
                {/* Desktop Menu */}
                <section className='hidden md:flex fixed left-0 w-full'>
                    {/* Logo / Home */}
                    <Link to='/'>
                        <img className='w-60' src={logo} alt='' />
                    </Link>
                    <div className='flex bg-pink-50/90 h-20 items-center font-accent text-xl lg:text-2xl w-full justify-evenly'>
                        {/* Home */}
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'border-[1px] py-1.5 px-2 rounded border-purple-dark'
                                    : 'border-[1px] py-1.5 px-2 border-transparent'
                            }
                            to='/'
                        >
                            Home
                        </NavLink>

                        {/* Post Note */}
                        {auth.token ? (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'border-[1px] p-1.5 rounded border-yellow-dark'
                                        : 'border-[1px] p-1.5 border-transparent'
                                }
                                to='/newnote'
                            >
                                Post-A-Note
                            </NavLink>
                        ) : (
                            <button
                                className='border-[1px] p-1.5 border-transparent'
                                onClick={handleRedirect}
                            >
                                Post-A-Note
                            </button>
                        )}

                        {/* Workshops */}
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'border-[1px] p-1.5 rounded border-orange-dark/60'
                                    : 'border-[1px] p-1.5 border-transparent'
                            }
                            to='/workshops'
                        >
                            Workshops
                        </NavLink>
                        {!auth.token ? (
                            <>
                                {/* Log In */}
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'border-[1px] p-1.5 rounded border-blue-dark/80'
                                            : 'border-[1px] p-1.5 border-transparent'
                                    }
                                    to='/login'
                                >
                                    Log In
                                </NavLink>

                                {/* Sign Up */}
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'border-[1px] p-1.5 rounded border-pink-dark'
                                            : 'border-[1px] p-1.5 border-transparent'
                                    }
                                    to='/signup'
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        ) : (
                            <>
                                {/* Account */}
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'border-[1px] p-1.5 rounded border-green-dark'
                                            : 'border-[1px] p-1.5 border-transparent'
                                    }
                                    to='/account'
                                >
                                    Account
                                </NavLink>

                                {/* Log Out */}
                                <NavLink onClick={handleLogout} to='/'>
                                    Log Out
                                </NavLink>
                            </>
                        )}
                    </div>
                </section>

                {/* Mobile Menu Buttons */}
                <div className='flex items-start'>
                    {/* Logo */}
                    <Link
                        onClick={() => setShowNav(false)}
                        to='/'
                        className='pl-3 md:hidden'
                    >
                        <img className='w-52' src={logo} alt='' />
                    </Link>

                    {/* Hamburger */}
                    <button
                        onClick={handleClick}
                        className='md:hidden w-full p-2 focus-visible:none'
                    >
                        {showNav ? (
                            <img
                                src={close}
                                className='w-10 ml-auto mr-4 mt-6'
                            />
                        ) : (
                            <img
                                src={hamburger}
                                className='w-20 ml-auto mr-2 mt-3.5'
                            />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <section
                    className={`${
                        showNav ? 'min-h-screen' : 'hidden'
                    } md:hidden p-6`}
                >
                    <section className='grid grid-cols-2 w-fit mx-auto gap-x-14'>
                        {/* Logo */}
                        <Link
                            onClick={handleClick}
                            className='col-start-1 -skew-y-12 skew-x-12'
                            to='/'
                        >
                            <img
                                src={home}
                                alt='Blue cartoon-style illustration of a post-it note'
                                className='w-28'
                            />
                        </Link>

                        {/* Workshops */}
                        <Link
                            onClick={handleClick}
                            className='row-start-2 col-start-2  -skew-x-12 skew-y-12'
                            to='/workshops'
                        >
                            <img
                                src={workshops}
                                alt='Pink cartoon-style illustration of a post-it note'
                                className='w-28'
                            ></img>
                        </Link>
                        {!auth.token ? (
                            <>
                                {/* Post Note */}
                                <button
                                    onClick={handleRedirect}
                                    className='row-start-3 -skew-y-12 skew-x-12'
                                >
                                    <img
                                        src={postnote}
                                        alt='Yellow cartoon-style illustration of a post-it note'
                                        className='w-28'
                                    />
                                </button>

                                {/* Log In */}
                                <Link
                                    onClick={handleClick}
                                    className='row-start-4 col-start-2  -skew-x-12 skew-y-12'
                                    to='/login'
                                >
                                    <img
                                        src={login}
                                        alt='Purple cartoon-style illustration of a post-it note'
                                        className='w-28'
                                    />
                                </Link>

                                {/* Sign Up */}
                                <Link
                                    onClick={handleClick}
                                    className='row-start-5  -skew-y-12 skew-x-12'
                                    to='/signup'
                                >
                                    <img
                                        src={signup}
                                        alt='Green cartoon-style illustration of a post-it note'
                                        className='w-28'
                                    />
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Post Note */}
                                <Link
                                    onClick={handleClick}
                                    className='row-start-3 -skew-y-12 skew-x-12'
                                    to='/newnote'
                                >
                                    <img
                                        src={postnote}
                                        alt='Yellow cartoon-style illustration of a post-it note'
                                        className='w-28'
                                    />
                                </Link>
                                {/* Account */}
                                <Link
                                    onClick={handleClick}
                                    className='row-start-4 col-start-2 -skew-x-12 skew-y-12'
                                    to='/account'
                                >
                                    <img
                                        src={account}
                                        alt='Purple cartoon-style illustration of a post-it note'
                                        className='w-28'
                                    />
                                </Link>

                                {/* Log Out */}
                                <Link
                                    onClick={handleLogout}
                                    className='row-start-5 -skew-y-12 skew-x-12'
                                    to='/'
                                >
                                    <img
                                        src={logout}
                                        alt='Green cartoon-style illustration of a post-it note'
                                        className='w-28'
                                    />
                                </Link>
                            </>
                        )}
                    </section>
                </section>
            </nav>
            <section
                className={`${
                    showNav ? 'hidden' : 'min-h-screen mt-10 md:mt-36 lg:mt-20'
                }`}
            >
                <Outlet />
            </section>
        </main>
    );
};
export default Nav;
