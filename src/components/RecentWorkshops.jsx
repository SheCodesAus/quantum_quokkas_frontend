import { Link } from 'react-router-dom';
import { workshops } from '../utils/workshops';

const RecentWorkshops = () => {
    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + `...`;
        } else return str;
    };
    return (
        <main className='font-main mt-10 md:mt-24'>
            <h2 className='text-2xl font-light md:3xl pl-12 md:mr-2 pt-6 pb-3 mb-4 border-b-[2px] border-purple-dark rounded'>
                Upcoming Workshops
            </h2>
            <section className='font-main p-2 lg:flex overflow-x-auto w-full gap-8 space-y-4 lg:space-y-0'>
                {workshops.map((workshop) => {
                    return (
                        <article
                            key={workshop.id}
                            className='px-6 py-8 lg:w-[500px] space-y-4 flex-shrink-0 bg-purple-light/70 rounded shadow-purple-dark shadow-md'
                        >
                            <h3 className='text-2xl font-accent tracking-wider md:text-2xl pl-2'>
                                {workshop?.title}
                            </h3>
                            <h4 className='pl-4 text-xl'>{workshop.organisation}</h4>
                            <p className='font-light text-lg md:text-xl px-4'>
                                {truncateString(workshop?.description, 240)}
                            </p>
                            <div className='w-fit ml-auto font-accent text-2xl md:text-3xl border-[1px] border-purple-dark/40 hover:border-purple-dark duration-300 ease-in-out px-3 py-1 rounded'>
                                <Link to='/workshop'>View</Link>
                            </div>
                        </article>
                    );
                })}
            </section>
        </main>
    );
};
export default RecentWorkshops;
