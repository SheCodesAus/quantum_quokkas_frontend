import { useEffect, useState, useRef } from 'react';

import pink from '/note-icons/pink.png';
import green from '/note-icons/green.png';
import purple from '/note-icons/purple.png';

const Loader = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev)
        }, 550);

        return () => clearInterval(interval);
    }, []);

    const style = {
        img: `w-7 md:w-9 lg:w-12 ease-in-out duration-[500ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`,
    };

    return (
        <div className='flex justify-center space-x-6 mt-14 md:mt-20 lg:mt-40'>
            <img
                className={`${style.img}`}
                src={pink}
                alt='Pink cartoon-style illustration of a post-it note'
            />
            <img
                className={`${style.img} delay-[150ms]`}
                src={green}
                alt='Green cartoon-style illustration of a post-it note'
            />
            <img
                className={`${style.img} ease-in-out delay-[300ms]`}
                src={purple}
                alt='Purple cartoon-style illustration of a post-it note'
            />
        </div>
    );
};
export default Loader;
