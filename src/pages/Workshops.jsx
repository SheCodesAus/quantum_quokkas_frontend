import { Link } from 'react-router-dom';
import useWorkshops from '../hooks/use-workshops';
import Loader from '../components/Loader';
import Error from '../components/Error';
import AddWorkshopButton from '../components/AddWorkshopButton';
import SearchBar from '../components/SearchBar';
import orange from '/custom-btns/orange-search.svg';
import { useAuth } from '../hooks/use-auth';

const Workshops = () => {
    const { workshops, setWorkshops, isLoading, error } = useWorkshops();
    const {auth} = useAuth()
    console.log(auth.isSuper, auth.isAdmin)
    // Callback function to filter workshops
    const filterWorkshops = (filteredList) => {
        setWorkshops(filteredList);
    };

    const filterByKeyword = (listToFilter, wordToSearch) => {
        return listToFilter.filter((item) =>
            item.title.toLowerCase().includes(wordToSearch.toLowerCase())
        );
    };

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + `...`;
        } else return str;
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error errorMessage={error.message} />;
    }

    return (
        <main className='min-h-screen font-main space-y-8 md:mt-8 md:ml-48'>
            {/* Workshops Heading */}
            <h1 className='text-3xl text-center font-light md:text-start lg:ml-12'>
                All Workshops
            </h1>
            {auth.isSuper || auth.isAdmin ? (
                <AddWorkshopButton />
            ): null}

            {/* Searchbar */}
            <div className='w-fit mx-auto lg:mx-0 lg:ml-16'>
                <SearchBar
                    list={workshops}
                    filterFunc={filterWorkshops}
                    filterByKeyword={filterByKeyword}
                    color='orange'
                    image={orange}
                />
            </div>

            {/* List of Workshops */}
            <section className='font-main p-2 w-full gap-8 space-y-4 lg:w-fit lg:mx-auto xl:grid grid-cols-2 xl:space-y-0'>
                {workshops.map((workshop) => {
                    return (
                        <article
                            key={workshop.id}
                            className='px-6 py-8 space-y-4 bg-orange-light/50 rounded shadow-orange-dark shadow-md md:w-[4/5] lg:w-[650px] xl:w-[520px] xl:flex xl:flex-col xl:justify-between'
                        >
                            <h3 className='text-2xl font-accent tracking-wider pl-2'>
                                {workshop.title}
                            </h3>
                            <p className='font-light text-lg px-4'>
                                {truncateString(workshop.description, 240)}
                            </p>
                            <div className='w-fit ml-auto font-accent text-2xl border-[1px] border-orange-dark/40 hover:border-orange-dark duration-300 ease-in-out px-3 py-1 rounded'>
                                <Link to={`/workshop/${workshop.id}`}>
                                    View
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </section>
        </main>
    );
};
export default Workshops;
