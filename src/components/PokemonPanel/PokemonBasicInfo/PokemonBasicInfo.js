import React from "react";
import PokemonType from "./PokemonType/PokemonType";
import PokemonStats from "./PokemonStats/PokemonStats";
import "./PokemonBasicInfo.css";

export default function PokemonBasicInfo() {
  return (
    <div
      key={"pokeStats"}
      className={"pokeStats"}
      style={{ marginTop: "5%", display: "flex" }}
    >
      <PokemonStats />

      <PokemonType />
    </div>
  );
}
