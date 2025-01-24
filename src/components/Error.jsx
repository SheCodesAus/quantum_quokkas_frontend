import { Link, useLocation } from 'react-router-dom';

const Error = ({ errorMessage }) => {
    const location = useLocation();

    return (
        <div className='flex flex-col items-center mt-6 md:mt-12 lg:mt-32'>
            <h1>{errorMessage}</h1>
            {location.pathname !== '/' && <Link to='/'>Head Back</Link>}
        </div>
    );
};
export default Error;
