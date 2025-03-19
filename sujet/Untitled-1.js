
async function recupererCocktails(nom = "") {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nom}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Liste complète des cocktails :", data);
        return data.drinks || [];
    } catch (error) {
        console.error("Erreur :", error);
        return [];
    }
}

async function afficherCocktails(nom = "") {
    const grid_container = document.querySelector("#grid-container");
    const template = document.querySelector("#card-template");
    grid_container.innerHTML = "";

    const cocktails = await recupererCocktails(nom);

    cocktails.forEach(cocktail => {
        let clone = document.importNode(template.content, true);
        let newContent = clone.firstElementChild.innerHTML
            .replace("{{nom}}", cocktail.strDrink)
            .replace("{{info}}", cocktail.strCategory || "Non spécifié")
            .replace("{{alcool}}", cocktail.strAlcoholic) // Alcoolisé ou non
            .replace("{{ing}}", Object.values(cocktail).slice(17, 32).filter(i => i).join(", "));
        clone.firstElementChild.innerHTML = newContent;
        clone.querySelector(".card-img").src = cocktail.strDrinkThumb || "placeholder.jpg";
        grid_container.appendChild(clone);
    });
}

document.getElementById("search-input").addEventListener("input", (event) => {
    afficherCocktails(event.target.value.trim());
});

afficherCocktails();
