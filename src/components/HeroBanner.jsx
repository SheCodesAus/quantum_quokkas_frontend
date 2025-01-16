import { useEffect, useRef, useState } from 'react';
import { notes } from '../utils/notes-data';
import noteBg from '/custom-btns/newnote.png';

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
        <section>
            <article className='bg-hero bg-cover size-80 font-note text-xl flex flex-col justify-center items-center mx-auto md:mx-0'>
                <div className='p-6 mt-14 h-full flex flex-col justify-between'>
                    <p className='max-w-[90%]'>{notes[index]?.content}</p>
                    <p className='text-2xl'>- {notes[index]?.user}</p>
                </div>
            </article>
        </section>
    );
};
export default HeroBanner;

/**
 * this component will return 10 recently posted notes to 'slideshow'
 * will be rendered on the home page
 */
