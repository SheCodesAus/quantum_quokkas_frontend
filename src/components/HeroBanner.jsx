import { useEffect, useRef, useState } from 'react';
import useRecentNotes from '../hooks/use-recent-notes';
import Loader from './Loader';
import Error from './ErrorMessage';

const HeroBanner = () => {
    const { notes, isLoading, error } = useRecentNotes();
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const increaseIndex = () => {
            setIndex((prev) => (prev + 1) % 5);
        };
        intervalRef.current = setInterval(increaseIndex, 2000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [notes]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error errorMessage={error.message} />;
    }

    return (
        <article className='bg-hero bg-cover size-80 flex flex-col justify-center mx-auto lg:mx-0 xl:mx-auto'>
            {/* Text Container */}
            <div className='p-6 mt-12 h-full flex flex-col justify-between font-note'>
                {/* Note Content */}
                <p
                    className={`font-note tracking-wide text-center w-60 h-fit ${
                        // less than 15 characters
                        notes[index].content.length <= 15
                            ? 'text-6xl mt-2'
                            : // more than 15 but less than 30 characters
                            notes[index].content.length > 15 &&
                              notes[index].content.length <= 30
                            ? 'text-5xl mt-2'
                            : // more than 30 but less than 45
                            notes[index].content.length > 30 &&
                              notes[index].content.length <= 45
                            ? 'text-4xl mt-1'
                            : // more than 45 but less than 60 characters
                            notes[index].content.length > 45 &&
                              notes[index].content.length <= 65
                            ? 'text-3xl'
                            : // more than 60 characters
                              'text-2xl'
                    }`}
                >
                    {notes[index]?.content}
                </p>
                {/* Name of Note Poster */}
                <p className='text-3xl mb-[-10px]'>
                    - {notes[index]?.user.first_name}
                </p>
            </div>
        </article>
    );
};
export default HeroBanner;
