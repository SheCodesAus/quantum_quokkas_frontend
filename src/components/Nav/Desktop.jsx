import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

import logo from '/logo/logo.png';

const Desktop = ({ handleLogout, handleRedirect }) => {
    const { auth } = useAuth();

    return (
        <section className='hidden md:flex fixed left-0 w-full'>
            {/* Logo / Home */}
            <Link to='/'>
                <img
                    className='w-60'
                    src={logo}
                    alt='Three sticky notes stacked on top of eachother with the word postitivity in the center of the top sticky note'
                />
            </Link>
            <div className='flex h-20 items-center font-accent text-lg lg:text-2xl w-full justify-evenly bg-pink-50/80'>
                {/* Home */}
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'border-[1px] py-2 px-5 rounded border-purple-dark bg-pink-50/90'
                            : 'border-[1px] py-2 px-5 rounded border-transparent bg-pink-50/90'
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
                                ? 'border-[1px] py-2 px-5 rounded border-yellow-dark bg-pink-50/90'
                                : 'border-[1px] py-2 px-5 rounded border-transparent bg-pink-50/90'
                        }
                        to='/newnote'
                    >
                        Post-A-Note
                    </NavLink>
                ) : (
                    <button
                        className='border-[1px] py-2 px-5 rounded border-transparent bg-pink-50/90'
                        onClick={handleRedirect}
                    >
                        Post-A-Note
                    </button>
                )}

                {/* Workshops */}
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'border-[1px] py-2 px-5 rounded border-orange-dark/60 bg-pink-50/90'
                            : 'border-[1px] py-2 px-5 rounded border-transparent bg-pink-50/80'
                    }
                    to='/workshops'
                >
                    Workshops
                </NavLink>

                {!auth.token ? (
                    // Log In
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'border-[1px] py-2 px-5 rounded border-blue-dark/80 bg-pink-50/90'
                                : 'border-[1px] py-2 px-5 rounded border-transparent bg-pink-50/80'
                        }
                        to='/login'
                    >
                        Log In
                    </NavLink>
                ) : (
                    <>
                        {/* Account */}
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'border-[1px] py-2 px-5 rounded border-green-dark bg-pink-50/90'
                                    : 'border-[1px] py-2 px-5 rounded border-transparent bg-pink-50/80'
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
    );
};
export default Desktop;
