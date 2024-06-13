import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <a className="navbar-brand">Pokedex</a>
            <button
              className="btn btn-warning ms-2"
              type="button"
            >
              Favourite
            </button>
            <button className="btn btn-danger ms-2" type="button">
              Pokemon Caught
            </button>
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for your Pokemon"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
