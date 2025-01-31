import useActiveWorkshops from '../hooks/use-active-workshops';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import WorkshopCard from './WorkshopCard';

const RecentWorkshops = () => {
    const { workshops, isLoading, error } = useActiveWorkshops();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <main className='font-main mt-10 md:mt-5 lg:mt-0'>
            {/* Title */}
            <h2 className='text-2xl font-light md:3xl pl-12 md:mr-2 pt-6 pb-3 mb-4 border-b-[2px] border-purple-dark'>
                Recent Workshops
            </h2>
            {error ? (
                <ErrorMessage errorMessage={error.message} />
            ) : (
                <section className='font-main p-2 lg:flex overflow-x-auto w-full gap-8 space-y-4 lg:space-y-0'>
                    <WorkshopCard
                        workshops={workshops}
                        color='purple'
                        truncate='true'
                    />
                </section>
            )}
        </main>
    );
};
export default RecentWorkshops;
