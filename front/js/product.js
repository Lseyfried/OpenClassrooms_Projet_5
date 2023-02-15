let formValue, quantity;
// Recupere id de la page.
const id = new URLSearchParams(window.location.search).get("id");
//On recupérer le produit par rapport à l'id de la page.
recoverProduct(`http://localhost:3000/api/products/${id}`);

async function recoverProduct(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    alert("Un Problème est survenu.");
  } else {
    const product = await response.json();
    console.log(product);
    displayProduct(product); //doit injecter data dans la fonction
    addProductEvent();
  }
}

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

  // let quantity = document.getElementById("quantity");
}

//add the product in the LocalStorage after checking
function addProductToBasket(product) {
  let cart = JSON.parse(localStorage.getItem("basket"));

  console.log(cart);
  if (cart === null) {
    //revoir condition
    cart = [];
    // cart.push(product);
    // getStorage(cart);
  }
  for (let index = 0; index < cart.length; index++) {
    // console.log(index); // doit avoir 0123456
    // console.log(product);
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
    addProductToBasket(productToAdd);
    // window.location.href = "cart.html";
  });
}
