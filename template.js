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
function showPokemonTypeBtn(type){
    return `<span class="pokemon-type-btn">${type.type.name}</span>`;
}

function showErrorMessage(message){
    return `<span class="error-text" data-id="not-found">ERROR</span>
                            <p class="error-message-content">${message}</p>
                            <button onclick="init()" class="loading-btn">Restart</button>` 
}

function getTemplateBigPokemonCard(index){
    return `<div class="close-btn-wrapper">
                <button class="close-dialog-btn" onclick="closeDialog(${currentIndex})" data-id="close-dialog-button"> X </button> 
            </div>
            <div class="header-dialog"> 
                <div class="pokemon-dialog-name-wrapper">
                        <h2 id="pokemon-dialog-name-${index}" class="pokemon-dialog-name"></h2>
                        <div class="pokemon-id-container">
                            <span id="pokemon-dialog-id-${index}" class="pokemon-id-btn big-id"></span>
                        </div>
                </div>
            </div>
            <div class="second-line-pokemon-dialog">
                <div class="pokemon-type pokemon-dialog-type" id="pokemon-dialog-type-${index}">
                </div>
            </div>
            <div class="sprites-wrapper">
                <img src="" alt="Pokemon Sprite" data-id="dialog-image" id="pokemon-dialog-sprite-${index}" class="big-pokemon-sprite-img">
            </div>
            <div class="dialog-body">
                <div class="table-headline">
                    <button onclick="renderPokemonStats(${index})"><b>Stats</b></button>
                    <button onclick="renderPokemonAbout(${index})"><b>About</b></button>
                    <button onclick="renderPokemonMoves(${index})"><b>Moves</b></button>
                </div>
                <div class="stats-content" id="stats-content">                    
                </div>
            </div> 
            <div class="footer_dialog"> 
                <button class="arrow" onclick="previousCard()" data-id="prev-button">&larr;</button>
                <button class="arrow" onclick="nextCard()" data-id="next-button">&rarr;</button>
            </div>`
}

function showDialogTypeBtn(type){
    return `<span class="pokemon-type-btn">${type.type.name}</span>`;
}

function showPokemonStats(pokemonStat, value){
    return `<div class="stat-row">
                <span class="stat-name">${pokemonStat.stat.name.charAt(0).toUpperCase() + pokemonStat.stat.name.slice(1)}</span>
                <span class="stat-value"><b>${value}</b></span>
                <div class="stat-bar-background">
                    <div class="stat-bar-fill" style="width:${value}%"></div>
                </div>
            </div>`
}

function showPokemonMoves(pokemonMove){
    return `<button class="moves-btn">${pokemonMove.move.name}</button>`
}

function showPokemonAbout(index, pokemonAbilitiesArray){
    return `<table class="table-about">
            <tr> <td> <b> Weight:</b> ${pokemonArray[index].weight} kg </td> </tr>
            <tr> <td> <b> Height: </b> ${pokemonArray[index].height} m</td> </tr>
            <tr> <td> <b> Abilty: </b> ${pokemonAbilitiesArray.join(", ")}</td></tr>
            <tr> <td> <b> Base Experience: </b> ${pokemonArray[index]["base_experience"]}</td></tr>
            <tr> <td> <b> Order: </b> ${pokemonArray[index].order}</td></tr>
            </table>` 
}