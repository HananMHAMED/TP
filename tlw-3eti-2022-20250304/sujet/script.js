// Affiche le bouton quand l'utilisateur descend de 20px depuis le haut du document
window.onscroll = function() { scrollFunction() };

const liensVisites = document.querySelectorAll("#visites a");
for(const lien of liensVisites){
    lien.style.color = "#666";
    lien.style.textDecoration = "none"
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
// Retourne en haut du document quand l'utilisateur clique sur le bouton
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

async function remplir_actu(){
    const reponse = await fetch("actu.json")
    const data = await reponse.json()
        
        let template = document.querySelector("#my_template");
        
        for (const a of data.tableau_actu) {					// itère sur le tableau
            let clone = document.importNode(template.content, true);      // clone le template
        
            let newContent = clone.firstElementChild.innerHTML		// remplace {{modèle}}
                .replace(/{{actu-image}}/g, a.image)				// et {{couleur}} par
                .replace(/{{actu-texte}}/g, a.texte)			// leur valeur
                .replace(/{{actu-bouton}}/g, a.bouton)
                .replace(/{{actu-titre}}/g, a.titre)
            clone.firstElementChild.innerHTML = newContent;		
        
            document.getElementById("grid-container").appendChild(clone);				// On ajoute le clone créé
        }
        
    
}

// Exécuter la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", remplir_actu);