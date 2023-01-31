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
        let deletedButton = document.querySelector(".itemQuantity");
        deletedButton.addEventListener("change", (e) => {
          if (e.currentTarget.value) {
            let basketBis = JSON.parse(localStorage.getItem("basket"));
            if (basketBis !== null) {
              basketBis.push(Number(e.currentTarget.value));
              console.log(basketBis);
            }
          }
        });
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
