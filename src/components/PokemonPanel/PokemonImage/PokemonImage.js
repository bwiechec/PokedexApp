import React from "react";
import { usePokemonData } from "../../../context/pokemonContext";

export default function PokemonImage() {
  const {
    pokemonData: { pokemon },
  } = usePokemonData();

  return (
    <div key={"pokeImage"} className={"pokeImage"}>
      <img
        alt={pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
        src={pokemon.sprites.other["official-artwork"].front_default}
        style={{ width: "200px", height: "auto" }}
      />
    </div>
  );
}
