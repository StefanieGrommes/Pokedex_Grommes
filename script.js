const BASE_URL = "https://pokeapi.co/api/v2/";
const limit = 36;
let offset = 0;
let pokemonArray = [];
let currentIndex = 0;

function init(){
    fetchData(offset); 
}

async function fetchData(offset){ 
    let responseToJson;
    try {
        let response = await fetch (`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok){
        throw new Error("Trouble loading Pokemons! Reload Site!")
        }
        responseToJson = await response.json();
        }
    catch(error) {
        showError(error.message);
        return;
    }
    getDetails(responseToJson);
}

function showError(message){
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = `<span class="error-text" data-id="not-found">ERROR</span>
                            <p class="error-message-content">${message}</p>
                            <button onclick="init()" class="loading-btn">Restart</button>` 
    const loadMoreBtn = document.getElementById("loading-more-pokemons");
    loadMoreBtn.style.display="none";
}

async function getDetails(responseToJson){
    let pokemonResults = responseToJson.results;
    let pokemonDetails = [];
    const promises = pokemonResults.map(async(pokemon) => { //map erstellt ein neues Array, wo alle Daten gleichzeitig gefetched werden
        const pokemonResponse = await fetch (pokemon.url);
        return await pokemonResponse.json();
        });
        pokemonDetails = await Promise.all(promises); //Promise.all wartet, bis alle promises fertig sind 
        renderPokemons(pokemonDetails);
}

function renderPokemons(pokemonDetails){
    let thumbnailRef = document.getElementById("pokemon-thumbnails-content");
    if(offset === 0){
    thumbnailRef.innerHTML = "";
    }
        for (let index = 0; index < pokemonDetails.length; index++) { 
            let pokemonArrayIndex = pokemonArray.length; //definiert globale Position im Array, beim ersten pokemon im Loop ist length 0, erst nach dem pushen ist es 1;
            thumbnailRef.innerHTML+= getTemplateSmallPokemonCard(pokemonArrayIndex);
        renderSmallPokemonCard(pokemonDetails, index, pokemonArrayIndex);
        pokemonArray.push(pokemonDetails[index]);
        }
    }

function getTemplateSmallPokemonCard(pokemonArrayIndex){
    return `<button onclick="openPokemonDialog(${pokemonArrayIndex})" data-id="card" id="thumbnail" class="small-pokemon-card">
                <h1 id="pokemon-name-${pokemonArrayIndex}" class="pokemon-name" ></h1>
                <span id="pokemon-id-${pokemonArrayIndex}" class="pokemon-id-btn">#</span> 
                <div class="sprites-wrapper" id="sprites-bg-${pokemonArrayIndex}">
                    <img src="" alt="Pokemon Sprite" data-id="card-image" id="pokemon-sprite-${pokemonArrayIndex}" class="small-pokemon-sprite-img" style="display:none">
                </div>
                <div id="pokemon-type-${pokemonArrayIndex}" class="pokemon-type">
                </div>
            </button>`
}

function renderSmallPokemonCard(pokemonDetails, index, pokemonArrayIndex){
    let pokemonSprite = document.getElementById(`pokemon-sprite-${pokemonArrayIndex}`);
    pokemonSprite.src = pokemonDetails[index].sprites.other["official-artwork"].front_default;
    pokemonSprite.style = "display: block";
    let pokemonName = document.getElementById(`pokemon-name-${pokemonArrayIndex}`);
    pokemonName.innerHTML += (pokemonDetails[index].name.charAt(0).toUpperCase() + pokemonDetails[index].name.slice(1));
    let pokemonTypeContainer = document.getElementById(`pokemon-type-${pokemonArrayIndex}`);
    pokemonTypeContainer.innerHTML = "";
    pokemonDetails[index].types.forEach(type => {
        pokemonTypeContainer.innerHTML += 
        `<span class="pokemon-type-btn">${type.type.name}</span>`;
        });
    pokemonDetails[index].types.forEach(type => {
        pokemonSprite.classList.add(`pokemon-type-${type.type.name}`);
        });
    let pokemonID = document.getElementById(`pokemon-id-${pokemonArrayIndex}`);
    pokemonID.innerHTML += pokemonDetails[index].id;
    return pokemonDetails;   
}


//DIALOG


let myDialog = document.getElementById("pokemon-dialog");

function openPokemonDialog(index){
    currentIndex = index;
    myDialog.showModal();
    myDialog.classList.add("opened");
    document.body.classList.add("no-scroll");
    getTemplateBigPokemonCard(index);
    renderBigPokemonCard(index);
    
}

let dialogContent= document.getElementById("pokemon-dialog-content");
function getTemplateBigPokemonCard(index){
    dialogContent.innerHTML= ` <div class="close-btn-wrapper">
                                    <button class="close-dialog-btn" onclick="closeDialog(${currentIndex})" data-id="close-dialog-button"> X </button> 
                                </div>
                                <div class="header-dialog"> 
                                    <div class="pokemon-dialog-name-wrapper">
                                        <h2 data-id="overlay-pokemon-name" id="pokemon-dialog-name-${index}" class="pokemon-dialog-name"></h2>
                                        <span id="pokemon-dialog-id-${index}" class="pokemon-id-btn big-id"></span>
                                    </div>
                                    </div>
                                    <div class="second-line-pokemon-dialog">
                                    <div class="pokemon-type pokemon-dialog-type" id="pokemon-dialog-type-${index}">
                                    </div>
                                </div>
                                <div class="sprites-wrapper">
                                        <img src="" alt="Pokemon Sprite" data-id="big-card-image" id="pokemon-dialog-sprite-${index}" class="big-pokemon-sprite-img">
                                </div>
                            <div class="dialog_body">
                                <div class="table-headline">
                                    <button onclick="showPokemonStats(${index})"><b>Stats</button>
                                    <button onclick="renderPokemonAbout(${index})"><b>About</button>
                                    <button onclick="showPokemonMoves(${index})"><b>Moves</button>
                                </div>
                                        <div class="stats-content" id="stats-content">
                                            
                                            </div>
                                    </div>
                            </div> 
                            <div class="footer_dialog"> 
                                    <button class="arrow" onclick="previousCard(${index})" data-id="prev-button">&larr;</button>
                                    <button class="arrow" onclick="nextCard(${index})" data-id="next-button">&rarr;</button>
                            </div>
                            `
}

function renderBigPokemonCard(index){
    let pokemonDialogSprite = document.getElementById(`pokemon-dialog-sprite-${index}`);
    pokemonDialogSprite.src = pokemonArray[index].sprites.other["official-artwork"].front_default;
    pokemonDialogSprite.style = "display: block";
    let pokemonDialogName = document.getElementById(`pokemon-dialog-name-${index}`);
    pokemonDialogName.innerHTML += (pokemonArray[index].name.charAt(0).toUpperCase() + pokemonArray[index].name.slice(1));
    let pokemonDialogTypeContainer = document.getElementById(`pokemon-dialog-type-${index}`);
    pokemonDialogTypeContainer.innerHTML = "";
    pokemonArray[index].types.forEach(type => {
        pokemonDialogTypeContainer.innerHTML += 
        `<span class="pokemon-type-btn">${type.type.name}</span>`;
        });
    pokemonArray[index].types.forEach(type => {
        pokemonDialogSprite.classList.add(`pokemon-type-${type.type.name}`)
    });
    let pokemonDialogID = document.getElementById(`pokemon-dialog-id-${index}`);
    pokemonDialogID.innerHTML += "#" + pokemonArray[index].id;
    getPokemonStats(index);
}
  
function closeDialog() {
    myDialog.close();
    myDialog.classList.remove("opened");
    document.body.classList.remove("no-scroll");
}

async function loadMorePokemons(){   
    offset +=limit;
    fetchData(offset);
}

async function searchPokemon(){
let pokemonNameInput = document.getElementById("pokemonName").value.toLowerCase();
    if (pokemonNameInput.length < 3){
        alert ("Please type in at least 3 Characters");
            return;
        }
    let existingPokemon = pokemonArray.filter(pokemon =>//filter gibt immer Array zurück
        pokemon.name.includes(pokemonNameInput));
    let cards = document.querySelectorAll(".small-pokemon-card");
    cards.forEach(card => card.style.display = "none"); // alle Karten einmal ausblenden

        if (existingPokemon.length > 0) {  //wenn das Array nicht leer ist, dann 
        existingPokemon.forEach(pokemon =>{  // suche den index aller pokemons im großen PokemonArray und setze ihn gleich dem Index
        let index = pokemonArray.indexOf(pokemon);
        showPokemonCard(index,cards);
            });
        } else {
            alert ("No pokemon matches your search");
        }
}

function showPokemonCard(index, cards){
    cards[index].style.display = "flex"; // nur die mit richtigem Index anzeigen lassen
}


function showPokemonStats(index){
    let statsTableContainer = document.getElementById("stats-content");
    statsTableContainer.innerHTML = "";
    statsTableContainer.classList.add("column");
    let pokemonStatsArray = pokemonArray[index].stats;
    pokemonStatsArray.forEach(pokemonStat => {
       statsTableContainer.innerHTML += `<div class="stat-row">
                                                <span class="stat-name">${pokemonStat.stat.name}</span>
                                                <span class="stat-value"><b>${pokemonStat.base_stat}</span>
                                                <div class="stat-bar-background">
                                                    <div class="stat-bar-fill" style="width: ></div>
                                                </div>`
    })  
}
function renderPokemonAbout(index){
    let pokemonAbilitiesArray = pokemonArray[index].abilities.map(
        pokemonAbility => pokemonAbility.ability.name);
    let statsTableContainer = document.getElementById("stats-content");
    statsTableContainer.innerHTML = "";
    statsTableContainer.classList.add("column");
    statsTableContainer.innerHTML += `<table class="table-about">
                                                <tr> <td> weight: ${pokemonArray[index].weight} kg </td> </tr>
                                                <tr> <td> height: ${pokemonArray[index].height} m</td> </tr>
                                                <tr> <td> Abilty: ${pokemonAbilitiesArray.join(", ")}</td></tr>
                                                </table>` 
}

function showPokemonMoves(index){
    let statsTableContainer = document.getElementById("stats-content");
    statsTableContainer.innerHTML = "";
    statsTableContainer.classList.remove("column");
    statsTableContainer.classList.add("moves-btn-container");
    pokemonArray[index].moves.forEach(pokemonMove => {
        statsTableContainer.innerHTML += `<button class="moves-btn">${pokemonMove.move.name}</button>`
    });
}

 function nextCard(index) { 
    index++;
    if(index >= pokemonArray.length) {
        index = 0;
    }
    getTemplateBigPokemonCard(index);
    renderBigPokemonCard(index);
} 

function previousCard(index) {
    index--;
    if(index < 0) {
        index = (pokemonArray.length)-1;};
    getTemplateBigPokemonCard(index);
    renderBigPokemonCard(index);
}





