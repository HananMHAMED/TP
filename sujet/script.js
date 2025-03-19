async function recupererCocktails(){ 
    var filterValue = document.getElementById("search-input").value.trim(); // Suppression de parseFloat()
    const url_carts = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filterValue}`;
    const reponse = await fetch(url_carts);
    const data = await reponse.json();
    console.log("Liste complète des cocktails :", data);
    return data.drinks
}

async function afficherCocktails(){
    const grid_container = document.querySelector("#grid-container");
    grid_container.innerHTML = ""; // Nettoie l'affichage avant d'ajouter de nouveaux cocktails

    const template = document.querySelector("#card-template");
    const cocktails = await recupererCocktails();
    for (const cocktail of cocktails) {					// itère sur le tableau
        let clone = document.importNode(template.content, true);      // clone le template
        let newContent = clone.firstElementChild.innerHTML		// remplace {{modèle}}
            .replace(/{{nom}}/g, cocktail.strDrink)				// et {{couleur}} par
            .replace(/{{info}}/g, cocktail.strCategory || "Non spécifié")			// leur valeur
            .replace(/{{alcool}}/g, cocktail.strAlcoholic)
            .replace(/{{desc}}/, Object.values(cocktail).slice(17, 32).filter(i => i).join(", "));
        clone.firstElementChild.innerHTML = newContent;		
        clone.querySelector(".card-img").src = cocktail.strDrinkThumb || "placeholder.jpg";
        document.getElementById("grid-container").appendChild(clone);				// On ajoute le clone créé
    }
}

// Ajouter un écouteur d'événements pour rechercher dynamiquement
document.getElementById("search-input").addEventListener("input", afficherCocktails);