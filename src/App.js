import "./App.css";
import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Tooltip,
} from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
// import Filters from "./components/Filters/Filters";

const ELEMENTS_IN_PAGE = 15;

const App = () => {
  const [count, setCount] = useState(0);
  const [pokemons, setPokemons] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const setLoadingToFalse = () => {
    setLoading(false);
  };

  useEffect(() => {
    let offset = ELEMENTS_IN_PAGE * (currentPage - 1);
    setLoading(true);
    fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=" +
        ELEMENTS_IN_PAGE +
        "&offset=" +
        offset
    )
      .then((res) => res.json())
      .then((pokemonsJson) => {
        setPokemons(pokemonsJson["results"]);
        setCount(pokemonsJson["count"]);
        setLoadingToFalse();
      });
  }, [currentPage]);

  // const changeFilterVisibility = () => {
  //   setFiltersShow((prev) => !prev);
  //   setFiltersTooltip(filtersShow ? "Show filters" : "Hide filters");
  // };

  const handleTableShow = () => {
    const table = document.querySelector(".pokemon_table");
    const main = document.querySelector(".pokemon-info");
    const button = document.querySelector(".app_show-table");
    table.classList.add("show");
    main.classList.add("hide");
    button.classList.add("hide");
  };

  const handleTableHide = () => {
    const table = document.querySelector(".pokemon_table");
    const main = document.querySelector(".pokemon-info");
    const button = document.querySelector(".app_show-table");
    table.classList.remove("show");
    main.classList.remove("hide");
    button.classList.remove("hide");
  };

  return (
    <div key={"App_Div"} className="App">
      <div className="app_show-table">
        <Tooltip title="Show pokemon list">
          <Button variant="contained" size="medium" onClick={handleTableShow}>
            <TocIcon />
          </Button>
        </Tooltip>
      </div>
      <div key={"TableDiv"} className={"sticky pokemon_table"}>
        {!loading ? (
          <Table
            key={"Table"}
            sx={{ minWidth: "450px" }}
            size="small"
            aria-label="pokedex"
          >
            <TableHead key={"TableHead"}>
              <TableRow key={"TableRow"}>
                <TableCell key={"TableCell_Number"} align="center">
                  Number
                </TableCell>
                <TableCell key={"TableCell_Pokemon"} align="center">
                  Pokemon
                </TableCell>
                <TableCell key={"TableCell_Link"} align="center">
                  <Tooltip title="Hide pokemon list">
                    <CloseIcon
                      onClick={handleTableHide}
                      className="close_table_button"
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* {filtersShow && <Filters />} */}
            <TableBody key={"TableBody"}>
              {pokemons &&
                pokemons.map((pokemon) => {
                  let number = pokemon.url.split("/");
                  number = number[number.length - 2];
                  return (
                    <TableRow key={number} style={{ backgroundColor: "white" }}>
                      <TableCell
                        key={"TableCell_Number_" + number}
                        align="center"
                      >
                        #{number}
                      </TableCell>
                      <TableCell
                        key={"TableCell_Pokemon_" + number}
                        align="center"
                      >
                        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                      </TableCell>
                      <TableCell
                        key={"TableCell_Link_" + number}
                        align="center"
                      >
                        <NavLink
                          to={`/pokemon/${number}`}
                          key={number + "_link"}
                          onClick={handleTableHide}
                        >
                          <Button>More</Button>
                        </NavLink>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        ) : (
          <CircularProgress
            key={"Progress"}
            style={{
              padding: "1%",
              alignSelf: "center",
              textAlign: "center",
              margin: "0 auto",
            }}
          />
        )}

        <Pagination
          key={"pagination"}
          size="large"
          count={Math.ceil(count / ELEMENTS_IN_PAGE)}
          style={{ justifyContent: "center", minWidth: "450px" }}
          onChange={(_event, page) => {
            setCurrentPage(page);
            setPokemons(null);
          }}
        />
      </div>
    </div>
  );
};

export default App;
