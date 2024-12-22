let resas = [];
function recup_resa() {
  localStorage.depart = document.getElementById("1").value;
  localStorage.arrive = document.getElementById("2").value;
  localStorage.prix = document.getElementById("prixTotal").innerText;
  localStorage.nombre_personne =
    Number(document.getElementById("3").value) +
    Number(document.getElementById("4").value);
  resas.push(a);
}
function affiche_resa() {
  document.body.innerHTML = document.body.innerHTML
    .replace(/{{depart}}/g, localStorage.depart)
    .replace(/{{arrive}}/g, localStorage.arrive)
    .replace(/{{nbrpers}}/g, localStorage.nombre_personne)
    .replace(/{{prixvoyage}}/g, localStorage.prix);
  $("#header").load("header.html"); // Charger l'en-tête
  $("#footer").load("footer.html"); // Charger le pied de page
}
function sup_resa() {
  resas = [];
  localStorage.clear();
  affiche_resa();
}
