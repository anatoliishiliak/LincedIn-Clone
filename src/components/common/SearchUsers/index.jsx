import React from 'react';
import './index.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function SearchUsers({ setIsSearch, setSearchInput }) {
  return (
    <div className="search-users">
      <input
        placeholder="Search User..."
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <AiOutlineCloseCircle
        className="close-icon"
        size={25}
        onClick={() => {
          setIsSearch(false);
          setSearchInput('');
        }}
      />
    </div>
  );
}
