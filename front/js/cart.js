let basket = JSON.parse(localStorage.getItem("basket"));
let totalPrice = [];
const promises = [];
let promisesPrice = [];
let quantityPrice = [];
async function getPromiseAll() {
  // const promises = [];
  for (let index = 0; index < basket.length; index++) {
    promises.push(
      await fetch(`http://localhost:3000/api/products/${basket[index].id}`, {
        method: "GET",
      }).then((res) => res.json())
    );
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
// change quantity
function changeQuantity() {
  let itemsQuantity = document.getElementById("totalQuantity");
  let changeButton = document.querySelectorAll(".itemQuantity");
  let priceTotal = document.getElementById("totalPrice");

  for (let index = 0; index < changeButton.length; index++) {
    basket = JSON.parse(localStorage.getItem("basket"));
    changeButton[index].addEventListener("change", (e) => {
      // console.log(quantityPrice);

      const closestElement = changeButton[index].closest("article");
      if (
        closestElement.dataset["id"] === basket[index].id &&
        closestElement.dataset["color"] === basket[index].color
      ) {
        basket[index].quantity = Number(e.currentTarget.value);
        localStorage.setItem("basket", JSON.stringify(basket));
        quantityPrice[index] =
          Number(e.currentTarget.value) * promises[index].price;
      }
      let sumQuantity = basket.reduce((previousValue, currentValue) => {
        return {
          quantity: previousValue.quantity + currentValue.quantity,
        };
      });
      let price = quantityPrice.reduce((a, b) => {
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
        delete quantityPrice[index];
      }
      quantityPrice.reduce((a, b) => {
        return +a + +b;
      });
      console.log(quantityPrice);
      let price = quantityPrice.reduce((a, b) => {
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
    quantityPrice.push(changeButton[index].value * promises[index].price);
  }

  let price = quantityPrice.reduce((a, b) => {
    return +a + +b;
  });

  priceTotal.innerHTML = price;
}

// total d'articles
function totalQuantity() {
  let itemsQuantity = document.getElementById("totalQuantity");
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

//reGex emil
function emailRegex() {
  let form = document.querySelector(".cart__order__form");
  console.log(form.email);

  form.email.addEventListener("change", () => {
    validEmail(form.email.value);
    // console.log(form.email.value);
  });

  const validEmail = (inputEmail) => {
    let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let testEmail = emailRegExp.test(inputEmail);
    // console.log(testEmail);
    // console.log(inputEmail.value);
    let addresmsg = document.getElementById("emailErrorMsg");
    if (testEmail) {
      addresmsg.innerHTML = "Adresse Valide";
    } else {
      addresmsg.innerHTML = "Adresse Non Valide";
    }
  };
}

//reGex firstname
function firstNameRegex() {
  let form = document.querySelector(".cart__order__form");
  console.log(form.firstname);

  form.firstName.addEventListener("change", () => {
    validFirstName(form.firstName.value);
    // console.log(form.email.value);
  });

  const validFirstName = (inputFirstname) => {
    let firstNameRegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let testFirstName = firstNameRegExp.test(inputFirstname);
    // console.log(testEmail);
    // console.log(inputEmail.value);
    let firstNameMsg = document.getElementById("firstNameErrorMsg");
    if (testFirstName) {
      firstNameMsg.innerHTML = "Prénom Valide";
    } else {
      firstNameMsg.innerHTML = "Prénom Non Valide";
    }
  };
}
//reGex Lastname
function lastNameRegex() {
  let form = document.querySelector(".cart__order__form");
  console.log(form.lastName);

  form.lastName.addEventListener("change", () => {
    validLastName(form.lastName.value);
    // console.log(form.email.value);
  });

  const validLastName = (inputLastName) => {
    let lastNameRegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let testLastName = lastNameRegExp.test(inputLastName);
    console.log(testLastName);
    // console.log(inputEmail.value);
    let firstNameMsg = document.getElementById("lastNameErrorMsg");
    if (testLastName) {
      firstNameMsg.innerHTML = "Nom Valide";
    } else {
      firstNameMsg.innerHTML = "Nom Non Valide";
    }
  };
}

//reGex Adress
function addressRegex() {
  let form = document.querySelector(".cart__order__form");
  console.log(form.address);

  form.address.addEventListener("change", () => {
    validaddress(form.address.value);
    // console.log(form.email.value);
  });

  const validaddress = (inputaddress) => {
    let addressRegExp = /^[a-zA-Z0-9\s,'-]*$/;
    let testaddress = addressRegExp.test(inputaddress);
    console.log(testaddress);
    // console.log(inputEmail.value);
    let addressMsg = document.getElementById("addressErrorMsg");
    if (testaddress) {
      addressMsg.innerHTML = "Adresse Valide";
    } else {
      addressMsg.innerHTML = "Adresse Non Valide";
    }
  };
}
//reGex city
function cityRegex() {
  let form = document.querySelector(".cart__order__form");
  console.log(form.city);

  form.city.addEventListener("change", () => {
    validcity(form.city.value);
    // console.log(form.email.value);
  });

  const validcity = (inputcity) => {
    let cityRegExp = /^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/;
    let testcity = cityRegExp.test(inputcity);
    console.log(testcity);
    // console.log(inputEmail.value);
    let cityMsg = document.getElementById("cityErrorMsg");
    if (testcity) {
      cityMsg.innerHTML = "Ville Valide";
    } else {
      cityMsg.innerHTML = "Ville Non Valide";
    }
  };
}
