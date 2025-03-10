async function recupererProduits(){
    const grid_container = document.querySelector("#grid-container");
    const template = document.querySelector("#card-template");

    const url_carts = "https://world.openfoodfacts.org/api/v2/search?countries_tags_en=france&page_size=102&fields=product_name,image_small_url,nutriscore_grade,nova_group,ecoscore_grade,brands,quantity"
    const reponse = await fetch(url_carts);
    const data = await reponse.json();
    const products = data.products;

    for(let i = 0; i<products.length; i++){
        let product = products[i]
        
        let clone = document.importNode(template.content, true);      // clone le template

        let url_img = product.image_small_url || "images/default.png";
        clone.querySelector(".image").src = url_img
        let infos = `${product.product_name || "Nom inconnu"} - ${product.brands} - ${product.quantity || "Quantité inconnue"}`;


        // ⚠️ Vérification : On ignore les produits sans image ou sans marque
        if (!product.image_small_url || !product.brands || !product.product_name) {
            console.warn("Produit ignoré (pas de marque ou d'image) :", product);
            continue;
        }
        let newContent= clone.querySelector(".card").innerHTML
            .replace(/{{nom}}/g, infos) 
        clone.querySelector(".card").innerHTML = newContent
        
        // Mise à jour des images des scores
        clone.firstElementChild.querySelector(".nutriscore").src = "images/nutriscore-" + (product.nutriscore_grade || "unknown") + ".svg";
        clone.firstElementChild.querySelector(".nova-group").src = "images/nova-group-" + (product.nova_group || "unknown") + ".svg";
        clone.firstElementChild.querySelector(".ecoscore").src = "images/ecoscore-" + (product.ecoscore_grade || "unknown") + ".svg";

        grid_container.appendChild(clone); // On ajoute le clone créé
    }

}

// Exécuter la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", recupererProduits);