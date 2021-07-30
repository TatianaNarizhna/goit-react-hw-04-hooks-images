// import React, { Component } from "react";
import  { useState } from 'react';
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default function SearchBar({ onSubmit })  {
  const [searchName, setSearchName] = useState('');

   const handleSearchChange = (e) => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (searchName.trim() === "") {
      return toast.error("Enter correct request!");
    }
    onSubmit(searchName);
    // this.setState({ searchName: "" })
    formReset();
  };

   const formReset = () => {
    setSearchName('');
  };

    return (
      <div>
        <header className="Searchbar">
          <form onSubmit={handleFormSubmit} className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              value={searchName}
              autoFocus
              placeholder="Search images and photos"
              onChange={handleSearchChange}
            />
          </form>
        </header>
      </div>
    );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
