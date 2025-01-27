import { useState } from 'react';

const SelectWorkshop = ({ workshops, noteData, setNoteData }) => {
    const [selectMenuTitle, setSelectMenuTitle] = useState('Select workshop');
    const [choosingWorkshop, setChoosingWorkshop] = useState(false);

    const toggleDropdown = () => {
        setChoosingWorkshop(!choosingWorkshop);
    };

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
        <div className='bg-white'>
            <button
                onClick={toggleDropdown}
                className={`${
                    choosingWorkshop
                        ? 'hidden'
                        : 'text-center w-60 font-main font-light text-lg bg-yellow-light/70 rounded py-2 border-2 border-yellow-dark/80'
                }`}
            >
                {selectMenuTitle}
            </button>
            <ul
                role='menu'
                className={`${
                    choosingWorkshop
                        ? 'bg-yellow-light/70 rounded p-5 w-72  border-2 border-yellow-dark/80 h-96 overflow-y-auto'
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
                            className='shadow-md mb-2 shadow-yellow-dark p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
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
