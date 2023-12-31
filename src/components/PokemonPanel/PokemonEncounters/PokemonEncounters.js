import React, {useEffect, useState} from "react";
import {CircularProgress, List, ListItem, ListItemButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import classes from "./PokemonEncounters.module.css";


export default function PokemonEncounters(props) {
  const [loading, setLoading] = useState(true);
  const [encountersUrl, setEncountersUrl] = useState('');
  const [encounterChainBody, setEncounterChainBody] = useState(<div></div>);

  const setLoadingToFalse = () => {
    setLoading(false)
  }

  const getEncounters = (url) => {
    setLoading(true)
    let encounterBody = []
    fetch(url)
      .then(res => res.json())
      .then(pokemonEncounter => {
        pokemonEncounter.map((area) => {
          encounterBody.push(
            <ListItem key={area['location_area']['name']} component="div" disablePadding>
              <ListItemButton key={area['location_area']['name']}>
                <ListItemText
                  primary={area['location_area']['name'].replace('-area', '').replaceAll('-', ' ')[0].toUpperCase()
                    + area['location_area']['name'].replace('-area', '').replaceAll('-', ' ').slice(1,)}
                  key={area['location_area']['name']}/>
              </ListItemButton>
            </ListItem>)
        })
        if (pokemonEncounter.length) {
          setEncounterChainBody(encounterBody)
        } else {
          setEncounterChainBody('No encounters')
        }
        setTimeout(setLoadingToFalse, 500)

      })
  }

  useEffect(() => {
    setLoading(true)
    setEncounterChainBody('No encounters')
    setEncountersUrl(props.encountersUrl)
    if (props.encountersUrl !== '') {
      getEncounters(props.encountersUrl);
    }

    return () => {
      setEncountersUrl('');
    }
  }, [props.encountersUrl]);

  if (loading) {
    return (
      <div key={'PokemonEncounters'} className={"pokeEncounters "+ classes['poke_encounters']}>
        <div key={'PokemonEncounters_component'}
             className={'stat_box '+ classes['stat-box']}
        >
          <CircularProgress key={'circular_progress'} style={{padding: "1%"}}/>
        </div>
      </div>
    )
  }

  return (
    <div key={'PokemonEncounters'} className={"pokeEncounters "+ classes['poke_encounters']}>
      <div key={'PokemonEncounters_component'}
           className={'stat_box '+ classes['stat-box']}
      >
        <h4>Encounters:</h4>
        <List key={'list'}
              className={classes.encounter_box}>{encounterChainBody}</List>
      </div>
    </div>
  )
  //<List>{encounterChainBody}</List>
}