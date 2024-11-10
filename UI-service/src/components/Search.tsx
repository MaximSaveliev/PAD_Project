import React, { useRef, useEffect, useState } from 'react';

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setSearchValue('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Focus input when search is opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle escape key to close search
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div className="grid place-items-center">
            {/* Full screen search overlay */}
            <div
                className={`fixed inset-0 bg-background z-50 transition-all duration-300 ${isOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Search header */}
                <div className="flex items-center justify-between p-4 max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold text-primary-text select-none">Search</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-lg hover:bg-bg-hover grid place-items-center"
                        aria-label="Close search"
                    >
                        <i className="fa-solid fa-x text-lg"></i>
                    </button>
                </div>

                {/* Search form */}
                <div className="p-4 max-w-3xl mx-auto">
                    <form
                        action=""
                        className="relative"
                        id="search-bar"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="relative">
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text"></i>
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full h-14 pl-12 pr-16 rounded-lg bg-background border-none outline-none text-lg text-primary-text placeholder-secondary-text"
                                placeholder="Search..."
                            />
                            {searchValue && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text px-2"
                                    aria-label="Clear search"
                                >
                                    <span className="text-sm">Clear</span>
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Search results container */}
                    <div className="mt-6">
                        {/* Add your search results here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;

