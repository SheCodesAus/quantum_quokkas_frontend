import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

import home from '/note-icons/home.png';
import workshops from '/note-icons/workshops.png';
import postnote from '/note-icons/postnote.png';
import login from '/note-icons/login.png';
import signup from '/note-icons/signup.png';
import account from '/note-icons/account.png';
import newworkshop from '/note-icons/newworkshop.png';
import logout from '/note-icons/logout.png';
import useStatus from '../../hooks/use-status';

const Mobile = ({ handleClick, handleLogout, handleRedirect, showNav }) => {
    const { auth } = useAuth();
    const { isAdminOrSuper } = useStatus(auth.userId);

    return (
        <section
            className={`${showNav ? 'min-h-screen' : 'hidden'} md:hidden p-6`}
        >
            <section className='grid grid-cols-2 w-fit mx-auto gap-x-16'>
                {/* Home */}
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
                    className='mt-[-20px] row-start-2 col-start-2 -skew-x-12 skew-y-12'
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
                            className='mt-[-20px] row-start-3 skew-y-12 -skew-x-12'
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
                            className='mt-[-20px] row-start-4 col-start-2  skew-x-12 -skew-y-12'
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
                            className='mt-[-20px] row-start-5 -skew-y-12 skew-x-12'
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
                            className='mt-[-20px] row-start-3 skew-y-12 -skew-x-12'
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
                            className='mt-[-20px] row-start-4 col-start-2 skew-x-12 -skew-y-12'
                            to='/account'
                        >
                            <img
                                src={account}
                                alt='Green cartoon-style illustration of a post-it note'
                                className='w-28'
                            />
                        </Link>

                        {/* Logout */}
                        <Link
                            onClick={handleLogout}
                            className='mt-[-20px] row-start-5 -skew-y-12 skew-x-12'
                            to='/'
                        >
                            <img
                                src={logout}
                                alt='Green cartoon-style illustration of a post-it note'
                                className='w-28'
                            />
                        </Link>

                        {/* New Workshop */}
                        {isAdminOrSuper && (
                            <Link
                                onClick={handleClick}
                                className='mt-[-20px] row-start-6 col-start-2 -skew-x-12 skew-y-12'
                                to='/newworkshop'
                            >
                                <img
                                    src={newworkshop}
                                    alt='Pink cartoon-style illustration of a post-it note'
                                    className='w-28'
                                />
                            </Link>
                        )}
                    </>
                )}
            </section>
        </section>
    );
};
export default Mobile;
