import { useParams } from 'react-router-dom';
import useWorkshop from '../hooks/use-workshop';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SearchBar from '../components/SearchBar';
import pink from '/custom-btns/pink-search.svg';
import PostNoteBtn from '../components/PostNoteBtn';
import { useEffect, useState } from 'react';
import PostNoteCard from '../components/PostNoteCard';

const Workshop = () => {
    const { id } = useParams();
    const { workshop, setWorkshop, isLoading, error } = useWorkshop(id);

    // callback function to filter notes
    const filterWorkshopNotes = (filteredList) => {
        setWorkshop({
            ...workshop,
            notes: filteredList,
        });
    };

    const filterByKeyword = (listToFilter, wordToSearch) => {
        return listToFilter.filter((item) =>
            item.content.toLowerCase().includes(wordToSearch.toLowerCase())
        );
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error errorMessage={error.message} />;
    }

    return (
        <main className='min-h-screen md:mt-8 md:ml-48 lg:ml-52 xl:ml-60 font-main'>
            {/* Workshop Title */}
            <h1 className='text-3xl font-accent tracking-wide pl-5 mb-2'>
                {workshop?.title}
            </h1>

            {/* Description */}
            <p className='w-4/5 mx-auto font-light md:text-lg lg:w-3/5'>
                {workshop?.description}
            </p>

            {/* Post Note Button & Searchbar Container */}
            <div className='flex flex-col items-center mx-auto mt-4 gap-4 md:flex-row md:items-start md:justify-evenly'>
                <section className='w-36 h-12 md:w-44 md:h-14'>
                    <PostNoteBtn workshopTitle={workshop?.title} color='pink' />
                </section>
                <div className='md:mt-12'>
                    {/* Searchbar */}
                    <SearchBar
                        list={workshop?.notes}
                        filterFunc={filterWorkshopNotes}
                        filterByKeyword={filterByKeyword}
                        color='pink'
                        image={pink}
                        placeholder={`Search notes`}
                    />
                </div>
            </div>

            {/* List of Workshop's Notes */}
            <PostNoteCard notes={workshop} />
        </main>
    );
};
export default Workshop;
