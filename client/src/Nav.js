import React, { useState } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import './App.css';

const Nav = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    const toggleNav = () => setIsOpen(!isOpen);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query, selectedFilters);
    };

    const handleFilterChange = (e) => {
        const { value, checked } = e.target;
        let updatedFilters = checked
            ? [...selectedFilters, value]
            : selectedFilters.filter(filter => filter !== value);
        
        setSelectedFilters(updatedFilters);
        onSearch(searchQuery, updatedFilters);
    };

    return (
        <div className={`nav ${isOpen ? 'open' : ''}`}>
            <button className="menu-btn" onClick={toggleNav}>
                {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
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

                    <div className="filter-options">
                        <h3>Target Audience</h3>
                        <label><input type="checkbox" value="Children" onChange={handleFilterChange} /> Children</label>
                        <label><input type="checkbox" value="Adults" onChange={handleFilterChange} /> Adults</label>
                        <label><input type="checkbox" value="Seniors" onChange={handleFilterChange} /> Seniors</label>
                        <label><input type="checkbox" value="Unspecified" onChange={handleFilterChange} /> Unspecified</label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
