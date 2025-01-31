import { useAuth } from '../hooks/use-auth';
import useWorkshops from '../hooks/use-workshops';
import Loader from '../components/Loader';
import AddWorkshopButton from '../components/AddWorkshopButton';
import SearchBar from '../components/SearchBar';
import WorkshopCard from '../components/WorkshopCard';
import orange from '/custom-btns/orange-search.svg';
import ErrorPage from './ErrorPage';
import { useState } from 'react';
import useStatus from '../hooks/use-status';

const Workshops = () => {
    const { workshops, setWorkshops, isLoading, error } = useWorkshops();
    const { auth } = useAuth();
    const { isAdminOrSuper } = useStatus(auth.userId);

    // Callback function to filter workshops
    const filterWorkshops = (filteredList) => {
        setWorkshops(filteredList);
    };

    const filterByKeyword = (listToFilter, wordToSearch) => {
        return listToFilter.filter((item) =>
            item.title.toLowerCase().includes(wordToSearch.toLowerCase())
        );
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorPage errorMessage={error.message} />;
    }

    return (
        <main className='min-h-screen font-main space-y-8 md:mt-8 md:ml-48'>
            {/* Workshops Heading */}
            <h1 className='text-4xl text-center font-light font-accent tracking-wider md:text-start lg:ml-12 lg:text-5xl'>
                Post
                <span className='font-accent text-5xl ml-1 mr-1.5 lg:text-7xl'>
                    it
                </span>
                ivity Workshops
            </h1>
            
            {/* Add Workshop Btn */}
            {isAdminOrSuper && <AddWorkshopButton />}

            {/* Searchbar */}
            <div className='w-fit mx-auto lg:mx-0 lg:ml-16'>
                <SearchBar
                    list={workshops}
                    filterFunc={filterWorkshops}
                    filterByKeyword={filterByKeyword}
                    color='orange'
                    image={orange}
                    placeholder={`Search ${workshops.length} workshops`}
                />
            </div>

            {/* List of Workshops */}
            <section className='font-main p-2 w-full space-y-4 lg:w-fit lg:mx-auto'>
                <WorkshopCard
                    workshops={workshops}
                    color='orange'
                    truncate='false'
                />
            </section>
        </main>
    );
};
export default Workshops;
