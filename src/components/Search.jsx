import React, { useState } from 'react'

const Search = () => {
    const [searchInput, setSearchInput] = useState("");

  return (
        <input type="text" 
        name="searchInput" 
        className='searchInput' 
        value={searchInput} 
        onChange={(e)=> setSearchInput(e.target.value)}
        />
  )
}

export default Search