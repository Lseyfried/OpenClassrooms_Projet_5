const basket = JSON.parse(localStorage.getItem("basket"));
for (let index = 0; index < basket.length; index++) {
  const basketColor = basket[index].color;
  const basketQuantity = basket[index].quantity;
  recoverId();
  async function recoverId() {
    const basketId = await fetch(
      `http://localhost:3000/api/products/${basket[index].id}`,
      {
        method: "GET",
      }
    );
    if (!basketId.ok) {
      alert("Un problème est survenu");
    } else {
      let arrayID = await basketId.json();
      Promise.all([basketColor, basketQuantity, arrayID]).then((values) => {
        // console.log(basket[index].quantity);
        let cart = document.getElementById("cart__items");
        cart.innerHTML += `<article class="cart__item" data-id="${values[2]._id}" data-color="${values[0]}">
          <div class="cart__item__img">
            <img src="${values[2].imageUrl}" alt="${values[2].altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${values[2].name}t</h2>
              <p>${values[0]}</p>
              <p>${values[2].price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${values[1]}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
        // Array.from(values[1]).map((option) => option.value);
        // console.log(values[1]);
        //faire totaux. mettre dans un tableau ?
        let changeButton = document.querySelectorAll(".itemQuantity");
        for (let index = 0; index < changeButton.length; index++) {
          changeButton[index].addEventListener("change", (e) => {
            const closestElement = changeButton[index].closest("article");
            if (
              closestElement.dataset["id"] === basket[index].id &&
              closestElement.dataset["color"] === basket[index].color
            ) {
              basket[index].quantity = Number(e.currentTarget.value);
              // console.log(basket);
              localStorage.setItem("basket", JSON.stringify(basket));
            }
          });
        }
        let deletedButton = document.querySelectorAll(".deleteItem");
        for (let index = 0; index < deletedButton.length; index++) {
          deletedButton[index].addEventListener("click", (e) => {
            const closestDeleted = deletedButton[index].closest("article");
            closestDeleted.remove();
            if (
              closestDeleted.dataset["id"] === basket[index].id &&
              closestDeleted.dataset["color"] === basket[index].color
            ) {
              delete basket[index];
              let basketReforme = basket.filter(
                (value) => Object.keys(value).length !== 0
              );
              localStorage.setItem("basket", JSON.stringify(basketReforme));
              window.location.reload();
            }
          });
        }
      });
    }
  }
}
// function additionQuantity(...nombres) {
//   let resultat = 0;
//   nombres.forEach((nombre) => {
//     resultat += nombre;
//     console.log(resultat);
//   });
// }
