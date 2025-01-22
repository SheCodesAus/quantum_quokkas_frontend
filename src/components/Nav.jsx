import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

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
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setAuth({ token: null });
    };
    const [showNav, setShowNav] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const handleClick = () => setShowNav(!showNav);

    return (
        <main className='min-h-screen flex flex-col bg-pink-50'>
            <nav>
                {/* Desktop Menu */}
                <section className='hidden md:flex fixed left-0 w-full'>
                    <Link to='/'>
                        <img className='w-60' src={logo} alt='' />
                    </Link>
                    <div className='flex bg-pink-50/90 h-20 items-center font-accent text-2xl w-full justify-evenly'>
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
                        {auth.token ? (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'border-[1px] p-1.5 rounded border-yellow-dark'
                                        : 'border-[1px] p-1.5 border-transparent'
                                }
                                to='/postnote'
                            >
                                Post-A-Note
                            </NavLink>
                        ) : (
                            <NavLink
                                className='border-[1px] p-1.5 border-transparent'
                                to='/login'
                            >
                                Post-A-Note
                            </NavLink>
                        )}
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'border-[1px] p-1.5 rounded border-pink-dark'
                                    : 'border-[1px] p-1.5 border-transparent'
                            }
                            to='/workshops'
                        >
                            Workshops
                        </NavLink>
                        {!auth.token ? (
                            <>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'border-[1px] p-1.5 rounded border-purple-dark'
                                            : 'border-[1px] p-1.5 border-transparent'
                                    }
                                    to='/login'
                                >
                                    Log In
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'border-[1px] p-1.5 rounded border-green-dark'
                                            : 'border-[1px] p-1.5 border-transparent'
                                    }
                                    to='/signup'
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        ) : (
                            <>
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
                    <section className='grid grid-cols-2 w-4/5 mx-auto'>
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
                        {!loggedIn ? (
                            <>
                                {/* Post Note */}
                                <Link
                                    onClick={handleClick}
                                    className='row-start-3 -skew-y-12 skew-x-12'
                                    to='/login'
                                >
                                    <img
                                        src={postnote}
                                        alt='Yellow cartoon-style illustration of a post-it note'
                                        className='w-28'
                                    />
                                </Link>

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

                                <Link
                                    onClick={handleClick}
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
            <section className='min-h-screen mt-10 md:mt-36 lg:mt-20'>
                <Outlet />
            </section>
        </main>
    );
};
export default Nav;
