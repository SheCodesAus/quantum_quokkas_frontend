import { Link, useLocation } from 'react-router-dom';

const ErrorMessage = ({ errorMessage }) => {
    const location = useLocation();

    return (
        <div className='p-5'>
            <h1 className='font-accent tracking-wider text-xl text-center md:text-2xl'>
                {errorMessage}
            </h1>
        </div>
    );
};
export default ErrorMessage;
