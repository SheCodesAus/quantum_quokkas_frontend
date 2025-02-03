import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/use-user';
import putUser from '../api/put/put-edit-profile';

const EditProfileForm = ({setEditing}) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { user } = useUser(auth.userId);

    const [userDetails, setUserDetails] = useState({
        username: '',
        fname: '',
        lname: '',
        email: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await putUser(
                userDetails?.username,
                userDetails?.fname,
                userDetails?.lname,
                userDetails?.email,
                user,
                auth.token
            );
            navigate('/account/usersprofile');
        } catch (error) {}
    };

    return (
            <form
                className='flex flex-col space-y-2.5 mt-4 lg:w-[500px]'
                onSubmit={handleSubmit}
            >
                {/* First Name */}

                <label className='font-semibold' htmlFor='fname'>
                    First Name
                </label>
                <input
                    className='p-2 rounded w-[200px]'
                    onChange={handleChange}
                    type='text'
                    id='fname'
                    placeholder={user?.first_name}
                />

                {/* Last Name */}
                <label
                    className='border-t-[1px] pt-2.5 font-semibold'
                    htmlFor='lname'
                >
                    Last Name
                </label>
                <input
                    className='p-2 rounded w-[200px]'
                    onChange={handleChange}
                    type='text'
                    id='lname'
                    placeholder={user?.last_name}
                />

                {/* Email */}
                <label
                    className='border-t-[1px] pt-2 font-semibold'
                    htmlFor='email'
                >
                    Email
                </label>
                <input
                    className='p-2 rounded w-[290px]'
                    onChange={handleChange}
                    type='email'
                    id='email'
                    placeholder={user?.email}
                />

                {/* Username */}
                <label
                    className='border-t-[1px] pt-2 font-semibold'
                    htmlFor='username'
                >
                    Username
                </label>
                <input
                    className='p-2 rounded w-[220px]'
                    onChange={handleChange}
                    type='text'
                    id='username'
                    placeholder={user?.username}
                />

                <div className='border-t-[1px] pt-6 flex justify-center'>
                    <button
                        className='py-1.5 px-3 rounded bg-green-dark/60 tracking-wide font-accent text-xl shadow-md shadow-green-dark md:text-2xl'
                        type='submit'
                    >
                        Save
                    </button>
                </div>
            </form>
    );
};
export default EditProfileForm;
