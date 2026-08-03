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
    errorMessage.innerHTML = `<span class="error-text">ERROR</span>
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

function getTemplateSmallPokemonCard(index){
    return `<button onclick="openPokemonDialog(${index})" data-id="card" id="thumbnail" class="small-pokemon-card">
                <h1 id="pokemon-name-${index}" class="pokemon-name"></h1>
                <span id="pokemon-id-${index}" class="pokemon-id-btn">#</span> 
                <div class="sprites-wrapper">
                    <img src="" alt="Pokemon Sprite" data-id="card-image" id="pokemon-sprite-${index}" class="small-pokemon-sprite-img" style="display:none">
                </div>
                <div class="pokemon-type">
                    <span id="pokemon-type1-${index}" class="pokemon-type-btn"></span>
                    <span id="pokemon-type2-${index}" class="pokemon-type-btn"></span> 
                </div>
            </button>`
}

function renderSmallPokemonCard(pokemonDetails, index, pokemonArrayIndex){
    let pokemonSprite = document.getElementById(`pokemon-sprite-${pokemonArrayIndex}`);
    pokemonSprite.src = pokemonDetails[index].sprites.other["official-artwork"].front_default;
    pokemonSprite.style = "display: block";
    let pokemonName = document.getElementById(`pokemon-name-${pokemonArrayIndex}`);
    pokemonName.innerHTML += (pokemonDetails[index].name.charAt(0).toUpperCase() + pokemonDetails[index].name.slice(1));
    let pokemonType1 = document.getElementById(`pokemon-type1-${pokemonArrayIndex}`);
    let pokemonType2 = document.getElementById(`pokemon-type2-${pokemonArrayIndex}`);
    pokemonType1.innerHTML += pokemonDetails[index].types[0].type.name;
        if (pokemonDetails[index].types[1]){
            pokemonType2.innerHTML = pokemonDetails[index].types[1].type.name;
        } else {
            pokemonType2.style.display = "none";
        }
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
    dialogContent.innerHTML=`  <div class="header_dialog"> 
                                <h2 data-id="overlay-pokemon-name" id="pokemon-dialog-name-${index}"></h2>
                                <span id="pokemon-dialog-id-${index}" class="pokemon-id-btn"></span>
                                <div class="pokemon-type">
                                    <span id="pokemon-dialog-type1-${index}" class="pokemon-type-btn"></span>
                                    <span id="pokemon-dialog-type2-${index}" class="pokemon-type-btn"></span> 
                                </div>
                                <button class="close-dialog-btn" onclick="closeDialog(${currentIndex})" data-id="close-dialog-button"> X </button> 
                                <div class="sprites-wrapper">
                                        <img src="" alt="Pokemon Sprite" data-id="big-card-image" id="pokemon-dialog-sprite-${index}" class="big-pokemon-sprite-img">
                                </div>
                            </div>
                            <div class="dialog_body">
                                <table>
                                    <button onclick="showPokemonStats(${index})"><b>About</button>
                                    <button onclick="showPokemonEvolution(${index})"><b>Stats</button>
                                    <button onclick="showPokemonMoves(${index})"><b>Moves</button>
                                    <tr><td></td></tr>
                                    <tr><td>Attack</td></tr>
                                </table>
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
    pokemonName.innerHTML += pokemonArray[index].name;
    let pokemonDialogType1 = document.getElementById(`pokemon-dialog-type1-${index}`);
    let pokemonDialogType2 = document.getElementById(`pokemon-dialog-type2-${index}`);
    pokemonDialogType1.innerHTML += pokemonArray[index].types[0].type.name;
        if (pokemonArray[index].types[1]){
            pokemonDialogType2.innerHTML = pokemonArray[index].types[1].type.name;
        } else {
            pokemonDialogType2.style.display = "none";
        }
    let pokemonDialogID = document.getElementById(`pokemon-dialog-id-${index}`);
    pokemonDialogID.innerHTML += pokemonArray[index].id;
      





}

/* function getPokemonStats(pokemonDetails, index){
    for (let i = 0; i < pokemonDetails[index]stats.length; index++) {
        const stat = array[index];
        
    }
}*/

  
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
            
    
    

    
    


/* function nextCard(index) { 
    index = currentIndex;
    currentIndex++;
    if(currentIndex>= pokemonArray.length) {
        currentIndex = 0;
    }
    renderBigPokemonCard(index);
    getTemplateBigPokemonCard(index);
} 

function previousCard(index) {
    index = currentIndex;
    currentIndex--;
    if(currentIndex< 0) {
        currentIndex = (pokemonArray.length)-1;};
     renderBigPokemonCard(index);
    getTemplateBigPokemonCard(index);
}







*/

