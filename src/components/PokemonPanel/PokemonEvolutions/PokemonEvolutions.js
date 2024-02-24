import { List } from "@mui/material";
import { NavLink } from "react-router-dom";
import { usePokemonData } from "../../../context/pokemonContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PokemonEvolutions() {
  const {
    pokemonData: { evolutionChain },
  } = usePokemonData();

  const baseImgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  return (
    <div
      key={"PokemonEvolutions"}
      className={"pokeEvolutions"}
      style={{ marginTop: "5%" }}
    >
      <div
        key={"PokemonEvolutions_component"}
        className={"stat_box"}
        style={{ display: "inline-block", minWidth: "90%" }}
      >
        <h4 style={{ textAlign: "left", paddingLeft: "5%" }}>Evolutions:</h4>

        <div key={"evolution_chain_body_div"}>
          <div
            key={"evolution_chain_body"}
            style={{ minHeight: "100%", alignContent: "center" }}
          >
            {evolutionChain.length > 1 ? (
              evolutionChain.map((evolution, index) => {
                const splitUrl = evolution.url.split("/");
                const pokemonId = splitUrl[splitUrl.length - 2];

                return (
                  <>
                    <NavLink
                      to={`/pokemon/${pokemonId}`}
                      key={pokemonId + "_link"}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <div
                        key={pokemonId + "_div"}
                        style={{ display: "inline-table" }}
                      >
                        <img
                          alt={evolution.name.toUpperCase()}
                          src={baseImgUrl + pokemonId + ".png"}
                          style={{ width: "50px", height: "50px" }}
                        />
                        <p
                          style={{
                            fontFamily: "'Flexo-Demi',arial,sans-serif",
                          }}
                        >
                          {evolution.name[0].toUpperCase() +
                            evolution.name.slice(1)}
                        </p>
                      </div>
                    </NavLink>

                    {index + 1 !== evolutionChain.length && (
                      <div
                        key={"nextEvolution_" + splitUrl}
                        style={{
                          display: "inline-table",
                          alignContent: "center",
                          minHeight: "80%",
                          padding: "5%",
                        }}
                      >
                        <NavigateNextIcon />
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <List
                key={"evolution_chain_body"}
                style={{ minHeight: "100%", alignContent: "center" }}
              >
                No evolutions
              </List>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
