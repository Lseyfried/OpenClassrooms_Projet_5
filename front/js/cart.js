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

  let local = JSON.parse(localStorage.getItem("produit"));
  for (const element of local) {
    document.getElementById(
      "cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${element.idValue}" data-color="${element.colorValue}">
    <div class="cart__item__img">
      <img src="${element.imageValue}" alt="${element.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${element.nameChoice}</h2>
        <p>${element.colorValue}</p>
        <p>${element.priceChoice} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantityValue}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  }
  //   console.log(localStorage);
}
recoverProducts();
