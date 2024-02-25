import { useState, useEffect } from "react";

const usePokemon = (pokemonId) => {
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [encounters, setEncounters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(0);

  useEffect(() => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const nextPokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=${pokemonId}&limit=1`;
    const prevPokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=${
      pokemonId - 2
    }&limit=1`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
    const encountersUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`;

    setIsLoading(true);
    setPokemon(null);
    setError(null);

    let tempEvolutionChain = [];

    const abortController = new AbortController();

    fetch(speciesUrl, { signal: abortController.signal })
      .then((res) => res.json())
      .then((speciesData) => {
        Promise.all([
          fetch(pokemonUrl),
          fetch(nextPokemonUrl),
          fetch(prevPokemonUrl),
          fetch(speciesData.evolution_chain.url),
          fetch(encountersUrl),
        ])
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then(
            ([
              pokemonData,
              nextPokemonData,
              prevPokemonData,
              evolutionChainData,
              encountersData,
            ]) => {
              tempEvolutionChain.push(evolutionChainData.chain.species);
              let currentEvolution = evolutionChainData.chain.evolves_to[0];
              while (currentEvolution) {
                tempEvolutionChain.push(currentEvolution.species);
                currentEvolution = currentEvolution.evolves_to[0];
              }
              setPokemon(pokemonData);
              setEvolutionChain(tempEvolutionChain);
              setEncounters(encountersData);

              nextPokemonData.results.length
                ? setIsNext(true)
                : setIsNext(false);
              prevPokemonData.results.length
                ? setIsPrev(true)
                : setIsPrev(false);

              nextPokemonData.results.length
                ? setNext(parseInt(pokemonId) + 1)
                : setNext(0);
              prevPokemonData.results.length
                ? setPrev(parseInt(pokemonId) - 1)
                : setPrev(0);
              setIsLoading(false);
            }
          )
          .catch((err) => {
            setError(err);
            setIsLoading(false);
          });
      });

    return () => {
      abortController.abort();
    };
  }, [pokemonId]);

  return {
    pokemon,
    evolutionChain,
    encounters,
    prevPokemonData: { isPrev, prev },
    nextPokemonData: { isNext, next },
    isLoading,
    error,
  };
};

export default usePokemon;
