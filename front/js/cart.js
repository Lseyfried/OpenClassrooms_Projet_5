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
  let id = localStorage.getItem("id");
  console.log(id);
  let colorCart = localStorage.getItem("color");
  console.log(colorCart);
  let quantityCart = localStorage.getItem("quantity");
  console.log(quantityCart);
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${id}" data-color="${colorCart}">
  <div class="cart__item__img">
    <img src="" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>Nom du produit</h2>
      <p>Vert</p>
      <p>42,00 €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
}
recoverProducts();
