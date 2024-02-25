import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PokemonPanel from "../../components/PokemonPanel/PokemonPanel";
import ManagementPanel from "../../components/ManagementPanel/ManagementPanel";
import usePokemon from "../../hooks/usePokemon";
import { PokemonDataProvider } from "../../context/pokemonContext";
import "./PokemonInfo.module.css";

export default function PokemonInfo() {
  const params = useParams();

  const {
    pokemon,
    prevPokemonData,
    nextPokemonData,
    evolutionChain,
    encounters,
    isLoading,
    error,
  } = usePokemon(params.pokemon);

  if (isLoading) {
    return (
      <CircularProgress
        key={"CircularProgress"}
        style={{
          padding: "1%",
          alignSelf: "center",
          textAlign: "center",
          margin: "0 auto",
        }}
      />
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <PokemonDataProvider
      value={{
        pokemon,
        prevPokemonData,
        nextPokemonData,
        evolutionChain,
        encounters,
      }}
    >
      <main className="pokemon-info">
        <ManagementPanel />

        <PokemonPanel />
      </main>
    </PokemonDataProvider>
  );
}
