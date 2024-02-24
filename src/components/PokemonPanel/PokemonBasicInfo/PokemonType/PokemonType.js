import React from "react";
import { Button } from "@mui/material";
import classes from "./PokemonType.module.css";
import { usePokemonData } from "../../../../context/pokemonContext";

export default function PokemonType() {
  const {
    pokemonData: { pokemon },
  } = usePokemonData();

  return (
    <div
      key={"PokemonType_component"}
      className={"stat_box"}
      style={{
        display: "inline-table",
        marginLeft: "5%",
        width: "45%",
        paddingBottom: "2.5%",
        height: "fit-content",
      }}
    >
      <h3 key={"Pokemon_Type"}>Type: </h3>
      {pokemon.types.map((item) => {
        return (
          <Button
            key={item.type.name}
            className={classes[item.type.name] + " " + classes.typeButton}
            variant="contained"
            size="medium"
          >
            {item.type.name}
          </Button>
        );
      })}
    </div>
  );
}
