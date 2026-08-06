sync function fetchDataEvolutionChain(index){
    let speciesURL = pokemonArray[index].species.url 
    try {
        let responseSpecies = await fetch(speciesURL);
        if (!response.ok){
        throw new Error("Trouble loading Pokemons! Reload Site!")
        }
        let responseSpeciesToJson = await responseSpecies.json();
        return responseSpeciesToJson;
        }
    catch(error) {
        showError(error.message);
        return;
    }

    let evolutionChainURL = responseSpeciesToJson["evolution_chain"].url;
     try {
        let responseEvolutionChain = await fetch(evolutionChainURL);
        if (!responseEvolutionChain.ok){
        throw new Error("Trouble loading Pokemons! Reload Site!")
        }
        let responseEvolutionChainToJson = await responseEvolutionChain.json();
        return responseEvolutionChainToJson;
        }
    catch(error) {
        showError(error.message);
        return;
    }

    let firstGenerationPokemon = responseEvolutionChainToJson.chain["evolves_from_species"].url;
    try {
        let responseFirstGenerationPokemon = await fetch(firstGenerationPokemon);
        if (!responseFirstGenerationPokemon.ok){
        throw new Error("Trouble loading Pokemons! Reload Site!")
        }
        let responseFirstGenerationPokemonToJson = await responseFirstGenerationPokemon.json();
        return responseFirstGenerationPokemonToJson;
        }
    catch(error) {
        showError(error.message);
        return;
    }

    let secondGenerationPokemon = responseEvolutionChainToJson["evolves_from_species"].url;
    try {
        let responseSecondGenerationPokemon = await fetch(secondGenerationPokemon);
        if (!responseSecondGenerationPokemon.ok){
        throw new Error("Trouble loading Pokemons! Reload Site!")
        }
        let responseSecondGenerationPokemonToJson = await responseSecondGenerationPokemon.json();
        return responseSecondGenerationPokemonToJson;
        }
    catch(error) {
        showError(error.message);
        return;

    showEvolutionChain(index);
}

 function showEvolutionChain(index){
    let sprite.innerHTML = responseEvolutionChainToJson.evolves_from_species.url
}
// 1. sprite :  chain.species.url
//2. sprite : chain.evolves_to[0].species.url     davon URL fetchen
// 3.sprite: chain.evolves_to[0].evolves_to.species.url
}