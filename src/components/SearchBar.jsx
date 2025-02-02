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
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [originalList] = useState(list); // Store the original list
    
    // Common words to exclude from search
    const commonWords = new Set(['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with']);

    // Parse input value into valid search words
    const parseSearchWords = (input) => {
        return input
            .split(' ')
            .filter(word => {
                const trimmed = word.trim().toLowerCase();
                return trimmed && !commonWords.has(trimmed);
            });
    };

    // Handle input changes
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // If input is cleared, restore original list
        if (!newValue.trim()) {
            filterFunc(originalList);
        }
    };

    // Handle special keys
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    const handleFilter = () => {
        inputRef.current.blur();
        
        const searchWords = parseSearchWords(inputValue);

        // If no search words, restore original list
        if (searchWords.length === 0) {
            filterFunc(originalList);
            return;
        }

        // Start with the full list
        let filteredList = [...originalList];
        
        // Apply each search word as an additional filter (AND logic)
        searchWords.forEach(word => {
            filteredList = filterByKeyword(filteredList, word);
        });
        
        filterFunc(filteredList);
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
                value={inputValue}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                aria-description={placeholder}
                type='search'
                className="focus-visible:outline-none bg-transparent w-56 font-light text-lg pl-1 lg:w-64"
            />

            <button onClick={handleFilter}>
                <img
                    src={image}
                    className="size-8 bg-transparent my-2"
                    alt=""
                />
            </button>
        </section>
    );
};

export default SearchBar;