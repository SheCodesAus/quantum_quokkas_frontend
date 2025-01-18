import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import home from '/custom-btns/home.png';
import workshops from '/custom-btns/workshops.png';
import postnote from '/custom-btns/postnote.png';
import login from '/custom-btns/login.png';
import signup from '/custom-btns/signup.png';
import account from '/custom-btns/account.png';
import logout from '/custom-btns/logout.png';
import hamburger from '/custom-btns/hamburger.png';
import close from '/custom-btns/close.png';

const Nav = () => {
    const [showNav, setShowNav] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const handleClick = () => setShowNav(!showNav);

    return (
        <main className='min-h-screen flex flex-col md:flex-row bg-pink-50'>
            {/* Outlet Container */}
            {/* <section className='hidden md:block'>
                <Outlet />
            </section> */}
            <nav>
                {/* Desktop Menu */}
                <section className='hidden md:flex flex-col fixed left-0 h-full space-y-6 lg:space-y-2 p-3 overflow-y-auto w-48'>
                    <Link to='/'>
                        <div className='size-20 bg-gray-300 flex items-center justify-center mx-auto'>
                            logo
                        </div>
                    </Link>
                    <div className='flex items-center'>
                        <h1 className='font-subtext text-4xl'>post</h1>
                        <h1 className='font-subtext text-6xl p-1.5 mb-2 border-b border-black'>
                            it
                        </h1>
                        <h1 className='font-subtext text-4xl'>ivity</h1>
                    </div>
                    <Link to='/'>
                        <img
                            src={home}
                            alt='Blue cartoon-style illustration of a post-it note'
                            className='w-24'
                        />
                    </Link>
                    <Link to='/workshops'>
                        <img
                            src={workshops}
                            alt='Pink cartoon-style illustration of a post-it note'
                            className='w-24'
                        ></img>
                    </Link>

                    <Link to='/login'>
                        <img
                            src={postnote}
                            alt='Yellow cartoon-style illustration of a post-it note'
                            className='w-24'
                        />
                    </Link>
                    {!loggedIn ? (
                        <>
                            <Link to='/login'>
                                <img
                                    src={login}
                                    alt='Purple cartoon-style illustration of a post-it note'
                                    className='w-24'
                                />
                            </Link>

                            <Link to='/signup'>
                                <img
                                    src={signup}
                                    alt='Green cartoon-style illustration of a post-it note'
                                    className='w-24'
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/account'>
                                <img
                                    src={account}
                                    alt='Purple cartoon-style illustration of a post-it note'
                                    className='w-24'
                                />
                            </Link>
                            <Link to='/'>
                                <img
                                    src={logout}
                                    alt='Green cartoon-style illustration of a post-it note'
                                    className='w-24'
                                />
                            </Link>
                        </>
                    )}
                </section>

                <div className='flex items-center h-24'>
                    <h1 className='font-subtext text-4xl ml-6 md:hidden'>
                        post
                    </h1>
                    <h1 className='font-subtext text-6xl p-1.5 mb-2 md:hidden'>
                        it
                    </h1>
                    <h1 className='font-subtext text-4xl md:hidden'>ivity</h1>
                    {/* Hamburger */}
                    <button
                        onClick={handleClick}
                        className='md:hidden w-full p-2 focus-visible:none'
                    >
                        {showNav ? (
                            <img
                                src={close}
                                className='w-10 ml-auto mt-2 mr-2'
                            />
                        ) : (
                            <img src={hamburger} className='w-20 ml-auto' />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <section
                    className={`${
                        showNav ? 'min-h-screen' : 'hidden'
                    } md:hidden p-6`}
                >
                    <section className='grid grid-cols-2 place-items-center gap-y-10'>
                        <Link to='/' className='col-span-2'>
                            <img
                                src={home}
                                alt='Blue cartoon-style illustration of a post-it note'
                                className='w-32'
                            />
                        </Link>
                        <Link to='/workshops'>
                            <img
                                src={workshops}
                                alt='Pink cartoon-style illustration of a post-it note'
                                className='w-32'
                            ></img>
                        </Link>
                        {!loggedIn ? (
                            <>
                                <Link to='/login'>
                                    <img
                                        src={postnote}
                                        alt='Yellow cartoon-style illustration of a post-it note'
                                        className='w-32'
                                    />
                                </Link>

                                <Link to='/login'>
                                    <img
                                        src={login}
                                        alt='Purple cartoon-style illustration of a post-it note'
                                        className='w-32'
                                    />
                                </Link>

                                <Link to='/signup'>
                                    <img
                                        src={signup}
                                        alt='Green cartoon-style illustration of a post-it note'
                                        className='w-32'
                                    />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/newnote'>
                                    <img
                                        src={postnote}
                                        alt='Yellow cartoon-style illustration of a post-it note'
                                        className='w-32'
                                    />
                                </Link>

                                <Link to='/account'>
                                    <img
                                        src={account}
                                        alt='Purple cartoon-style illustration of a post-it note'
                                        className='w-32'
                                    />
                                </Link>

                                <Link to='/'>
                                    <img
                                        src={logout}
                                        alt='Green cartoon-style illustration of a post-it note'
                                        className='w-32'
                                    />
                                </Link>
                            </>
                        )}
                        <Link to='/' className='col-span-2'>
                            <div className='size-32 border-2 bg-gray-300 flex items-center justify-center'>
                                logo
                            </div>
                        </Link>
                    </section>
                </section>
            </nav>
            <section className='min-h-screen md:ml-52 md:p-8'>
                <Outlet />
            </section>
        </main>
    );
};
export default Nav;
