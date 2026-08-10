function getTemplateSmallPokemonCard(pokemonArrayIndex){
    return `<button onclick="openPokemonDialog(${pokemonArrayIndex})" data-id="card" id="thumbnail" class="small-pokemon-card" aria-label="open-pokemon-dialog-button">
                <h1 id="pokemon-name-${pokemonArrayIndex}" class="pokemon-name" aria-label="pokemon-name"></h1>
                <span id="pokemon-id-${pokemonArrayIndex}" class="pokemon-id-btn" aria-label="pokemon-id-button">#</span> 
                <div class="sprites-wrapper" id="sprites-bg-${pokemonArrayIndex}" aria-label="sprites-wrapper">
                    <img src="" alt="Pokemon Sprite" data-id="card-image" id="pokemon-sprite-${pokemonArrayIndex}" class="small-pokemon-sprite-img" style="display:none">
                </div>
                <div id="pokemon-type-${pokemonArrayIndex}" class="pokemon-type" aria-label="pokemon-type">
                </div>
            </button>`
}
function showPokemonTypeBtn(type){
    return `<span class="pokemon-type-btn" aria-label="pokemon-type-button">${type.type.name}</span>`;
}

function showErrorMessage(message){
    return `<span class="error-text" data-id="not-found" aria-label="error">ERROR</span>
                            <p class="error-message-content" aria-label="error-message-content">${message}</p>
                            <button onclick="init()" class="loading-btn" aria-label="restart-button">Restart</button>` 
}

function getTemplateBigPokemonCard(index){
    return `<div class="close-btn-wrapper" aria-label="close-button-wrapper">
                <button class="close-dialog-btn" onclick="closeDialog(${currentIndex})" aria-label="close-dialog-button" data-id="close-dialog-button"> X </button> 
            </div>
            <div class="header-dialog" aria-label="header-dialog"> 
                <div class="pokemon-dialog-name-wrapper" aria-label="pokemon-dialog-name-wrapper">
                        <h2 id="pokemon-dialog-name-${index}" class="pokemon-dialog-name" aria-label="pokemon-dialog-name"></h2>
                        <div class="pokemon-id-container" aria-label="pokemon-id-container">
                            <span id="pokemon-dialog-id-${index}" class="pokemon-id-btn big-id" aria-label="pokemon-id"></span>
                        </div>
                </div>
            </div>
            <div class="second-line-pokemon-dialog" aria-label="second-line-pokemon-dialog">
                <div class="pokemon-type pokemon-dialog-type" id="pokemon-dialog-type-${index}" aria-label="pokemon-type">
                </div>
            </div>
            <div class="sprites-wrapper" aria-label="sprites-wrapper">
                <img src="" alt="Pokemon Sprite" data-id="dialog-image" id="pokemon-dialog-sprite-${index}" class="big-pokemon-sprite-img">
            </div>
            <div class="dialog-body" aria-label="dialog-body">
                <div class="table-headline" aria-label="table-headline">
                    <button onclick="renderPokemonStats(${index})" aria-label="render-pokemon-stats-button"><b>Stats</b></button>
                    <button onclick="renderPokemonAbout(${index})" aria-label="render-pokemon-about-button"><b>About</b></button>
                    <button onclick="renderPokemonMoves(${index})" aria-label="render-pokemon-moves-button"><b>Moves</b></button>
                </div>
                <div class="stats-content" id="stats-content" aria-label="stats-content">                    
                </div>
            </div> 
            <div class="footer-dialog" aria-label="footer-dialog"> 
                <button class="arrow" onclick="previousCard()" data-id="prev-button" aria-label="previous-card-button">&larr;</button>
                <button class="arrow" onclick="nextCard()" data-id="next-button" aria-label="next-card-button">&rarr;</button>
            </div>`
}

function showDialogTypeBtn(type){
    return `<span class="pokemon-type-btn" aria-label="pokemon-type">${type.type.name}</span>`;
}

function showPokemonStats(pokemonStat, value){
    return `<div class="stat-row" aria-label="stat-row">
                <span class="stat-name" aria-label="stat-name">${pokemonStat.stat.name.charAt(0).toUpperCase() + pokemonStat.stat.name.slice(1)}</span>
                <span class="stat-value" aria-label="stat-value"><b>${value}</b></span>
                <div class="stat-bar-background" aria-label="stat-bar-background">
                    <div class="stat-bar-fill" style="width:${value}%" aria-label="stat-bar-fill"></div>
                </div>
            </div>`
}

function showPokemonMoves(pokemonMove){
    return `<button class="moves-btn" aria-label="pokemon-moves">${pokemonMove.move.name}</button>`
}

function showPokemonAbout(index, pokemonAbilitiesArray){
    return `<table class="table-about" aria-label="table-about">
            <tr> <td aria-label="weight"> <b> Weight:</b> ${pokemonArray[index].weight} kg </td> </tr>
            <tr> <td aria-label="height"> <b> Height: </b> ${pokemonArray[index].height} m</td> </tr>
            <tr> <td aria-label="ability"> <b> Abilty: </b> ${pokemonAbilitiesArray.join(", ")}</td></tr>
            <tr> <td aria-label="base-experience"> <b> Base Experience: </b> ${pokemonArray[index]["base_experience"]}</td></tr>
            <tr> <td aria-label="order"> <b> Order: </b> ${pokemonArray[index].order}</td></tr>
            </table>` 
}