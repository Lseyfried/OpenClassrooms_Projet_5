// Recupere id de la page.
const id = new URLSearchParams(window.location.search).get("id");

recoverProduct(`http://localhost:3000/api/products/${id}`);

//On recupérer le produit par rapport à l'id de la page.
async function recoverProduct(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    alert("Un Problème est survenu.");
  } else {
    const product = await response.json();
    console.log(product);
    displayProduct(product);
    addProductEvent();
  }
}

// Donne les propriétés des produits à la page
function displayProduct(product) {
  let image = document.querySelector(".item__img");
  image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = product.price;
  document.getElementById("description").textContent = product.description;
  colorsElt = document.getElementById("colors");
  product.colors.forEach((color) => {
    colorsElt.innerHTML += `<option value=${color}>${color}</option>`;
  });
}

//add the product in the LocalStorage after checking
function addProductToBasket(product) {
  let cart = JSON.parse(localStorage.getItem("basket"));
  if (cart === null) {
    cart = [];
  }
  for (let index = 0; index < cart.length; index++) {
    console.log(index);
    if (
      cart[index].color === colorsElt.value &&
      cart[index].id === product.id
    ) {
      cart[index].quantity += Number(product.quantity);
      return setStorage(cart);
    }
  }
  cart.push(product);
  setStorage(cart);
}

// Put the product in the LocalStorage
function setStorage(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}

//Recover the product and check if it's already exist in the basket
function addProductEvent() {
  document.getElementById("addToCart").addEventListener("click", (e) => {
    e.preventDefault();
    const productToAdd = {
      id,
      quantity: Number(document.getElementById("quantity").value),
      color: colorsElt.value,
    };
    console.log(productToAdd);
    if (productToAdd.quantity === 0 || productToAdd.color === "") {
      alert("Veuillez entrer une quantité et/ou une couleur");
    } else {
      addProductToBasket(productToAdd);
    }
  });
}
