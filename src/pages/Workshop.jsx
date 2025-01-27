import { useParams } from 'react-router-dom';
import useWorkshop from '../hooks/use-workshop';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SearchBar from '../components/SearchBar';
import pink from '/custom-btns/pink-search.svg';

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
            <h1 className='text-2xl md:text-3xl pl-5 mb-2'>
                {workshop?.title}
            </h1>

            {/* Description */}
            <p className='w-4/5 mx-auto font-light md:text-lg lg:w-3/5'>
                {workshop?.description}
            </p>

            {/* Searchbar */}
            <SearchBar
                list={workshop?.notes}
                filterFunc={filterWorkshopNotes}
                filterByKeyword={filterByKeyword}
                color='pink'
                image={pink}
                placeholder={`Search notes`}
            />

            {/* List of Workshop's Notes */}
            <section className='grid grid-cols-1 w-fit mx-auto my-4 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
                {workshop?.notes.map((note) => {
                    return (
                        <article
                            key={note.id}
                            className='bg-note bg-cover size-64 md:size-60 lg:size-64 flex justify-center'
                        >
                            <p className='-ml-4 w-[70%] text-xl font-note mt-14 md:w-[75%] md:mt-14 lg:w-[78%] lg:mt-16'>
                                {note.content}
                            </p>
                        </article>
                    );
                })}
            </section>
        </main>
    );
};
export default Workshop;
