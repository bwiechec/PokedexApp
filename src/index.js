import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import PokemonInfo from "./routes/PokemonInfo/PokemonInfo";

ReactDOM.render(
  <BrowserRouter basename="">
    {/*<nav style={{textAlign: "center", fontSize: '50px'}}>POKEDEX</nav>*/}
    <App />
    <Routes key={"Routes"}>
      {/*<Route key={'main_route'} path="/" element={<App/>}>*/}
      <Route key={"Route_pokemon"} path="/pokemon" element={<PokemonInfo />}>
        <Route
          key={"Route_pokemon_id"}
          path=":pokemon"
          element={<PokemonInfo />}
        />
      </Route>
      {/*</Route>*/}
    </Routes>
    <div style={{ clear: "both" }} />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
