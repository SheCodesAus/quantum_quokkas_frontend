import { useEffect, useRef, useState } from 'react';
import useRecentNotes from '../hooks/use-recent-notes';
import Loader from './Loader';
import Error from './Error';

const HeroBanner = () => {
    const { notes, isLoading, error } = useRecentNotes();
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const increaseIndex = () => {
            //setIndex((prev) => (prev + 1) % notes.length);
            setIndex((prev) => (prev + 1) % 5);
        };
        intervalRef.current = setInterval(increaseIndex, 3500);

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
        <article className='bg-hero bg-cover size-80 flex flex-col justify-center mx-auto md:mx-10 lg:mx-0 xl:mx-auto md:size-96'>
            {/* Text Container */}
            <div className='p-6 mt-14 md:mt-20 md:ml-4 h-full flex flex-col justify-between font-note'>
                {/* Note Content */}
                {/* <p className='max-w-[90%] text-xl md:text-2xl'> */}
                <p
                    className={`font-note tracking-wide w-60 h-fit ${
                        // less than 20 char
                        notes[index].content.length <= 20
                            ? 'text-6xl'
                            : // more than 20 but less than 40 char
                            notes[index].content.length > 20 &&
                              notes[index].content.length <= 40
                            ? 'text-4xl'
                            : // more than 40 but less than 60 char
                            notes[index].content.length > 40 &&
                              notes[index].content.length <= 60
                            ? 'text-3xl'
                            : // more than 60 char
                              'text-2xl pt-5'
                    }`}
                >
                    {notes[index]?.content}
                </p>
                {/* Name of Note Poster */}
                <p className='text-3xl md:text-3xl'>
                    - {notes[index]?.user.first_name}
                </p>
            </div>
        </article>
    );
};
export default HeroBanner;
