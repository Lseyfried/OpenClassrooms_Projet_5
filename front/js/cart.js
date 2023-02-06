let priceArray = [];
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
      let dataID = await basketId.json(); //avec des promises dans une boucle mettre dans des fonctions (>20 lignes)
      Promise.all([basketColor, basketQuantity, dataID]).then((values) => {
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
        // change la quantité
        let changeButton = document.querySelectorAll(".itemQuantity");
        console.log(changeButton); // afficher plusieurs fois à modifier
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
              // window.location.reload(); rechargement au dom et LS sans recharger la page
            }
          });
        }
        //supprimer un article
        let deletedButton = document.querySelectorAll(".deleteItem"); // même remarque qu'avant
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
              // window.location.reload();
            }
          });
        }
        //total  prix
        let priceTotal = document.getElementById("totalPrice");
        priceArray.push(dataID);

        let sumPrice = priceArray.reduce((previousValue, currentValue) => {
          return {
            price: previousValue.price + currentValue.price,
          };
        });

        // const priceArray = Object.entries(dataID);
        // let priceArray = [];
        // let newPriceArray = [];

        // priceArray.push(dataID);
        // console.log(priceArray);

        // const priceArray = [];
        // priceArray.unshift(dataID.price);
        // console.log(priceArray);

        // for (let index = 0; index < array.length; index++) {
        //   idArray.push(dataID.price);
        // }
        // let sumPrice = 0;
        // sumPrice = propretyValuesPrice.reduce((previousValue, currentValue) => {
        //   return {
        //     price: previousValue.price + currentValue.price,
        //   };
        // });

        // let val = idArray.reduce((previousValue, currentValue) => {
        //   return {
        //     price: previousValue.price + currentValue.price,
        //   };
        // });
        // console.log(val);
        // const onlyNumbers = idArray.filter(
        //   (element) => typeof element === "number"
        // );

        // console.log(arrayID);
        // });
        // const idArray = Object.values(arrayID);
        // // console.log(idArray);

        // console.log(onlyNumbers);
        // // const obj = Object.assign({}, onlyNumbers);
        // let val2 = onlyNumbers.reduce(function (previousValue, currentValue) {
        //   return {
        //     price: previousValue.price + currentValue.price,
        //   };
        // });
        // console.log(val2);

        //total d'articles
        let itemsQuantity = document.getElementById("totalQuantity"); //fonction
        let sumQuantity = basket.reduce((previousValue, currentValue) => {
          return {
            quantity: previousValue.quantity + currentValue.quantity,
          };
        });
        itemsQuantity.innerHTML = sumQuantity.quantity;
      });
    }
  }
}

//regex
setTimeout(function () {
  // enlever settimeout
  let form = document.querySelector(".cart__order__form");
  console.log(form.email);

  form.email.addEventListener("change", () => {
    validEmail(this);
  });

  const validEmail = (inputEmail) => {
    //Creation de la regexp pour la validation email
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$",
      "g"
    );

    let testEmail = emailRegExp.test(inputEmail.value);
    console.log(testEmail);
    // let addresmsg = document.getElementById("emailErrorMsg");
    // if (testEmail) {
    //   addresmsg.innerHTML = "Adresse Valide";
    // } else {
    //   addresmsg.innerHTML = "Adresse Non Valide";
    // }
  };
}, 500);
// function additionQuantity(...nombres) {
//   let resultat = 0;
//   nombres.forEach((nombre) => {
//     resultat += nombre;
//     console.log(resultat);
//   });
// }
