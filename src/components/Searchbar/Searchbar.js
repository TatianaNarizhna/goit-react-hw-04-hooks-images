import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default class SearchBar extends Component {
  state = {
    searchName: "",
  };

  handleSearchChange = (e) => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchName.trim() === "") {
      return toast.error("Enter correct request!");
    }
    this.props.onSubmit(this.state.searchName);
    // this.setState({ searchName: "" })
    this.formReset();
  };

  formReset = () => {
    this.setState({
      searchName: "",
    });
  };

  render() {
    return (
      <div>
        <header className="Searchbar">
          <form onSubmit={this.handleFormSubmit} className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              value={this.state.searchName}
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleSearchChange}
            />
          </form>
        </header>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
