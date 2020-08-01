import React from 'react';

function Search({inputHandler, search}) {
    return (
<section className = "searchbox-wrap">
    <input
         type="text" 
         placeholder="Look for your movie!" 
         className="searchBox" 
         onChange ={inputHandler}
         onKeyPress = {search}
    />

</section>
    )
}

export default Search;