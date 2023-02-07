let basket = JSON.parse(localStorage.getItem("basket"));
let totalPrice = [];
const promises = [];
let promisesPrice = [];
let quantityValue = [];
async function getPromiseAll() {
  // const promises = [];
  for (let index = 0; index < basket.length; index++) {
    promises.push(
      await fetch(`http://localhost:3000/api/products/${basket[index].id}`, {
        method: "GET",
      }).then((res) => res.json())
    );
    // color.push(basket[index].color);
    // quantity.push(basket[index].quantity);
  }
  return Promise.all(promises).then((data) => {
    for (let index = 0; index < data.length; index++) {
      let cart = document.getElementById("cart__items");
      cart.innerHTML += `<article class="cart__item" data-id="${data[index]._id}" data-color="${basket[index].color}">
              <div class="cart__item__img">
                <img src="${data[index].imageUrl}" alt="${data[index].alTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${data[index].name}</h2>
                  <p>${basket[index].color}</p>
                  <p>${data[index].price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[index].quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`;
    }
    changeQuantity();
    deleteProducts();
    totalQuantity();
    total();
    // emailRegex();
  });

  // .catch((err) => {
  //   console.log(err);
  // });
}
getPromiseAll();

// change quantity
function changeQuantity() {
  let itemsQuantity = document.getElementById("totalQuantity");
  let changeButton = document.querySelectorAll(".itemQuantity");
  let priceTotal = document.getElementById("totalPrice");

  for (let index = 0; index < changeButton.length; index++) {
    basket = JSON.parse(localStorage.getItem("basket"));
    changeButton[index].addEventListener("change", (e) => {
      // console.log(quantityValue);

      const closestElement = changeButton[index].closest("article");
      if (
        closestElement.dataset["id"] === basket[index].id &&
        closestElement.dataset["color"] === basket[index].color
      ) {
        basket[index].quantity = Number(e.currentTarget.value);
        localStorage.setItem("basket", JSON.stringify(basket));
        quantityValue[index] =
          Number(e.currentTarget.value) * promises[index].price;
      }
      let sumQuantity = basket.reduce((previousValue, currentValue) => {
        return {
          quantity: previousValue.quantity + currentValue.quantity,
        };
      });
      let price = quantityValue.reduce((a, b) => {
        return +a + +b;
      });
      itemsQuantity.innerHTML = sumQuantity.quantity;
      priceTotal.innerHTML = price;
    });
  }
}
// delete a product
function deleteProducts() {
  let itemsQuantity = document.getElementById("totalQuantity");
  let deletedButton = document.querySelectorAll(".deleteItem");
  let priceTotal = document.getElementById("totalPrice");
  let changeButton = document.querySelectorAll(".itemQuantity");
  for (let index = 0; index < deletedButton.length; index++) {
    deletedButton[index].addEventListener("click", (e) => {
      // console.log(price);
      const closestDeleted = deletedButton[index].closest("article");
      closestDeleted.remove();
      if (
        closestDeleted.dataset["id"] === basket[index].id &&
        closestDeleted.dataset["color"] === basket[index].color
      ) {
        delete basket[index];
        basket = basket.filter((value) => Object.keys(value).length !== 0);
        localStorage.setItem("basket", JSON.stringify(basket));
        delete quantityValue[index];
        // quantityValue.filter((value) => {
        //   Object.keys(value).length !== 0;
        // });
        // console.log(quantityValue);
      }
      quantityValue.reduce((a, b) => {
        return +a + +b;
      });
      // let firstPrice = changeButton[index].value * promises[index].price;

      // console.log(quantityValue);
      // quantityValue = quantityValue.filter(
      //   (value) => Object.keys(value).length !== 0
      // );
      // quantityValue.push(changeButton[index].value * promises[index].price);
      console.log(quantityValue);
      let price = quantityValue.reduce((a, b) => {
        return +a + +b;
      });
      basket = JSON.parse(localStorage.getItem("basket"));
      let sumQuantity = basket.reduce((previousValue, currentValue) => {
        return {
          quantity: previousValue.quantity + currentValue.quantity,
        };
      });

      itemsQuantity.innerHTML = sumQuantity.quantity;
      priceTotal.innerHTML = price;
    });
  }
}
// //total  prix
function total() {
  let priceTotal = document.getElementById("totalPrice");
  let changeButton = document.querySelectorAll(".itemQuantity");
  for (let index = 0; index < changeButton.length; index++) {
    quantityValue.push(changeButton[index].value * promises[index].price);
  }

  let price = quantityValue.reduce((a, b) => {
    return +a + +b;
  });

  priceTotal.innerHTML = price;
}

// total d'articles
function totalQuantity() {
  let itemsQuantity = document.getElementById("totalQuantity"); //fonction
  basket = JSON.parse(localStorage.getItem("basket"));
  for (let index = 0; index < basket.length; index++) {
    let sumQuantity = basket.reduce((previousValue, currentValue) => {
      return {
        quantity: previousValue.quantity + currentValue.quantity,
      };
    });
    itemsQuantity.innerHTML = sumQuantity.quantity;
  }
}
//regex
// setTimeout(function () {
//   // enlever settimeout
// function emailRegex() {
//   let form = document.querySelector(".cart__order__form");
//   console.log(form.email);

//   form.email.addEventListener("change", () => {
//     validEmail(this);
//   });

//   const validEmail = (inputEmail) => {
//     //Creation de la regexp pour la validation email
//     let emailRegExp = new RegExp(
//       "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$",
//       "g"
//     );

//     let testEmail = emailRegExp.test(inputEmail.value);
//     console.log(testEmail);
//     let addresmsg = document.getElementById("emailErrorMsg");
//     if (testEmail) {
//       addresmsg.innerHTML = "Adresse Valide";
//     } else {
//       addresmsg.innerHTML = "Adresse Non Valide";
//     }
//   };
//   //   };
// }, 500);
// function additionQuantity(...nombres) {
//   let resultat = 0;
//   nombres.forEach((nombre) => {
//     resultat += nombre;
//     console.log(resultat);
//   });
// }
