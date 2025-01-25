import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
    list,
    filterFunc,
    filterByKeyword,
    color,
    image,
    placeholder,
}) => {
    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState('');

    // set searchWord to what the user types in
    // if the input field is cleared, refresh page
    const handleChange = (e) => {
        setSearchWord(e.target.value);
        if (e.target.value === '') {
            navigate(0);
        }
    };

    const handleFilter = () => {
        const filteredList = filterByKeyword(list, searchWord);
        filterFunc(filteredList);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    return (
        <section
            className={`mt-8 size-fit flex items-center mx-auto rounded shadow-inner p-2.5 ${
                color === 'pink'
                    ? 'bg-pink-light/30 border-[1px] border-pink-dark/70 focus-within:shadow-pink-dark/70'
                    : 'bg-orange-light/30 border-[1px] border-orange-dark/70 focus-within:shadow-orange-dark/70'
            }`}
        >
            <input
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                aria-description={placeholder}
                type='search'
                className={`focus-visible:outline-none bg-transparent w-56 font-light text-lg pl-1`}
            />

            <button onClick={handleFilter}>
                <img
                    src={image}
                    className='size-8 bg-transparent my-2'
                    alt=''
                />
            </button>
        </section>
    );
};
export default SearchBar;
