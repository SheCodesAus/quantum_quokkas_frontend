import { Link, useLocation } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const ErrorPage = ({ errorMessage }) => {
    const location = useLocation();

    return (
        <div className='flex flex-col items-center w-fit mx-auto gap-10 mt-6 md:mt-8 lg:mt-16'>
            <div className='bg-error-note bg-cover size-80 -skew-y-6 skew-x-6 md:size-96'>
                <div className='skew-y-6 -skew-x-6 mt-24 w-64 mx-auto md:w-80 md:mt-32'>
                    <ErrorMessage errorMessage={errorMessage} />
                </div>
            </div>
            {location.pathname !== '/' && (
                <Link
                    className='border-[1px] border-red-dark py-2 px-3 font-accent tracking-wider text-2xl rounded shadow-md shadow-red-dark bg-red-light/70 hover:shadow-lg hover:shadow-red-dark ease-in-out duration-300'
                    to='/'
                >
                    Head Back
                </Link>
            )}
        </div>
    );
};
export default ErrorPage;
