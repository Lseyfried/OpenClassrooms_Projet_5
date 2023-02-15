let basket = JSON.parse(localStorage.getItem("basket"));
let priceTotal = document.getElementById("totalPrice");
const products = [];
const promises = [];
const productId = [];
let promisesPrice = [];
let quantityPrice = [];
let sumQuantity = [];

async function getPromiseAll() {
  for (let index = 0; index < basket.length; index++) {
    promises.push(
      await fetch(`http://localhost:3000/api/products/${basket[index].id}`, {
        method: "GET",
      }).then((res) => res.json())
    );
  }
  return Promise.all(promises).then((product) => {
    let cart = document.getElementById("cart__items");
    displayProducts();

    //affiche les produits sélectionnés
    function displayProducts() {
      for (let index = 0; index < product.length; index++) {
        cart.innerHTML += `<article class="cart__item" data-id="${product[index]._id}" data-color="${basket[index].color}">
              <div class="cart__item__img">
                <img src="${product[index].imageUrl}" alt="${product[index].alTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${product[index].name}</h2>
                  <p>${basket[index].color}</p>
                  <p>${product[index].price}€</p>
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
    }

    changeQuantity();
    deleteProducts();
    totalQuantity();
    total();
  });

  // .catch((err) => {
  //   console.log(err);
  // });
}

getPromiseAll();
emailRegex();
firstNameRegex();
lastNameRegex();
addressRegex();
cityRegex();
recoverForm();
// recoverObjectProducts();

// change quantity
function changeQuantity() {
  let itemsQuantity = document.getElementById("totalQuantity");
  let changeButton = document.querySelectorAll(".itemQuantity");
  for (let index = 0; index < changeButton.length; index++) {
    changeButton[index].addEventListener("change", (e) => {
      // console.log(quantityPrice);
      //plusieurs fonctions à mettre
      const closestElement = changeButton[index].closest("article");
      console.log(basket[index].id);
      if (
        closestElement.dataset["id"] === basket[index].id &&
        closestElement.dataset["color"] === basket[index].color
      ) {
        basket[index].quantity = Number(e.currentTarget.value);
        localStorage.setItem("basket", JSON.stringify(basket));
        quantityPrice[index] =
          Number(e.currentTarget.value) * promises[index].price; //changer promises. Différent
      }
      totalQuantity();
      total();
    });
  }
}
// delete a product
function deleteProducts() {
  let itemsQuantity = document.getElementById("totalQuantity");
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
        basket = basket.filter((product) => Object.keys(product).length !== 0);
        localStorage.setItem("basket", JSON.stringify(basket));
        quantityPrice.splice([index], 1);
      }
      totalQuantity();
      total();
    });
  }
}
// //total  prix
function total() {
  let price = [];
  let changeButton = document.querySelectorAll(".itemQuantity");
  if (quantityPrice.length === 0) {
    for (let index = 0; index < changeButton.length; index++) {
      quantityPrice.push(changeButton[index].value * promises[index].price);
    }
  }
  price = quantityPrice.reduce((a, b) => {
    return +a + +b;
  });

  priceTotal.innerHTML = price;
  console.log(quantityPrice);
}

// total articles
function totalQuantity() {
  let itemsQuantity = document.getElementById("totalQuantity");

  sumQuantity = basket.reduce((previousValue, currentValue) => {
    return {
      quantity: previousValue.quantity + currentValue.quantity,
    };
  });
  itemsQuantity.innerHTML = sumQuantity.quantity; //revoir
}

//reGex emil
function emailRegex() {
  let form = document.querySelector(".cart__order__form");
  form.email.addEventListener("change", () => {
    let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let testEmail = emailRegExp.test(form.email.value);
    let addresmsg = document.getElementById("emailErrorMsg");
    if (testEmail) {
      addresmsg.innerHTML = "Adresse Valide";
    } else {
      addresmsg.innerHTML = "Adresse Non Valide";
    }
  });
}
//reGex firstname
function firstNameRegex() {
  let form = document.querySelector(".cart__order__form");
  form.firstName.addEventListener("change", () => {
    let firstNameRegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let testFirstName = firstNameRegExp.test(form.firstName.value);

    let firstNameMsg = document.getElementById("firstNameErrorMsg");
    if (testFirstName) {
      firstNameMsg.innerHTML = "Prénom Valide";
    } else {
      firstNameMsg.innerHTML = "Prénom Non Valide";
    }
  });
}
//reGex Lastname
function lastNameRegex() {
  let form = document.querySelector(".cart__order__form");
  form.lastName.addEventListener("change", () => {
    let lastNameRegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let testLastName = lastNameRegExp.test(form.lastName.value);
    let firstNameMsg = document.getElementById("lastNameErrorMsg");
    if (testLastName) {
      firstNameMsg.innerHTML = "Nom Valide";
    } else {
      firstNameMsg.innerHTML = "Nom Non Valide";
    }
  });
}

//reGex Adress
function addressRegex() {
  let form = document.querySelector(".cart__order__form");
  form.address.addEventListener("change", () => {
    let addressRegExp = /^[a-zA-Z0-9\s,'-]*$/;
    let testaddress = addressRegExp.test(form.address.value);
    let addressMsg = document.getElementById("addressErrorMsg");
    if (testaddress) {
      addressMsg.innerHTML = "Adresse Valide";
    } else {
      addressMsg.innerHTML = "Adresse Non Valide";
    }
  });
}
//reGex city
function cityRegex() {
  let form = document.querySelector(".cart__order__form");
  form.city.addEventListener("change", () => {
    let cityRegExp = /^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/;
    let testcity = cityRegExp.test(form.city.value);
    console.log(testcity);
    let cityMsg = document.getElementById("cityErrorMsg");
    if (testcity) {
      cityMsg.innerHTML = "Ville Valide";
    } else {
      cityMsg.innerHTML = "Ville Non Valide";
    }
  });
}
function recoverForm() {
  let form = document.querySelector(".cart__order__form");
  const productId = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // let form = document.querySelector(".cart__order__form");
    for (let index = 0; index < basket.length; index++) {
      for (let i = 0; i < basket[index].quantity; i++) {
        productId.push(basket[index].id);
      }
    }

    // console.log(productId);
    const formToPost = {
      contact: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
      },
      products: productId,
    };
    console.log(basket);
    sendFormToApi();
    async function sendFormToApi() {
      await fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formToPost),
      })
        .then((response) => response.json())
        .then((dataPost) => {
          console.log(dataPost);
          const orderId = dataPost.orderId;
          window.location.href = `confirmation.html?orderId=${orderId}`;
        })
        .catch((error) => console.log(error));
    }
  });
}
