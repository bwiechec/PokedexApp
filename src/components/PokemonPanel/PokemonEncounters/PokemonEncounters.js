import React from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import classes from "./PokemonEncounters.module.css";
import { usePokemonData } from "../../../context/pokemonContext";

export default function PokemonEncounters() {
  const {
    pokemonData: { encounters },
  } = usePokemonData();

  return (
    <div
      key={"PokemonEncounters"}
      className={"pokeEncounters " + classes["poke_encounters"]}
    >
      <div
        key={"PokemonEncounters_component"}
        className={"stat_box " + classes["stat-box"]}
      >
        <h4>Encounters:</h4>
        <List key={"list"} className={classes.encounter_box}>
          {encounters.length > 0 ? (
            encounters.map((area) => {
              return (
                <ListItem
                  key={area["location_area"]["name"]}
                  component="div"
                  disablePadding
                >
                  <ListItemButton key={area["location_area"]["name"]}>
                    <ListItemText
                      primary={
                        area["location_area"]["name"]
                          .replace("-area", "")
                          .replaceAll("-", " ")[0]
                          .toUpperCase() +
                        area["location_area"]["name"]
                          .replace("-area", "")
                          .replaceAll("-", " ")
                          .slice(1)
                      }
                      key={area["location_area"]["name"]}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <p style={{ marginBottom: "1rem" }}>No encounters</p>
          )}
        </List>
      </div>
    </div>
  );
}
