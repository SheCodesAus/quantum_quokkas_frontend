import { useState } from 'react';
import { Link, Outlet, useNavigate, ScrollRestoration } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import toast, { Toaster } from 'react-hot-toast';

import hamburger from '/custom-btns/hamburger.png';
import close from '/custom-btns/close.png';
import logo from '/logo/logo.png';
import Desktop from './Desktop';
import Mobile from './Mobile';

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
        }, 700);
    };

    const handleClick = () => setShowNav(!showNav);

    const handleRedirect = () => {
        toast('Please log in to Post-A-Note!');
        setTimeout(() => {
            setShowNav(false);
            navigate('/login', { state: { from: '/newnote' } });
        }, 1200);
    };

    return (
        <main className='min-h-screen flex flex-col bg-pink-100/50'>
            <Toaster
                position='top-center'
                toastOptions={{
                    className: 'text-lg md:text-2xl font-accent tracking-wider',
                }}
            />
            <nav>
                {/* Desktop Menu */}
                <Desktop
                    handleClick={handleClick}
                    handleLogout={handleLogout}
                    handleRedirect={handleRedirect}
                />

                {/* Mobile Menu Buttons */}
                <div className='flex items-start'>
                    {/* Logo */}
                    <Link
                        onClick={() => setShowNav(false)}
                        to='/'
                        className='pl-3 md:hidden'
                    >
                        <img
                            className='w-52'
                            src={logo}
                            alt='Three sticky notes stacked on top of eachother with the word postitivity in the center of the top sticky note'
                        />
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
                <Mobile
                    handleClick={handleClick}
                    handleLogout={handleLogout}
                    handleRedirect={handleRedirect}
                    showNav={showNav}
                />
            </nav>
            <ScrollRestoration />
            <section
                className={`${
                    showNav ? 'hidden' : 'min-h-screen mt-10 md:mt-36 lg:mt-20'
                }`}
            >
                <Outlet context={handleRedirect} />
            </section>
        </main>
    );
};
export default Nav;
