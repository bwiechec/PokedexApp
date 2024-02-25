import { React } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { usePokemonData } from "../../context/pokemonContext";
import { Tooltip } from "@mui/material";

export default function ManagementPanel() {
  const {
    pokemonData: { pokemon, nextPokemonData, prevPokemonData },
  } = usePokemonData();

  return (
    <div
      key={"management_panel"}
      className={"pokeManagementPanel"}
      style={{
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        position: "sticky",
        top: "0",
        zIndex: "1234",
        display: "flex",
      }}
    >
      {prevPokemonData.isPrev && (
        <div
          className={"prevButton"}
          style={{
            fontSize: "40px",
            maxWidth: "20%",
            float: "left",
            marginLeft: "1rem",
            justifyContent: "center",
            position: "absolute",
            left: "0",
          }}
        >
          <NavLink
            to={`/pokemon/${prevPokemonData.prev}`}
            style={{ textDecoration: "none" }}
          >
            <Tooltip title="Previous Pokemon" placement="right">
              <Button variant="contained" size="medium">
                <NavigateBeforeIcon />
              </Button>
            </Tooltip>
          </NavLink>
        </div>
      )}

      <h1
        className={"pokeList"}
        style={{
          display: "inline-flex",
          fontFamily: "'Flexo-Demi',arial,sans-serif",
        }}
      >
        {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
      </h1>

      {nextPokemonData.isNext && (
        <div
          className={"nextButton"}
          style={{
            fontSize: "40px",
            maxWidth: "20%",
            float: "right",
            marginRight: "1rem",
            position: "absolute",
            right: "0",
          }}
        >
          <NavLink
            to={`/pokemon/${nextPokemonData.next}`}
            style={{ textDecoration: "none" }}
          >
            <Tooltip title="Next Pokemon" placement="left">
              <Button variant="contained" size="medium">
                <NavigateNextIcon />
              </Button>
            </Tooltip>
          </NavLink>
        </div>
      )}
    </div>
  );
}
