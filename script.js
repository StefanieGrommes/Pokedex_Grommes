const BASE_URL = "https://pokeapi.co/api/v2/";
const limit = 36;
let offset = 0;
let pokemonArray = [];
let currentIndex = 0;

function init(){
    showLoadingSpinner();
    fetchData(offset);    
}

function showLoadingSpinner(){
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.style.display = "flex";
}

function hideLoadingSpinner(){
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.style.display = "none";
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
    hideLoadingSpinner();
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

function renderSmallPokemonCard(pokemonDetails, index, pokemonArrayIndex){
    let pokemonSprite = document.getElementById(`pokemon-sprite-${pokemonArrayIndex}`);
    pokemonSprite.src = pokemonDetails[index].sprites.other["official-artwork"].front_default;
    pokemonSprite.style = "display: block";
    let pokemonTypeContainer = document.getElementById(`pokemon-type-${pokemonArrayIndex}`);
    pokemonTypeContainer.innerHTML = "";
    pokemonDetails[index].types.forEach(type => {
        pokemonTypeContainer.innerHTML += showPokemonTypeBtn(type);
        });
    pokemonDetails[index].types.forEach(type => {
        pokemonSprite.classList.add(`pokemon-type-${type.type.name}`);
        });
    renderPokemonNameID(pokemonDetails, index, pokemonArrayIndex);
}

function renderPokemonNameID(pokemonDetails, index, pokemonArrayIndex){
    let pokemonName = document.getElementById(`pokemon-name-${pokemonArrayIndex}`);
    pokemonName.innerHTML += (pokemonDetails[index].name.charAt(0).toUpperCase() + pokemonDetails[index].name.slice(1));
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

function renderBigPokemonCard(index){
    let pokemonDialogSprite = document.getElementById(`pokemon-dialog-sprite-${index}`);
    pokemonDialogSprite.src = pokemonArray[index].sprites.other["official-artwork"].front_default;
    pokemonDialogSprite.style = "display: block";
    pokemonArray[index].types.forEach(type => {
        pokemonDialogSprite.classList.add(`pokemon-type-${type.type.name}`)
    });
    let pokemonDialogName = document.getElementById(`pokemon-dialog-name-${index}`);
    pokemonDialogName.innerHTML += (pokemonArray[index].name.charAt(0).toUpperCase() + pokemonArray[index].name.slice(1));
    renderDialogTypeID(index);
}

function renderDialogTypeID(index){
    let pokemonDialogTypeContainer = document.getElementById(`pokemon-dialog-type-${index}`);
    pokemonDialogTypeContainer.innerHTML = "";
    pokemonArray[index].types.forEach(type => {
        pokemonDialogTypeContainer.innerHTML += showDialogTypeBtn(type);
        });
    let pokemonDialogID = document.getElementById(`pokemon-dialog-id-${index}`);
    pokemonDialogID.innerHTML += "#" + pokemonArray[index].id;
    renderPokemonStats(index);
}
  
function closeDialog() {
    myDialog.close();
    myDialog.classList.remove("opened");
    document.body.classList.remove("no-scroll");
}

async function loadMorePokemons(){   
    offset +=limit;
    init();
}

async function searchPokemon(){
let inputField = document.getElementById("pokemonName");
let pokemonNameInput = inputField.value.toLowerCase();
    if (pokemonNameInput.length < 3){
        alert ("Please type in at least 3 Characters");
            return;
        }
    let existingPokemon = pokemonArray.filter(pokemon =>//filter gibt immer Array zurück
        pokemon.name.includes(pokemonNameInput));
    showSearchedPokemonCard();

function showSearchedPokemonCard(){
    let cards = document.querySelectorAll(".small-pokemon-card");
    cards.forEach(card => card.style.display = "none"); // alle Karten einmal ausblenden
        if (existingPokemon.length > 0) {  //wenn das Array nicht leer ist, dann 
        existingPokemon.forEach(pokemon =>{  // suche den index aller pokemons im großen PokemonArray und setze ihn gleich dem Index
        let index = pokemonArray.indexOf(pokemon);
        showPokemonCard(index,cards);
            });
        } else {
            let errorMessage = document.getElementById("error-no-pokemon-found");
            errorMessage.style.display="block";
        }
inputField.value = "";
showNoPokemonFound();
}

function showNoPokemonFound(){
setTimeout(function(){
    let errorMessage = document.getElementById("error-no-pokemon-found");
    errorMessage.style.display = "none";
    init();
 }, 3000)
}
}

function showPokemonCard(index, cards){
    cards[index].style.display = "flex"; // nur die mit richtigem Index anzeigen lassen
}

function renderPokemonStats(index){
    let statsTableContainer = document.getElementById("stats-content");
    statsTableContainer.innerHTML = "";
    statsTableContainer.classList.remove("moves-btn-container");
    statsTableContainer.classList.add("column");
    let pokemonStatsArray = pokemonArray[index].stats;
    pokemonStatsArray.forEach(pokemonStat => {
        let value = pokemonStat.base_stat;
        statsTableContainer.innerHTML += showPokemonStats(pokemonStat, value);
    })  
}

function renderPokemonAbout(index){
    let pokemonAbilitiesArray = pokemonArray[index].abilities.map(
        pokemonAbility => pokemonAbility.ability.name);
    let statsTableContainer = document.getElementById("stats-content");
    statsTableContainer.innerHTML = "";
    statsTableContainer.classList.remove("moves-btn-container");
    statsTableContainer.classList.add("column");
    statsTableContainer.innerHTML += `<table class="table-about">
                                                <tr> <td> <b> Weight:</b> ${pokemonArray[index].weight} kg </td> </tr>
                                                <tr> <td> <b> Height: </b> ${pokemonArray[index].height} m</td> </tr>
                                                <tr> <td> <b> Abilty: </b> ${pokemonAbilitiesArray.join(", ")}</td></tr>
                                                <tr> <td> <b> Base Experience: </b> ${pokemonArray[index]["base_experience"]}</td></tr>
                                                <tr> <td> <b> Order: </b> ${pokemonArray[index].order}</td></tr>
                                                </table>` 
}


/// DIESE 2 ZEILEN NOCH AUSLAGERN IN TEMPLATES"




function showPokemonMoves(index){
    let statsTableContainer = document.getElementById("stats-content");
    statsTableContainer.innerHTML = "";
    statsTableContainer.classList.remove("column");
    statsTableContainer.classList.add("moves-btn-container");
        if (pokemonArray[index].moves.length <= 25){
            pokemonArray[index].moves.forEach(pokemonMove => {
            statsTableContainer.innerHTML += `<button class="moves-btn">${pokemonMove.move.name}</button>`
            });
        } else {
            for (let i = 0; i < 26; i++){
                const pokemonMove = pokemonArray[index].moves[i]; 
                statsTableContainer.innerHTML += `<button class="moves-btn">${pokemonMove.move.name}</button>`
        }
    }
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





