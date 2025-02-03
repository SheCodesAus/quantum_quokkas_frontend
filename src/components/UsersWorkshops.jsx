import { useAuth } from '../hooks/use-auth';
import { Link } from 'react-router-dom';
import useStatus from '../hooks/use-status';
import EditWorkshopForm from '../components/EditWorkshopForm';

const UsersWorkshops = () => {
    const { auth } = useAuth();
    const { isAdminOrSuper } = useStatus(auth.userId);
    return (
        <main className='space-y-10 lg:-space-y-0 lg:grid grid-cols-2 xl:ml-24'>
            <div className='w-fit mx-auto lg:my-12 xl:mx-0 lg:row-start-1 lg:col-start-2'>
                {/* Create Workshop */}
                {isAdminOrSuper && (
                    <Link
                        className='border-[1px] font-accent tracking-wider text-lg py-2 px-5 rounded bg-green-dark/60 shadow-md shadow-green-dark'
                        to='/newworkshop'
                    >
                        Add A Workshop
                    </Link>
                )}
            </div>
            <div className='lg:w-[500px] lg:row-start-1 lg:col-start-1'>
                <EditWorkshopForm />
            </div>
        </main>
    );
};
export default UsersWorkshops;
