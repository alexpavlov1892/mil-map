import React, { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import "./App.css";

const Nav = ({ onSearch, selectedFilters, setSelectedFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(selectedFilters || []);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  useEffect(() => {
    setFilters(selectedFilters);
  }, [selectedFilters]);

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleAbout = () => setIsAboutOpen(!isAboutOpen);
  const toggleSubmit = () => setIsSubmitOpen(!isSubmitOpen);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query, selectedFilters);
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    let updatedFilters = checked
      ? [...filters, value]
      : filters.filter((filter) => filter !== value);

    setSelectedFilters(updatedFilters);
    onSearch(searchQuery, updatedFilters);
  };

  const isChecked = (value) => filters.includes(value);

  return (
    <div className={`nav ${isOpen ? "open" : ""}`}>
      <button className="menu-btn" onClick={toggleNav}>
        {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>

      {isOpen && (
        <div className="nav-content">
          <h1 className="nav-title">Map MIL</h1>
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

          <div className="target-audience-filters">
            <h3>Target Audience</h3>
            {["Children", "Adults", "Seniors", "Unspecified"].map(
              (audience) => (
                <label key={audience}>
                  <input
                    type="checkbox"
                    value={audience}
                    checked={isChecked(audience)}
                    onChange={handleFilterChange}
                  />{" "}
                  {audience}
                </label>
              )
            )}
          </div>

          <div className="status-checkboxes">
            <h3>Status</h3>
            {["Ongoing", "Upcoming", "Finished"].map((status) => (
              <label key={status}>
                <input
                  type="checkbox"
                  value={status}
                  checked={isChecked(status)}
                  onChange={handleFilterChange}
                />{" "}
                {status}
              </label>
            ))}
          </div>

          <button className="about-button" onClick={toggleAbout}>
            About
          </button>
          <button className="submit-button" onClick={toggleSubmit}>
            Submit Campaign
          </button>
        </div>
      )}

      {isSubmitOpen && (
        <div className="submit-overlay">
          <div className="submit-content">
            <h2>Submit Your Campaign</h2>
            <form className="submit-form">
              <h3>
                Note: Submissions are currently not being handled this feature
                is still under development
              </h3>
              <label>
                Campaign Name:
                <input type="text" name="campaignName" required />
              </label>

              <label>
                Location:
                <input type="text" name="location" required />
              </label>

              <label>
                Duration:
                <input type="text" name="duration" required />
              </label>

              <label>
                Target Audience:
                <select name="target-audience" required>
                  <option value="Children">Children</option>
                  <option value="Adults">Adults</option>
                  <option value="Seniors">Seniors</option>
                  <option value="Unspecified">Unspecified</option>
                </select>
              </label>

              <label>
                Status:
                <select name="status" required>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="finished">Finished</option>
                </select>
              </label>

              <label>
                External link to organiser:
                <input type="text" name="info" required />
              </label>

              <button type="submit" className="submit-form-button">
                <h2>Submit</h2>
              </button>
            </form>
            <button className="close-submit-button" onClick={toggleSubmit}>
              <h2>Close</h2>
            </button>
          </div>
        </div>
      )}

      {isAboutOpen && (
        <div className="about-overlay">
          <div className="about-content">
            <h2>Map MIL Disclosure</h2>
            <p>
              This website is developed as part of an academic dissertation
              project focusing on media literacy. Any links to external
              websites, organizations, or campaigns are provided for
              informational purposes only, aiming to raise awareness about media
              literacy. The inclusion of these links does not constitute an
              endorsement or affiliation with any external entity. All data is
              presented in good faith, and users are encouraged to verify
              information independently.
            </p>
            <button className="close-about-button" onClick={toggleAbout}>
              <h2>Close</h2>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
