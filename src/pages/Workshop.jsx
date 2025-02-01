import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utils/date-formatter';
import useWorkshop from '../hooks/use-workshop';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import PostNoteBtn from '../components/PostNoteBtn';
import PostNoteCard from '../components/PostNoteCard';
import ErrorPage from './ErrorPage';

import pink from '/custom-btns/pink-search.svg';

const Workshop = () => {
    const { id } = useParams();
    const { workshop, setWorkshop, isLoading, error } = useWorkshop(id);

    // logic to display post-note-btn
    const [canPostNote, setCanPostNote] = useState(true);

    useEffect(() => {
        if (!workshop?.start_date) return;

        const workshopDate = new Date(workshop?.start_date);
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        if (workshopDate > today || workshopDate < thirtyDaysAgo) {
            setCanPostNote(false);
        } else {
            setCanPostNote(true);
        }
    }, [workshop?.start_date]);

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
        return <ErrorPage errorMessage={error.message} />;
    }

    return (
        <main className='min-h-screen md:mt-8 md:ml-44 lg:ml-48 font-main lg:grid grid-cols-2 auto-rows-min'>
            <aside className='lg:w-[340px] space-y-4'>
                {/* Title */}
                <h1 className='text-3xl font-accent tracking-wider pl-5 mb-2 text-center'>
                    {workshop?.title}
                </h1>

                {/* Owner */}
                <h2 className='font-accent tracking wide text-xl text-center'>
                    - Hosted by {workshop?.owner.first_name} -
                </h2>

                {/* Date */}
                <p className='font-light text-center'>
                    {formatDate(workshop?.start_date)}
                </p>

                {/* Description */}
                <p className='w-4/5 mx-auto font-light md:text-lg'>
                    {workshop?.description}
                </p>

                {/* Post Note Button Container */}
                <section className='w-36 h-12 mx-auto mt-4 md:w-44 md:h-14'>
                    {canPostNote ? (
                        // Workshop accepting notes
                        <PostNoteBtn
                            selectedWorkshop={workshop}
                            color='pink'
                        />
                    ) : (
                        // Workshop not accepting notes
                        <p className='font-light w-72 ml-[-50px] italic'>
                            Notes for this workshop are closed
                        </p>
                    )}
                </section>
            </aside>

            {/* Searchbar */}
            <section className='w-fit mx-auto mt-4 lg:mt-0 lg:mx-0 lg:col-start-2 lg:row-start-1 relative z-100'>
                <SearchBar
                    list={workshop?.notes}
                    filterFunc={filterWorkshopNotes}
                    filterByKeyword={filterByKeyword}
                    color='pink'
                    image={pink}
                    placeholder={`Search ${workshop?.notes.length} notes`}
                />
            </section>

            {/* List of Workshop's Notes */}
            <section className='lg:col-start-2 lg:row-start-1 lg:mt-20'>
                <PostNoteCard notes={workshop} />
            </section>
        </main>
    );
};
export default Workshop;
