import { NavLink, useOutletContext } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const HeroPostNoteBtn = () => {
    const { auth } = useAuth();
    const handleRedirect = useOutletContext()

    return (
        <section className='flex flex-col items-center space-y-6 md:mx-0 md:border-t-[1px] border-purple-dark/80 pt-6 lg:w-11/12'>
            <h3 className='font-main text-xl font-light italic'>
                Got a note to add to a workshop?
            </h3>
            {auth.token ? (
                <NavLink
                    className='py-3 px-5 rounded bg-yellow-light/95 border-[1px] border-yellow-dark/60 font-accent tracking-wide text-3xl shadow-sm shadow-yellow-dark md:text-4xl hover:shadow-lg hover:shadow-yellow-dark ease-in-out duration-500'
                    to='/newnote'
                >
                    Post-A-Note
                </NavLink>
            ) : (
                <button
                    className='py-3 px-5 rounded bg-yellow-light/95 border-[1px] border-yellow-dark/60 font-accent tracking-wide text-3xl shadow-sm shadow-yellow-dark md:text-4xl hover:shadow-lg hover:shadow-yellow-dark ease-in-out duration-500'
                    onClick={handleRedirect}
                >
                    Post-A-Note
                </button>
            )}
        </section>
    );
};
export default HeroPostNoteBtn;
