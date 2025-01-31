import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import toast from 'react-hot-toast';

const Footer = () => {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        toast('Goodbye!');
        setTimeout(() => {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user_id');
            window.localStorage.removeItem('first_name');
            setAuth({ token: null, user: '', firstName: '' });
            navigate(0);
        }, 700);
    };

    return (
        <footer className='h-fit pb-3 pt-4 font-accent tracking-wider mt-4'>
            {auth.token ? (
                <ul
                    role='list'
                    className='grid grid-cols-4 place-items-center gap-y-3 md:grid-cols-5'
                >
                    <li className='w-fit'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='w-fit'>
                        <Link to='/newnote'>Post-a-Note</Link>
                    </li>
                    <li className='w-fit'>
                        <Link to='/workshops'>Workshops</Link>
                    </li>
                    <li className='w-fit'>
                        <Link to='/account'>Account</Link>
                    </li>
                    <li className='w-fit col-span-4 md:col-span-1'>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            ) : (
                <ul
                    role='list'
                    className='grid grid-cols-4 place-items-center gap-y-3'
                >
                    <li className='w-fit'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='w-fit'>
                        <Link to='/workshops'>Workshops</Link>
                    </li>
                    <li className='w-fit'>
                        <Link to='/login'>Log In</Link>
                    </li>
                    <li className='w-fit'>
                        <Link to='/signup'>Sign Up</Link>
                    </li>
                </ul>
            )}
        </footer>
    );
};
export default Footer;
