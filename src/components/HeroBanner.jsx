import { useEffect, useRef, useState } from 'react';
import { notes } from '../utils/notes-data';

const HeroBanner = () => {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const increaseIndex = () => {
            setIndex((prev) => (prev + 1) % notes.length);
        };
        intervalRef.current = setInterval(increaseIndex, 4000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [notes]);

    return (
        <article className='bg-hero bg-cover size-80 flex flex-col justify-center items-center mx-auto md:mx-10 lg:mx-0 xl:mx-auto md:size-96'>
            <div className='p-6 mt-14 md:mt-20 md:ml-4 h-full flex flex-col justify-between font-note'>
                <p className='max-w-[90%] text-xl md:text-2xl'>
                    {notes[index]?.content}
                </p>
                <p className='text-2xl md:text-3xl'>- {notes[index]?.user}</p>
            </div>
        </article>
    );
};
export default HeroBanner;

/**
 * this component will return 10 recently posted notes to 'slideshow'
 * will be rendered on the home page
 */
