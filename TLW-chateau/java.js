
function afficherMessage() {
    document.getElementById("mon_par").innerText = "Super, ça marche !"
}
 function ajouter() {
    let nouveau_par = document.createElement("p")
    nouveau_par.innerText = document.getElementById("mon_input").value
    document.body.appendChild(nouveau_par)
 }

function supprimer() {
    elt_to_del = document.getElementsByTagName("p")[0]
    document.body.removeChild(elt_to_del)
}
