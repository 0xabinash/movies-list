import React, { useState } from 'react';
import "./styles/header.css";

const Header = ({setSearchText}) => {

  const [debounceTimer, setDebounceTimer] = useState();

    const debounceSearch = (e, debounceTimer, setDebounceTimer) =>{

      let searchWord = e.target.value;

      if(searchWord === ""){
        searchWord = null;
      }

      if(debounceTimer){
        clearTimeout(debounceTimer);
      }

      const timeoutID = setTimeout(()=>{
        setSearchText(searchWord);
      },700)

      setDebounceTimer(timeoutID);
    }

    
  return (
    <div className='header-container'>
        <form className='search-box'>
            <input className='input-search'
             type='text' placeholder='Search your favorite movie...' 
             onChange={(e)=>debounceSearch(e, debounceTimer, setDebounceTimer)} 
            />
            <button className='search-btn'><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    </div>
  )
}

export default Header