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
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
  <div class="cart__item__img">
    <img src="" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>Nom du produit</h2>
      <p>${color}</p>
      <p> €</p>
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
