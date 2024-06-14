import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const Badge = styled.span`
  background-color: ${(props) => `#${TYPE_COLORS[props.type]}`};
  color: white;
  margin-right: 5px;
  padding: 5px;
  border-radius: 3px;
`;

const Pokemon = () => {
  const { pokemonIndex } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState({
    name: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    themeColor: "#EF5350",
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
      const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

      const pokemonRes = await Axios.get(pokemonUrl);
      const name = pokemonRes.data.name;
      const imageUrl = pokemonRes.data.sprites.front_default;

      let { hp, attack, defense, speed, specialAttack, specialDefense } = "";
      pokemonRes.data.stats.forEach((stat) => {
        switch (stat.stat.name) {
          case "hp":
            hp = stat["base_stat"];
            break;
          case "attack":
            attack = stat["base_stat"];
            break;
          case "defense":
            defense = stat["base_stat"];
            break;
          case "speed":
            speed = stat["base_stat"];
            break;
          case "special-attack":
            specialAttack = stat["base_stat"];
            break;
          case "special-defense":
            specialDefense = stat["base_stat"];
            break;
          default:
            break;
        }
      });

      const height =
        Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;
      const weight =
        Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;
      const types = pokemonRes.data.types.map((type) => type.type.name);
      const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

      const abilities = pokemonRes.data.abilities
        .map((ability) => {
          return ability.ability.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const evs = pokemonRes.data.stats
        .filter((stat) => stat.effort > 0)
        .map((stat) => {
          return `${stat.effort} ${stat.stat.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}`;
        })
        .join(", ");

      const speciesRes = await Axios.get(pokemonSpeciesUrl);
      let description = "";
      speciesRes.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return true;
        }
        return false;
      });

      const femaleRate = speciesRes.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);
      const catchRate = Math.round(
        (100 / 255) * speciesRes.data["capture_rate"]
      );
      const eggGroups = speciesRes.data["egg_groups"]
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (speciesRes.data["hatch_counter"] + 1);

      setPokemonData({
        name,
        imageUrl,
        types,
        description,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense,
        },
        height,
        weight,
        eggGroups,
        catchRate,
        abilities,
        genderRatioFemale,
        genderRatioMale,
        evs,
        hatchSteps,
        themeColor,
      });
    };

    fetchPokemonData();
  }, [pokemonIndex]);

  return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-5">
              <h5>{pokemonIndex}</h5>
            </div>
            <div className="col-7">
              <div className="float-right">
                {pokemonData.types.map((type) => (
                  <Badge key={type} type={type}>
                    {type
                      .toLowerCase()
                      .split(" ")
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ")}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className=" col-md-3 ">
              <img
                src={pokemonData.imageUrl}
                className="card-img-top rounded mx-auto mt-2"
                alt={pokemonData.name}
              />
            </div>
            <div className="col-md-9">
              <h4 className="mx-auto">
                {pokemonData.name
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </h4>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${3}`}>HP</div>
                <div className={`col-12 col-md-${9}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${pokemonData.stats.hp}%`,
                        backgroundColor: `#${pokemonData.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{pokemonData.stats.hp}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${3}`}>Attack</div>
                <div className={`col-12 col-md-${9}`}>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${pokemonData.stats.attack}%`,
                        backgroundColor: `#${pokemonData.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{pokemonData.stats.attack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${3}`}>Defense</div>
                <div className={`col-12 col-md-${9}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${pokemonData.stats.defense}%`,
                        backgroundColor: `#${pokemonData.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{pokemonData.stats.defense}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${3}`}>Speed</div>
                <div className={`col-12 col-md-${9}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${pokemonData.stats.speed}%`,
                        backgroundColor: `#${pokemonData.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{pokemonData.stats.speed}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${3}`}>Sp Atk</div>
                <div className={`col-12 col-md-${9}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${pokemonData.stats.specialAttack}%`,
                        backgroundColor: `#${pokemonData.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{pokemonData.stats.specialAttack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${3}`}>Sp Def</div>
                <div className={`col-12 col-md-${9}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${pokemonData.stats.specialDefense}%`,
                        backgroundColor: `#${pokemonData.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{pokemonData.stats.specialDefense}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col">
              <p className="p-2">{pokemonData.description}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="card-body">
          <h5 className="card-title text-center">Profile</h5>
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Height:</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{pokemonData.height} ft.</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-right">Weight:</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{pokemonData.weight} lbs</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-right">Catch Rate:</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{pokemonData.catchRate}%</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-right">Gender Ratio:</h6>
            </div>
            <div className="col-md-6">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${pokemonData.genderRatioFemale}%`,
                    backgroundColor: "#c2185b",
                  }}
                  aria-valuenow="15"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <small>{pokemonData.genderRatioFemale}%</small>
                </div>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${pokemonData.genderRatioMale}%`,
                    backgroundColor: "#1976d2",
                  }}
                  aria-valuenow="30"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <small>{pokemonData.genderRatioMale}%</small>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-6">
              <h6 className="float-right">Egg Groups:</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{pokemonData.eggGroups}</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-right">Hatch Steps:</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{pokemonData.hatchSteps}</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-right">Abilities:</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{pokemonData.abilities}</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-right">EVs:</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{pokemonData.evs}</h6>
            </div>
          </div>
        </div>
        <div className="card-body text-center">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
