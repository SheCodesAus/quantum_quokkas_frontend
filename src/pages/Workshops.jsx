import { Link, NavLink } from 'react-router-dom';
import useWorkshops from '../hooks/use-workshops';

const Workshops = () => {
    const {workshops, isLoading, error} = useWorkshops()

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + `...`;
        } else return str;
    };

    return (
        <main className='min-h-screen font-main space-y-8 md:mt-8 md:ml-48 lg:ml-52 xl:ml-56'>

            {/* Workshops Heading */}
            <h1 className='text-2xl text-center md:text-start lg:text-3xl lg:ml-12'>All Workshops</h1>

            {/* Searchbar */}
            <div className='space-x-4 w-fit mx-auto'>
                <label htmlFor='search-workshops'>Search</label>
                <input
                    className='bg-orange-light/30 rounded p-2 w-72'
                    type='search'
                />
            </div>

            {/* List of Workshops */}
            <section className='font-main p-2 w-full gap-8 space-y-4 lg:w-fit lg:mx-auto'>
                {workshops.map((workshop) => {
                    return (
                        <article
                            key={workshop.id}
                            className='px-6 py-8 space-y-4 bg-orange-light/50 rounded shadow-orange-dark shadow-md md:w-[4/5] lg:w-[650px]'
                        >
                            <h3 className='text-2xl font-accent tracking-wider pl-2'>
                                {workshop.title}
                            </h3>
                            <h4 className='pl-4 text-xl'>
                                {workshop.organisation}
                            </h4>
                            <p className='font-light text-lg px-4'>
                                {truncateString(workshop.description, 240)}
                            </p>
                            <div className='w-fit ml-auto font-accent text-2xl border-[1px] border-orange-dark/40 hover:border-orange-dark duration-300 ease-in-out px-3 py-1 rounded'>
                                <Link to={`/workshop/${workshop.id}`}>View</Link>
                            </div>
                        </article>
                    );
                })}
            </section>
        </main>
    );
};
export default Workshops;
