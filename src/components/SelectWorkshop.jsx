import { useState, useEffect } from 'react';
import {
    HiOutlineChevronDoubleDown,
    HiOutlineChevronDoubleUp,
} from 'react-icons/hi';

const SelectWorkshop = ({
    workshops,
    noteData,
    setNoteData,
    workshopTitle,
}) => {
    const title = workshopTitle ? workshopTitle : 'Select workshop';

    const [choosingWorkshop, setChoosingWorkshop] = useState(false);
    const [selectMenuTitle, setSelectMenuTitle] = useState(title);

    const toggleDropdown = () => {
        setChoosingWorkshop(!choosingWorkshop);
    };

    //Add useEffect to set initial workshop title
    // useEffect(() => {
    //     if (noteData.workshop && workshops) {
    //         const currentWorkshop = workshops.find(w => w.id === Number(noteData.workshop));
    //         if (currentWorkshop) {
    //             setSelectMenuTitle(currentWorkshop.title);
    //         }
    //     }
    // }, [noteData.workshop, workshops]);

    const handleSelection = (e) => {
        const choice = e.target.getAttribute('data-value');
        const title = e.target.getAttribute('data-title');
        setNoteData({
            ...noteData,
            workshop: choice,
        });
        setSelectMenuTitle(title);
        setChoosingWorkshop(false);
    };

    return (
        <div className='bg-white rounded shadow-md shadow-gray-700 font-main'>
            {/* Drop Down Menu Container */}
            <div className='bg-yellow-light/20'>
                <button
                    onClick={toggleDropdown}
                    className='flex items-center justify-evenly w-72 font-main text-xl font-light bg-yellow-light/90 py-3 md:w-80'
                >
                    {selectMenuTitle}
                    {choosingWorkshop ? (
                        <HiOutlineChevronDoubleUp onClick={toggleDropdown} />
                    ) : (
                        <HiOutlineChevronDoubleDown onClick={toggleDropdown} />
                    )}
                </button>
            </div>
            <ul
                role='menu'
                className={`${
                    choosingWorkshop
                        ? 'bg-yellow-light/70 pt-4 font-accent tracking-wider text-xl p-5 max-h-96 overflow-y-auto border-t-2 border-yellow-dark/80'
                        : 'hidden'
                }`}
            >
                {workshops.map((workshop) => {
                    return (
                        <li
                            role='menu-item'
                            data-value={workshop?.id}
                            data-title={workshop?.title}
                            onClick={handleSelection}
                            className='shadow-md mb-4 shadow-yellow-dark p-4 cursor-pointer hover:scale-105 ease-in-out duration-300'
                            key={workshop.id}
                        >
                            {workshop?.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default SelectWorkshop;
