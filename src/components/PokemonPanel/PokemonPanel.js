import React from "react";
import PokemonEvolutions from "./PokemonEvolutions/PokemonEvolutions";
import PokemonEncounters from "./PokemonEncounters/PokemonEncounters";
import PokemonBasicInfo from "./PokemonBasicInfo/PokemonBasicInfo";
import PokemonImage from "./PokemonImage/PokemonImage";
import classes from "./PokemonPanel.module.css";

export default function PokemonPanel() {
  return (
    <div key={"poke_panel"} className={classes["poke-panel"]}>
      <PokemonImage />

      <PokemonBasicInfo />

      <PokemonEvolutions />

      <PokemonEncounters />
    </div>
  );
}
