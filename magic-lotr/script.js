function parseMana(str) {
    return str.split(/\s*({\w*})\s*/g).filter(Boolean);
}

async function afficherCartes() {
    const baseUrl = "https://api.scryfall.com/cards/search?q=e%3Altr+lang%3Afr&format=json&order=set&unique=prints";
    let cartes = [];
    let nextPageUrl = baseUrl; // La première page

    while (nextPageUrl) {
        try {
            // Appel API pour récupérer les données JSON
            const response = await fetch(nextPageUrl);
            const data = await response.json();

            // Ajout des cartes de cette page à notre tableau
            cartes = cartes.concat(data.data);

            // Si la page suivante existe, nous mettons à jour nextPageUrl
            nextPageUrl = data.has_more ? data.next_page : null;
        } catch (error) {
            console.error("Erreur lors de la récupération des cartes:", error);
            break;
        }
    }

    // Afficher la taille du tableau des cartes dans la console
    console.log("Nombre total de cartes récupérées:", cartes.length);

    const symbolsDict = await getSymbols();
    const grid_container = document.querySelector("#grid-container");
    const template = document.querySelector("#card-template");
    for(const carte of cartes) { // itère sur le tableau
        let url_img = carte.image_uris.normal;
        let text = carte.printed_name;
        let manaSymbols = parseMana(carte.mana_cost); 
        let clone = document.importNode(template.content, true);      // clone le template
        clone.firstElementChild.querySelector("img").src = url_img
        newContent= clone.firstElementChild.innerHTML
        .replace(/{{texte}}/g, text);
        clone.firstElementChild.innerHTML= newContent;
        
        // Sélection du conteneur existant pour les symboles de mana
        let manaContainer = clone.querySelector(".mana-cost");
        // Ajout des images de symboles de mana
        for (let i = 0; i < manaSymbols.length; i++) {
            let symbol = manaSymbols[i];
            if (symbolsDict[symbol]) {
                let img = document.createElement("img");
                img.src = symbolsDict[symbol];
                img.classList.add("mana"); // Ajout de la classe CSS
                manaContainer.appendChild(img);
            }
        }

        grid_container.appendChild(clone); // On ajoute le clone créé
    }
}

async function getSymbols(){
    const url = "https://api.scryfall.com/symbology";
    const response = await fetch(url);
    const data = await response.json();

    const symbolsDict = {};
    for (let i = 0; i < data.data.length; i++) {
        let symbolObj = data.data[i];
        symbolsDict[symbolObj.symbol] = symbolObj.svg_uri;
    }

    return symbolsDict;
}

document.addEventListener("scroll", function() {
    document.querySelector("header").style.position = "fixed";
});


document.addEventListener("scroll", function() {
    document.body.style.backgroundPositionY = -document.documentElement.scrollTop * 0.5 + "px";
});



