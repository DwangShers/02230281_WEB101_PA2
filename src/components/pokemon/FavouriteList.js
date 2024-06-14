import React from "react";
import PokemonCard from "../pokemon/PokemonCard"; // Adjust path based on your structure
import useFavouriteStore from "../../store/favouriteStore"; // Adjust path based on your structure

const FavouriteList = () => {
  const favouritePokemon = useFavouriteStore((state) => state.favouritePokemon);

  return (
    <div>
      <h2>Favourite Pokemon</h2>
      <div className="row">
        {favouritePokemon.map((pokemon) => (
          <div className="col-md-3 col-sm-6 mb-5" key={pokemon.pokemonIndex}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteList;
