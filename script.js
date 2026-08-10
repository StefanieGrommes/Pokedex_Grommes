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
        renderError(error.message);
        return;
    }
    getDetails(responseToJson);
}

function renderError(message){
    const errorMessage = document.getElementById("error-message");
    const loadMoreBtn = document.getElementById("loading-more-pokemons");
    loadMoreBtn.style.display="none";
    errorMessage.innerHTML += showErrorMessage(message); 
}

async function getDetails(responseToJson){
    let pokemonResults = responseToJson.results;
    let pokemonDetails = [];
    const promises = pokemonResults.map(async(pokemon) => { 
        const pokemonResponse = await fetch (pokemon.url);
        return await pokemonResponse.json();
        });
    pokemonDetails = await Promise.all(promises); 
    renderPokemons(pokemonDetails);
    hideLoadingSpinner();
}

function renderPokemons(pokemonDetails){
    let thumbnailRef = document.getElementById("pokemon-thumbnails-content");
    if(offset === 0){
    thumbnailRef.innerHTML = "";
    }
        for (let index = 0; index < pokemonDetails.length; index++) { 
            let pokemonArrayIndex = pokemonArray.length; 
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
    let dialogContent= document.getElementById("pokemon-dialog-content");
    dialogContent.innerHTML = getTemplateBigPokemonCard(index);
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
    let existingPokemon = pokemonArray.filter(pokemon =>
        pokemon.name.includes(pokemonNameInput));
    showSearchedPokemonCard();

function showSearchedPokemonCard(){
    let cards = document.querySelectorAll(".small-pokemon-card");
    cards.forEach(card => card.style.display = "none"); 
        if (existingPokemon.length > 0) {  
        existingPokemon.forEach(pokemon =>{  
        let index = pokemonArray.indexOf(pokemon);
        showPokemonCard(index,cards);
            });
        } else {
            let errorMessage = document.getElementById("error-no-pokemon-found");
            errorMessage.style.display="block";
            showNoPokemonFound();
        }
inputField.value = "";
}

function showNoPokemonFound(){
setTimeout(function(){
    let errorMessage = document.getElementById("error-no-pokemon-found");
    errorMessage.style.display = "none";
    let cards = document.querySelectorAll(".small-pokemon-card");
        cards.forEach(card => {
            card.style.display = "flex";
        });
 }, 3000)
}
}

function showPokemonCard(index, cards){
    cards[index].style.display = "flex"; 
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
    statsTableContainer.innerHTML += showPokemonAbout(index, pokemonAbilitiesArray);
}

function renderPokemonMoves(index){
    let statsTableContainer = document.getElementById("stats-content");
    statsTableContainer.innerHTML = "";
    statsTableContainer.classList.remove("column");
    statsTableContainer.classList.add("moves-btn-container");
        if (pokemonArray[index].moves.length <= 20){
            pokemonArray[index].moves.forEach(pokemonMove => {statsTableContainer.innerHTML += showPokemonMoves(pokemonMove);
            });
        } else {
            for (let i = 0; i < 19; i++){
                const pokemonMove = pokemonArray[index].moves[i]; 
                statsTableContainer.innerHTML += showPokemonMoves(pokemonMove);
            }
        }
}

 function nextCard(){ 
    currentIndex++;
    if(currentIndex >= pokemonArray.length) {
        currentIndex = 0;
    }
    renderCurrentPokemon();
} 

function previousCard(){
    currentIndex--;
    if(currentIndex < 0) {
        currentIndex = (pokemonArray.length)-1;};
    renderCurrentPokemon();
}

function renderCurrentPokemon(){
    let dialogContent = document.getElementById("pokemon-dialog-content");
    dialogContent.innerHTML = getTemplateBigPokemonCard(currentIndex);
    renderBigPokemonCard(currentIndex);
}





