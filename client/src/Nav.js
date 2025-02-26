import React, { useState } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import './App.css';

const Nav = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleNav = () => setIsOpen(!isOpen);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); 
  };

  return (
    <div className={`nav ${isOpen ? 'open' : ''}`}>
      <button className="menu-btn" onClick={toggleNav}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {isOpen && (  
        <div className="nav-content">
          <h2>Search</h2>
          <div className="search-box">
            <FiSearch size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
