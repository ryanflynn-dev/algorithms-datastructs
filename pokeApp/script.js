const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemon = document.getElementById("pokemon");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");
let pData = [];

fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`)
  .then((res) => res.json())
  .then((data) => {
    pData = data.results;
  })
  .catch((err) => {
    console.log(err);
    pokemonImg.innerHTML =
      '<p class="error-msg">There was an error loading the pokemon</p>';
  });

searchButton.addEventListener("click", () => {
  findPokemon(pData);
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    findPokemon(pData);
  }
});

const findPokemon = (arr) => {
  const pokemon = arr.find(
    (p) =>
      p.id === +searchInput.value ||
      p.name.toLowerCase() === searchInput.value.toLowerCase()
  );
  if (!pokemon) {
    alert("Pokémon not found");
  }
  if (pokemon) {
    searchInput.value = "";
    fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon.name}`
    ).then((res) => res.json().then((data) => showPokemon(data)));
  }
};

const showPokemon = (data) => {
  let sprite = document.getElementById("sprite");
  if (!sprite) {
    sprite = document.createElement("img");
    sprite.id = "sprite";

    const pokemonContainer = document.querySelector(".pokemon");
    pokemonContainer.appendChild(sprite);
  }
  sprite.src = data.sprites.front_default;
  types.innerHTML = "";
  data.types.forEach((t) => {
    const typeElement = document.createElement("p");
    typeElement.textContent = t.type.name;
    types.appendChild(typeElement);
  });
  pokemonName.textContent = ` ${data.name}`;
  pokemonId.textContent = ` #${data.id}`;
  weight.textContent = ` ${data.weight}`;
  height.textContent = ` ${data.height}`;
  hp.textContent = ` ${data.stats[0].base_stat}`;
  attack.textContent = ` ${data.stats[1].base_stat}`;
  defense.textContent = ` ${data.stats[2].base_stat}`;
  spAttack.textContent = ` ${data.stats[3].base_stat}`;
  spDef.textContent = ` ${data.stats[4].base_stat}`;
  speed.textContent = ` ${data.stats[5].base_stat}`;
};
