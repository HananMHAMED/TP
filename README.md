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

async function getUsers() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) { 
            throw new Error("Erreur HTTP : " + response.status);
        }

        let users = await response.json();
        console.log(users);
    } catch (error) {
        console.error("Une erreur est survenue :", error.message);
    }
}

getUsers();
