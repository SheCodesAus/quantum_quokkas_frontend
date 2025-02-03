import { Link } from 'react-router-dom';
import { formatDate } from '../utils/date-formatter';
import { truncateString } from '../utils/truncate-string';
import pin from '/custom-btns/pin.svg';

const WorkshopCard = ({ workshops, color, truncate }) => {

    const checkForZero = (length) => {
        if (length > 0) {
            return (
                <div className='flex gap-2'>
                    <img src={pin} className='w-5' alt='' />
                    <p className='font-light'>
                        {length} notes posted
                    </p>
                </div>
            );
        } else return null
    }

    return (
        <>
            {workshops.map((workshop) => {
                return (
                    <article
                        key={workshop?.id}
                        className={`${
                            color === 'purple'
                                ? 'bg-purple-light/70 rounded shadow-purple-dark lg:w-[500px]'
                                : 'bg-orange-light/50 rounded shadow-orange-dark lg:w-[700px] xl:w-[800px]'
                        } px-6 py-8 space-y-4 flex-shrink-0 rounded shadow-md lg:space-y-6`}
                    >
                        {/* Title */}
                        <h3 className='text-2xl font-accent tracking-wider lg:text-3xl'>
                            {workshop?.title}
                        </h3>
                        {/* Owner */}
                        <h3 className='text-xl font-accent tracking-wide pl-5 lg:text-2xl'>
                            Hosted by {workshop?.owner?.first_name}
                        </h3>
                        {/* Notes Total */}
                        {/* <div className='flex gap-2'>
                            <img src={pin} className='w-5' alt='' />
                            <p className='font-light'>{workshop?.notes.length} notes posted</p>
                        </div> */}
                        {checkForZero(workshop?.notes.length)}
                        {/* Description */}
                        <p
                            className={`${
                                color === 'purple' ? '' : 'lg:min-h-0'
                            } font-light text-lg px-4 lg:text-xl lg:min-h-[150px]`}
                        >
                            {truncate === 'true'
                                ? truncateString(workshop?.description, 120)
                                : workshop?.description}
                        </p>
                        {/* Date */}
                        <h4
                            className={`${
                                color === 'purple'
                                    ? 'border-purple-dark'
                                    : 'border-orange-dark'
                            } text-lg font-light border-b-[1px] w-2/5 pb-2`}
                        >
                            {formatDate(workshop?.start_date)}
                        </h4>

                        {/* Link to specific workshop */}
                        <div
                            className={`${
                                color === 'purple'
                                    ? 'border-purple-dark/40 hover:border-purple-dark'
                                    : 'border-orange-dark/40 hover:border-orange-dark'
                            } w-fit ml-auto font-accent text-2xl border-[1px] duration-300 ease-in-out px-3 py-1 rounded lg:text-3xl`}
                        >
                            <Link to={`/workshop/${workshop.id}`}>View</Link>
                        </div>
                    </article>
                );
            })}
        </>
    );
};
export default WorkshopCard;
