// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

{
tableau_actu = [
    {
        titre : "Soutenez le château",
        texte : "Avec la crise sanitaire, la fréquentation a chuté de 80%. Aidez le Château en faisant un don en ligne.",
        image : "monalisa",
        bouton : "Je fais un don"
    },
    {
        titre : "Féérie des eaux",
        texte : "Venez assister à notre féérie des eaux nocturne, un spectacle son et lumière qui ravira les petits et les grands.",
        image : "feu-artifice",
        bouton : "Plus d'informations"
    },
    {
        titre : "Exposition de peinture",
        texte : "Les plus grands maîtres de la peinture classique s'invitent au Château pour une exposition temporaire exceptionnelle.",
        image : "peinture",
        bouton : "Billetterie"
    }
    ]
}

let template = document.querySelector("#my_template");

for (const a of tableau_actu) {					// itère sur le tableau
    let clone = document.importNode(template.content, true);      // clone le template

    newContent = clone.firstElementChild.innerHTML		// remplace {{modèle}}
        .replace(/{{actu-image}}/g, a.image)				// et {{couleur}} par
        .replace(/{{actu-texte}}/g, a.texte)			// leur valeur
        .replace(/{{actu-bouton}}/g, a.bouton)
        .replace(/{{actu-titre}}/g, a.titre)
    clone.firstElementChild.innerHTML = newContent;		

    document.getElementById("grid-container").appendChild(clone);				// On ajoute le clone créé
}
