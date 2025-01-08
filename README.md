# TP
TP
Stackoverflow W3School MDN s 
/* Correction */
function ecrireCartes() {
    fetch(" https://api.scryfall.com/cards/search?q=e:ltr%20lang:fr&format=json&order=set&unique=prints ")
    .then(response => response.json())
    .then(donnees => {
        for (cartes of donnees.data) {
            myP = document.createElement("p")
            myP.innerText = cartes.printed_name
            document.body.appendChild(myP)
        }
    })
}
