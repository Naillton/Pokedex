const texto = document.querySelector('.text');
const btn = document.querySelector('.btn');
const clear = document.querySelector('#clear');
const section = document.querySelector('.pokemon');
const URL = 'https://pokeapi.co/api/v2/pokemon/';

const appendInfos = (data) => {

  const name = document.createElement('p');
  const divImg = document.createElement('div');
  const img = document.createElement('img');
  const order = document.createElement('p');
  const type = document.createElement('p');
  const skill = document.createElement('p');

  name.innerHTML = data.name;
  img.src = data.image;
  divImg.appendChild(img);
  order.innerHTML = data.order;
  type.innerHTML = data.type;
  skill.innerHTML = data.abilities;

  section.appendChild(name);
  section.appendChild(divImg);
  section.appendChild(order);
  section.appendChild(type);
  section.appendChild(skill);
};

const infos = (data) => {
  return {
    name: data.name,
    image: data.sprites.front_default,
    order: data.order,
    type: `type: ${data.types.map((pokemon) => ' ' + pokemon.type.name).toString()}`,
    abilities: `skills: ${data.abilities.map((skill) => ' ' + skill.ability.name).toString()}`
  }
}

const fetchPokemon = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ name }`)
    const data = await response.json()
    const pokemon = infos(data);
    appendInfos(pokemon);
  } catch (error) {
    console.log(`Erro: ${ error }`)
  }
};

btn.addEventListener('click', (event) => {
  event.preventDefault();
  pokeName = texto.value.toLowerCase();
  fetchPokemon(pokeName);
});

clear.addEventListener('click', (event) => {
  section.innerHTML = ' ';
});