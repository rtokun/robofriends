import React from 'react';

const SearchBox = ({searchChange}) => {

    return (
        <input
            className='pa3 ba--green bg-light-blue'
            type='search'
            placeholder='search robots'
            onChange={(e) => {
                searchChange(e)
            }}
        />
    );
};

export default SearchBox;