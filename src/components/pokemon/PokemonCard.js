import React, { Component } from "react";
import styled from "styled-components";
import Favourite from "../favourite/favourite";
import { Link } from "react-router-dom";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;

const FavouriteContainer = styled.div`
  position: absolute;
  bottom: 2px;
  right: 3px;
`;

const CardContainer = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  height: 180px; /* Adjust this value to increase the height */
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited, 
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    isFavourite: false, // Added to manage favourite state
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
    });
  }

  toggleFavourite = () => {
    this.setState((prevState) => ({ isFavourite: !prevState.isFavourite }));
  };

  render() {
    const { name, pokemonIndex, imageLoading, isFavourite } = this.state;

    const imageSrc = imageLoading
      ? "https://via.placeholder.com/150" // placeholder while loading
      : this.state.imageUrl;

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <CardContainer className="card">
            <h5 className="card-header d-flex justify-content-between">
              <span>{this.state.pokemonIndex}</span>
              <span className="ms-2">
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </span>
            </h5>
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              src={this.state.imageUrl}
              alt={this.state.name}
            />
            <FavouriteContainer>
              <Favourite
                isFavourite={isFavourite}
                toggleFavourite={this.toggleFavourite}
              />
            </FavouriteContainer>
          </CardContainer>
        </StyledLink>
      </div>
    );
  }
}
