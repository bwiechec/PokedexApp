import React from "react";
import { List, ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { usePokemonData } from "../../../../context/pokemonContext";
import "./PokemonStats.module.css";

export default function PokemonStats() {
  const {
    pokemonData: { pokemon },
  } = usePokemonData();

  return (
    <div
      key={"pokeStats_component"}
      className={"stat_box"}
      style={{
        display: "inline-table",
        width: "45%",
        padding: "1rem",
        paddingTop: "0",
      }}
    >
      <h3 key={"Pokemon_stats"}>Statistics: </h3>
      <List key={"stats_list"}>
        {pokemon.stats.map((item) => {
          return (
            <ListItem
              key={item.stat.name.toUpperCase() + "_item"}
              disablePadding
            >
              <ListItemText
                key={item.stat.name.toUpperCase()}
                primary={
                  item.stat.name[0].toUpperCase() + item.stat.name.slice(1)
                }
              />
              <progress
                key={item.stat.name.toUpperCase() + "_progress"}
                id={item.stat.name}
                value={item.base_stat}
                max="225"
                style={{ maxWidth: "40%" }}
              >
                {" "}
                {item.base_stat}%
              </progress>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
