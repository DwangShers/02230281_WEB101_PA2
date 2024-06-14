// src/store/favouriteStore.js

import create from 'zustand';

const useFavouriteStore = create((set) => ({
  favouritePokemon: [],

  addPokemonToFavourites: (pokemon) =>
    set((state) => ({
      favouritePokemon: [...state.favouritePokemon, pokemon],
    })),

  removePokemonFromFavourites: (pokemon) =>
    set((state) => ({
      favouritePokemon: state.favouritePokemon.filter(
        (p) => p.id !== pokemon.id
      ),
    })),
}));

export default useFavouriteStore;
