import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import useStatus from '../hooks/use-status';

const Account = () => {
    const { auth } = useAuth();
    const { isAdminOrSuper } = useStatus(auth.userId);

    return (
        <main className='min-h-screen md:border-l-[1px] font-main border-green-dark md:ml-48 lg:ml-52 xl:ml-60'>
            <h1 className='font-main font-light text-3xl text-center mb-6 md:text-left md:ml-8 lg:ml-12 md:pt-4'>
                Welcome, {auth.firstName}!
            </h1>
            <section className='flex w-full justify-between px-3 py-4 text-lg font-light border-b-[1px] border-green-dark md:px-6 md:border-transparent md:text-xl lg:justify-around relative z-100'>
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
                    to='/account/usersprofile'
                    className={({ isActive }) =>
                        isActive
                            ? 'border-[1px] p-1.5 rounded border-green-dark'
                            : 'border-[1px] p-1.5 border-transparent'
                    }
                >
                    Profile
                </NavLink>
            </section>
            <section className='p-8'>
                <Outlet />
            </section>
        </main>
    );
};
export default Account;
