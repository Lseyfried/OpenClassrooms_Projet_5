async function recoverProducts() {
  const requete = await fetch("http://localhost:3000/api/products", {
    method: "GET",
  });
  if (!requete.ok) {
    alert("Un Problème est survenu.");
  } else {
    let data = await requete.json();
    console.log(data);
  }
  id = localStorage.getItem("id");
  console.log(id);
  color = localStorage.getItem("colorChoice");
  console.log(color);
  quantity = localStorage.getItem("quantityChoice");
  console.log(quantity);
  let name = localStorage.getItem("name");
  image = localStorage.getItem("image");
  let alt = localStorage.getItem("alt");
  let priceChoice = localStorage.getItem("price");
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
  <div class="cart__item__img">
    <img src="${image}" alt="${alt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${name}</h2>
      <p>${color}</p>
      <p> ${priceChoice}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
}
recoverProducts();
