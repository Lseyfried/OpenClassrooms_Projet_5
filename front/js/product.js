let formValue, quantity;
// Recupere id de la page.
const end_url = new URLSearchParams(window.location.search).get("id");
//On recupérer le produit par rapport à l'id de la page.
recoverProducts(`http://localhost:3000/api/products/${end_url}`);

async function recoverProducts(API) {
  const response = await fetch(API, {
    method: "GET",
  });
  if (!response.ok) {
    alert("Un Problème est survenu.");
  } else {
    data = await response.json();
    console.log(data);
    displayProduct();
  }
}

function displayProduct() {
  let image = document.querySelector(".item__img");
  image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  document.getElementById("title").textContent = data.name;
  document.getElementById("price").textContent = data.price;
  document.getElementById("description").textContent = data.description;
  formValue = document.getElementById("colors");
  for (const colorSelected of data.colors) {
    formValue.innerHTML += `<option value=${colorSelected}>${colorSelected}</option>`;
  }
  quantity = document.getElementById("quantity");
  document.getElementById("addToCart").addEventListener("click", () => {
    let produitInformations = {
      id: end_url,
      quantity: Number(quantity.value),
      color: formValue.value,
    };
    console.log(produitInformations);
    addProductToBasket(produitInformations);
    window.location.href = "cart.html";
  });
}

function addProductToBasket(products) {
  let cart = JSON.parse(localStorage.getItem("basket"));

  console.log(cart);
  if (cart !== null) {
    for (let index = 0; index < cart.length; index++) {
      console.log(cart[index]);
      if (cart[index].color === formValue.value && cart[index].id === end_url) {
        cart[index].quantity += Number(quantity.value);
        return getStorage(cart);
      } else if (
        cart[index].id === end_url &&
        cart[index].color !== formValue.value
      ) {
        cart.push(products);
        return getStorage(cart);
      }
      if (cart[index].color !== formValue.value && cart[index].id !== end_url) {
        cart.push(products);
        return getStorage(cart);
      }
    }
  } else {
    cart = [];
    cart.push(products);
    getStorage(cart);
  }
}

function getStorage(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
