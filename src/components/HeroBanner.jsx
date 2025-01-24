import { useEffect, useRef, useState } from 'react';
import useNotes from '../hooks/use-notes';
import Loader from './Loader';
import Error from './Error';

const HeroBanner = () => {
    const { notes, isLoading, error } = useNotes();
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const increaseIndex = () => {
            setIndex((prev) => (prev + 1) % notes.length);
            //setIndex((prev) => (prev + 1) % 5);
        };
        intervalRef.current = setInterval(increaseIndex, 3500);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [notes]);

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <Error errorMessage={error.message} />
    }

    return (
        <article className='bg-hero bg-cover size-80 flex flex-col justify-center items-center mx-auto md:mx-10 lg:mx-0 xl:mx-auto md:size-96'>
            <div className='p-6 mt-14 md:mt-20 md:ml-4 h-full flex flex-col justify-between font-note'>
                
                {/* Note Content */}
                <p className='max-w-[90%] text-xl md:text-2xl'>
                    {notes[index]?.content}
                </p>
                
                {/* Name of Note Poster */}
                <p className='text-2xl md:text-3xl'>- {notes[index]?.user.first_name}</p>
            </div>
        </article>
    );
};
export default HeroBanner;

