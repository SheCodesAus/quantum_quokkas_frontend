import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import UsersNotes from '../components/UsersNotes';
import UsersWorkshops from '../components/UsersWorkshops';

const Account = () => {
    const { auth } = useAuth();

    return (
        <main className='min-h-screen md:border-l-[1px] border-green-dark md:mt-8 md:ml-48 lg:ml-52 xl:ml-60'>
            <h1 className='font-main text-3xl text-center'>
                Welcome, {auth.firstName}
            </h1>
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
