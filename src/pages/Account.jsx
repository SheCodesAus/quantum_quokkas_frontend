import { Link, NavLink, Outlet } from 'react-router-dom';
import UsersNotes from '../components/UsersNotes';
import UsersWorkshops from '../components/UsersWorkshops';

const Account = () => {
    return (
        <main>
            <h1 className='font-head text-3xl text-center'>
                Welcome, username
            </h1>
            <section className='flex p-6 w-full justify-between text-lg'>
                <NavLink
                    to='/account/notes'
                    className={({ isActive }) =>
                        isActive
                            ? 'border-b-2 rounded'
                            : ''
                    }
                >
                    Notes
                </NavLink>
                <NavLink
                    to='/account/workshops'
                    className={({ isActive }) =>
                        isActive
                            ? 'border-b-2'
                            : ''
                    }
                >
                    Workshops
                </NavLink>
                <NavLink
                    to='/account/editprofile'
                    className={({ isActive }) =>
                        isActive
                            ? 'border-b-2'
                            : ''
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
