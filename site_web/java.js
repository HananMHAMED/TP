let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let CloseCart = document.querySelector('#close-cart');
//Open cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
}
//Close cart
CloseCart.onclick = () =>{
    cart.classList.remove("active");
}

//Cart working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

//Making Function
function ready(){
    //remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    //quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document.querySelector(".btn-by").addEventListener("click", buyButtonClicked);
} 

function buyButtonClicked(){
    alert('Your Order is places');
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity change
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }

    updatetotal();
}

//Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg  = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal()
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart")
            return;
        } 
    }
    var cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
    
}


// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent. getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    //if price contain some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;


}
 .replace(/{{}}/, Object.values().slice(17, 32).filter(i => i).join(", "));

var filterValue = document.getElementById("search-input").value.trim(); 
    const url_carts = ``;
    const reponse = await fetch(url_carts);
    const data = await reponse.json();
    console.log(data);
    return data.data


 const grid_container = document.querySelector("#grid-container");
    grid_container.innerHTML = ""; 

    const template = document.querySelector("#card-template");
    const data = await affichercarte();
    for (const a of data) {					// itère sur le tableau
        let clone = document.importNode(template.content, true);      // clone le template
        let newContent = clone.firstElementChild.innerHTML		// remplace {{modèle}}
            .replace(/{{nom}}/g, a.str)				// et {{couleur}} par
            .replace(/{{info}}/g,)			// leur valeur
            .replace(/{{}}/g, )
        clone.firstElementChild.innerHTML = newContent;		
        clone.querySelector(".card-img").src = a.strimg || "photo.npg";
        document.getElementById("grid-container").appendChild(clone);				// On ajoute le clone créé
    }

// Ajouter un écouteur d'événements pour rechercher dynamiquement
document.getElementById("search-input").addEventListener("input", affichercart);
