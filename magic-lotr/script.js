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

    // Récupération des symboles de mana
    const symbols = await getSymbols();

    // Appel de la fonction pour afficher les cartes dans le HTML
    afficherCartesHTML(cartes, symbols);
}

async function getSymbols() {
    const url = "https://api.scryfall.com/symbology";
    const response = await fetch(url);
    const data = await response.json();
    
    // Créer un dictionnaire pour associer les symboles aux URL des images
    const symbolsDict = {};
    data.data.forEach(symbol => {
        symbolsDict[symbol.symbol] = symbol.svg_uri;
    });
    
    return symbolsDict;
}


function afficherCartesHTML(cartes, symbols) {
    // Récupérer le conteneur de la grille
    const gridContainer = document.getElementById("grid-container");
    
    // Récupérer le template HTML pour les cartes
    const cardTemplate = document.getElementById("card-template");

    // Parcourir toutes les cartes et les afficher
    cartes.forEach(carte => {
        // Cloner le template
        const cardClone = cardTemplate.content.cloneNode(true);

        // Ajouter l'image de la carte
        const cardImg = cardClone.querySelector(".card-img");
        if (carte.image_uris && carte.image_uris.normal) {
            cardImg.src = carte.image_uris.normal;
        }

        // Ajouter le titre de la carte
        const cardTitle = cardClone.querySelector("p");
        if (carte.printed_name) {
            cardTitle.textContent = carte.printed_name;
        }

        const manaCostContainer = cardClone.querySelector(".mana-cost");
        if (carte.mana_cost) {
            const manaSymbols = parseMana(carte.mana_cost);
            manaSymbols.forEach(symbol => {
                const symbolImg = document.createElement("img");
                symbolImg.src = symbols[symbol] || "";
                symbolImg.className = "mana";
                manaCostContainer.appendChild(symbolImg);
            });
        }

        // Ajouter la carte clonée au grid-container
        gridContainer.appendChild(cardClone);
    });
}






