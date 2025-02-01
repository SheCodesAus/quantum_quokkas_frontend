import { NavLink, useOutletContext } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const PostNoteBtn = ({color, selectedWorkshop}) => {
    const { auth } = useAuth();
    const handleRedirect = useOutletContext();

    return (
        <>
            {auth.token ? (
                <NavLink
                    className={`flex w-full h-full justify-center items-center rounded border-[1px] font-accent tracking-wide text-2xl shadow-sm md:text-3xl hover:shadow-lg ease-in-out duration-500 ${
                        color === 'yellow'
                            ? 'bg-yellow-light/95 border-yellow-dark/60 hover:shadow-yellow-dark'
                            : 'bg-pink-light/95 border-pink-dark/60 shadow-pink-dark hover:shadow-pink-dark'
                    }`}
                    to='/newnote'
                    state={{selectedWorkshop: selectedWorkshop}}
                >
                    Post-A-Note
                </NavLink>
            ) : (
                <button
                    className={`flex w-full h-full justify-center items-center rounded border-[1px] font-accent tracking-wide text-2xl shadow-sm md:text-3xl hover:shadow-lg ease-in-out duration-500 ${
                        color === 'yellow'
                            ? 'bg-yellow-light/95 border-yellow-dark/60 shadow-yellow-dark hover:shadow-yellow-dark'
                            : 'bg-pink-light/95 border-pink-dark/60 shadow-pink-dark hover:shadow-pink-dark'
                    }`}
                    onClick={handleRedirect}
                >
                    Post-A-Note
                </button>
            )}
        </>
    );
};
export default PostNoteBtn;
