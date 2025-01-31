import { NavLink, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import useStatus from '../hooks/use-status';

const Account = () => {
    const { auth } = useAuth();
    const { isAdminOrSuper } = useStatus(auth.userId);

    return (
        <main className='min-h-screen md:border-l-[1px] font-main border-green-dark md:ml-48 lg:ml-52 xl:ml-60'>
            <h1 className='font-main text-3xl text-center'>
                Welcome, {auth.firstName}
            </h1>
            <section className='border-t-[1px] border-b-[1px] border-green-dark py-5 flex justify-evenly mt-4'>
                {/* Create Workshop */}
                {isAdminOrSuper && (
                    <Link
                        className='border-[1px] font-accent text-lg lg:text-2xl py-2 px-5 rounded bg-green-dark/60 shadow-md shadow-green-dark'
                        to='/newworkshop'
                    >
                        Add A Workshop
                    </Link>
                )}
                <Link
                    to=' /newnote'
                    className='border-[1px] font-accent text-lg lg:text-2xl py-2 px-5 rounded bg-green-dark/60 shadow-md shadow-green-dark'
                >
                    Post-A-Note
                </Link>
            </section>
            <section className='flex w-full justify-between px-3 py-4 text-lg font-light border-b-[1px] border-green-dark md:p-6 md:border-transparent md:text-xl lg:text-2xl lg:justify-around'>
                <NavLink
                    to='/account/notes'
                    className={({ isActive }) =>
                        isActive
                            ? 'border-[1px] p-1.5 rounded border-green-dark'
                            : 'border-[1px] p-1.5 border-transparent'
                    }
                >
                    Notes
                </NavLink>

                {isAdminOrSuper && (
                    <NavLink
                        to='/account/workshops'
                        className={({ isActive }) =>
                            isActive
                                ? 'border-[1px] p-1.5 rounded border-green-dark'
                                : 'border-[1px] p-1.5 border-transparent'
                        }
                    >
                        Workshops
                    </NavLink>
                )}
                <NavLink
                    to='/account/editprofile'
                    className={({ isActive }) =>
                        isActive
                            ? 'border-[1px] p-1.5 rounded border-green-dark'
                            : 'border-[1px] p-1.5 border-transparent'
                    }
                >
                    Edit Profile
                </NavLink>
            </section>
            <section className='p-8'>
                <Outlet />
            </section>
        </main>
    );
};
export default Account;
