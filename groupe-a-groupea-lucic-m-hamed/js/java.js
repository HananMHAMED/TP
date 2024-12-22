function supprimer() {
  var form = document.getElementById("delete2");
  var inputs = form.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  var form = document.getElementById("delete1");
  var inputs = form.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    console.log(inputs[i].type);
    if (inputs[i].type == "radio") {
      inputs[i].checked = false;
    }
  }
}

// Calcul du prix total du voyage
function calcule_Prix_total(dest) {
  let prixBase = 0; // Prix de base
  let prixParAdulte = dest.prix; // Prix par adulte
  let prixParEnfant = 0.4 * dest.prix; // Prix par enfant
  let PetitDejeuner = document.getElementById("5").checked; // si  petit déjeuner
  let nbAdultes = parseInt(document.getElementById("3").value) || 0;
  let nbEnfants = parseInt(document.getElementById("4").value) || 0;

  // Récupérer les dates et calculer le nombre de jours
  let Date_depart = new Date(document.getElementById("1").value);
  let Date_retour = new Date(document.getElementById("2").value);
  if (Date_depart > Date_retour) {
    alert("date de depart impossible");
  }
  let nombreJours = Math.ceil((Date_retour - Date_depart) / (1000 * 60 * 60 * 24)); // Convertir en jours
  
  // Calcul du prix total
  let total =
    (prixBase + nbAdultes * prixParAdulte + nbEnfants * prixParEnfant) *
    nombreJours;
  if (PetitDejeuner) {
    total += 15 * (nbAdultes + nbEnfants) * nombreJours;
  }
  Prixtot = total.toString();
  // Affichage du prix total

  if (typeof nombreJours == "number") {
    document.getElementById("prixTotal").innerText = Prixtot + "€";
    
  }
}

let Destinations = [];
class Destination {
  constructor(v, m) {
    this.lieux = v;
    this.prix = m;
  }
}

let a = (budapest = new Destination("budapest", 40));
let b = (cancun = new Destination("cancun", 50));
let c = (moscou = new Destination("moscou", 60));
let d = (athene = new Destination("athene", 70));
let e = (belgrade = new Destination("belgrade", 70));
let f = (dublin = new Destination("dublin", 70));
let g = (LosAngeles = new Destination("LosAngeles", 70));
let k = (madrid = new Destination("madrid", 70));
let l = (wuhan = new Destination("wuhan", 70));

Destinations.push(budapest);
Destinations.push(moscou);
Destinations.push(cancun);
Destinations.push(athene);
Destinations.push(belgrade);
Destinations.push(dublin);
Destinations.push(LosAngeles);
Destinations.push(madrid);
Destinations.push(wuhan);

let lieux = new URLSearchParams(window.location.search).get("id");
//let prix = lieux.prix;
if (lieux == "budapest") var dest = budapest;
else if (lieux == "cancun") var dest = b;
else if (lieux == "moscou") var dest = c;
else if (lieux == "athene") var dest = d;
else if (lieux == "belgrade") var dest = e;
else if (lieux == "dublin") var dest = f;
else if (lieux == "LosAngeles") var dest = g;
else if (lieux == "madrid") var dest = k;
else if (lieux == "wuhan") var dest = l;

function Flieux(lieux) {
  document.body.innerHTML = document.body.innerHTML.replace(
    /{{DLieux}}/g,
    lieux.toUpperCase()
  );
  document.body.innerHTML = document.body.innerHTML.replace(
    /{{prix}}/g,
    dest.prix
  );
  $("#header").load("header.html"); // Charger l'en-tête
  $("#footer").load("footer.html"); // Charger le pied de page
}

/*fetch("../json/Base_Donee_Dest.json")
  .then((response) => response.json())
  .then((datas) => {
    for (const data of datas) {
      let destination = new Destination(data.lieux, data.prix);
      Destinations.push(destination);
    }
    grilleDest();
  });*/

function grilleDest() {
  let template = document.querySelector("#ListeDestination");
  let container = document.getElementById("grid");
  for (const v of Destinations) {
    // itère sur le tableau

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${v.lieux.toLowerCase()}&lang=fr&appid=f115442562e8299ee4aa26de0eaf7ee6`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.main.temp);
        let r = data.main.temp - 273.15; // Conversion correcte de Kelvin en Celsius
        let h = r.toFixed(2);
        let clone = document.importNode(template.content, true); // Clone le template
        let newContent = clone.firstElementChild.innerHTML
          .replace(/{{lieux}}/g, v.lieux) // Remplace {{lieux}}
          .replace(/{{temp}}/g, h + "°");
        clone.firstElementChild.innerHTML = newContent;
        container.appendChild(clone); // Ajoute le clone créé
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données météo :",
          error
        );
      });
  }
}

// filtre

//Fonction de filtrage qui est appelée lors du clic sur le bouton "Search"
document.getElementById("search").addEventListener("click", function () {
  var filterValue = parseFloat(document.getElementById("search-input").value); // Récupère le prix entré
  var grid = document.querySelectorAll(".griditem"); // Sélectionne toutes les destinations

  // Si la valeur du champ de recherche est un nombre valide
  if (!isNaN(filterValue)) {
    grid.forEach(function (griditem) {
      var price = parseFloat(griditem.getAttribute("data-price")); // Récupère le prix de chaque destination

      // Si le prix de la destination ne correspond pas au prix recherché, on la cache
      if (price == filterValue) {
        griditem.style.display = "block"; // Cache la destination
      } else {
        griditem.style.display = "none"; // Affiche la destination
      }
    });
  } else {
    // Si la valeur entrée n'est pas un nombre, on réaffiche toutes les destinations
    grid.forEach(function (griditem) {
      griditem.style.display = "block";
    });
  }
});

// Fonction pour réinitialiser les filtres et réafficher toutes les destinations
document.getElementById("all").addEventListener("click", function () {
  // Réinitialise le champ de filtre
  document.getElementById("search-input").value = "";

  // Réaffiche toutes les destinations
  var grid = document.querySelectorAll(".griditem");
  grid.forEach(function (griditem) {
    griditem.style.display = "block"; // Affiche toutes les destinations
  });
});
function ajouter_au_panier() {}
