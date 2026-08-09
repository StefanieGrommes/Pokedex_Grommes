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

let dialogContent= document.getElementById("pokemon-dialog-content");
function getTemplateBigPokemonCard(index){
    dialogContent.innerHTML= ` <div class="close-btn-wrapper">
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
                                    <button onclick="showPokemonMoves(${index})"><b>Moves</b></button>
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

function showDialogTypeBtn(type){
    return `<span class="pokemon-type-btn">${type.type.name}</span>`;
}

function showPokemonStats(pokemonStat, value){
    return `<div class="stat-row">
            <span class="stat-name">${pokemonStat.stat.name.charAt(0).toUpperCase() + pokemonStat.stat.name.slice(1)}</span>
            <span class="stat-value"><b>${value}</b></span>
            </div>
            <div class="stat-bar-background">
                <div class="stat-bar-fill" style="width:${value}%"></div>
            </div>`
}