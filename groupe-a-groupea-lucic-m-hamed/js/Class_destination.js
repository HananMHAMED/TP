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
let d = (athene  = new Destination("athene", 70));
let e = (belgrade  = new Destination("belgrade", 70));
let f = (dublin  = new Destination("dublin", 70));
let g = (LosAngeles  = new Destination("LosAngeles", 70));
let k = (madrid  = new Destination("madrid", 70));
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
if (lieux == "budapest") var dest = a;
else if (lieux == "cancun") var dest = b;
else if (lieux == "moscou") var dest = c;
function Flieux(lieux) {
  document.body.innerHTML = document.body.innerHTML.replace(
    /{{DLieux}}/g,
    lieux
  );
  document.body.innerHTML = document.body.innerHTML.replace(
    /{{prix}}/g,
    dest.prix
  );
}
