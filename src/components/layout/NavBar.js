import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Link to="/" className="navbar-brand">
              Pokedex
            </Link>
            <Link
              to={this.props.showFavourites ? "/" : "/favourites"}
              className="btn btn-warning ms-2"
              type="button"
              onClick={this.props.toggleShowFavourites}
            >
              {this.props.showFavourites ? "Back to Pokémon" : "Favourite"}
            </Link>
            <button
              className="btn btn-danger ms-2"
              type="button"
              onClick={this.props.handlePokemonCaught}
            >
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
