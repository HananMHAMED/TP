async function afficher(){
    /*masquer le bouton*/
    const button  = document.querySelector('button');
    button.style.display = "none";
    
    const grid_container = document.querySelector("#grid-container")
    const template = document.querySelector("#card-template")

    for(let i = 0; i<100; i++) { // itère sur le tableau
        let url_img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
        url_nom = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`
        const reponse = await fetch(url_nom)
        const data = await reponse.json()
        const nomPokomen = data.names[4].name
        let clone = document.importNode(template.content, true);      // clone le template
        clone.firstElementChild.querySelector("img").src = url_img
        newContent= clone.firstElementChild.innerHTML 
        .replace(/{{nom}}/g, nomPokomen) 
        .replace(/{{numero}}/g, i + 1) 
        clone.firstElementChild.innerHTML= newContent;
        grid_container.appendChild(clone); // On ajoute le clone créé
    }
       
}