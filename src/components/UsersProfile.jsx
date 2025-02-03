import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import useUser from '../hooks/use-user';
import UsersDetails from './UsersDetails';
import EditProfileForm from './EditProfileForm';

const UsersProfile = () => {
    const { auth } = useAuth();
    const { user } = useUser(auth.userId);
    const [editing, setEditing] = useState(false);

    const editProfile = () => setEditing(!editing)

    return (
        <section className='lg:ml-20'>
            {editing && (
                <button
                    onClick={editProfile}
                    className='text-4xl relative z-100'
                >
                    <IoArrowBackCircleOutline />
                </button>
            )}
            {editing ? (
                <EditProfileForm setEditing={setEditing} />
            ) : (
                <UsersDetails user={user} />
            )}
            {!editing && (
                <button
                    className='border-[1px] font-accent tracking-wider text-lg lg:text-2xl py-2 px-5 rounded bg-green-dark/60 shadow-md shadow-green-dark'
                    onClick={editProfile}
                >
                    Update Details
                </button>
            )}
        </section>
    );
};
export default UsersProfile;
