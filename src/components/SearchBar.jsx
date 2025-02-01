import { useRef, useState } from 'react';
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
    const inputRef = useRef(null)
    const [searchWord, setSearchWord] = useState('');

    // Convert search string to array of keywords, excluding common words
    const parseSearchTerms = (searchString) => {
        const commonWords = new Set(['and', 'or', 'the', 'a', 'an']);
        return searchString
            .toLowerCase()
            .split(' ')
            .filter(word => word.trim() && !commonWords.has(word.trim()));
    };

    // Check if item matches all search terms
    const matchesAllTerms = (item, searchTerms) => {
        return searchTerms.every(term => 
            filterByKeyword([item], term).length > 0
        );
    };


    // set searchWord to what the user types in
    // if the input field is cleared, refresh page
    const handleChange = (e) => {
        setSearchWord(e.target.value);
        if (e.target.value === '') {
            navigate(0);
        }
    };

    const handleFilter = () => {
        inputRef.current.blur();
        const searchTerms = parseSearchTerms(searchWord);
        
        // If no valid search terms, don't filter
        if (searchTerms.length === 0) {
            return;
        }

        // Filter list where item matches ALL search terms
        const filteredList = list.filter(item => 
            matchesAllTerms(item, searchTerms)
        );
        
        filterFunc(filteredList);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    return (
        <section
            className={`size-fit flex items-center rounded shadow-inner py-0.5 px-2 lg:px-3 ${
                color === 'pink'
                    ? 'bg-pink-light/30 border-[1px] border-pink-dark/70 focus-within:shadow-pink-dark/70'
                    : 'bg-orange-light/30 border-[1px] border-orange-dark/70 focus-within:shadow-orange-dark/70'
            }`}
        >
            <input
            ref={inputRef}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                aria-description={placeholder}
                type='search'
                className={`focus-visible:outline-none bg-transparent w-56 font-light text-lg pl-1 lg:w-64`}
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
