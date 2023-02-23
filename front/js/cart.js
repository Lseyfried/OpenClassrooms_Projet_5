let basket = JSON.parse(localStorage.getItem("basket")) || [];
//Tableau récupérant les produits du panier avant promiseall
const promises = [];
//Prix total des produits
let quantities = [];
//Quantité total des produits
let quantityTotal = [];

getPromiseAll();
regexVerification();
recoverForm();

//Renvoie les produits sélectionnés dans le panier
async function getPromiseAll() {
  for (let index = 0; index < basket.length; index++) {
    promises.push(
      await fetch(`http://localhost:3000/api/products/${basket[index].id}`, {
        method: "GET",
      }).then((res) => res.json())
    );
  }
  Promise.all(promises)
    .then((product) => {
      console.log(product);
      displayProducts(product);
      changeQuantity(product, quantities);
      deleteProducts(product);
      totalQuantity();
      total(product, quantities);
    })

    .catch((err) => {
      console.log(err);
    });
}

//affiche les produits sélectionnés
function displayProducts(productElt) {
  let cartElt = document.getElementById("cart__items");
  for (let index = 0; index < productElt.length; index++) {
    cartElt.innerHTML += `<article class="cart__item" data-id="${productElt[index]._id}" data-color="${basket[index].color}">
          <div class="cart__item__img">
            <img src="${productElt[index].imageUrl}" alt="${productElt[index].altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${productElt[index].name}</h2>
              <p>${basket[index].color}</p>
              <p>${productElt[index].price}€</p>
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
// change la quantité
function changeQuantity(productElt, quantities) {
  let changeButton = document.querySelectorAll(".itemQuantity");
  for (let index = 0; index < changeButton.length; index++) {
    changeButton[index].addEventListener("change", (e) => {
      const closestElement = changeButton[index].closest("article");
      for (let i = 0; i < basket.length; i++) {
        if (
          basket[i].id === closestElement.dataset["id"] &&
          basket[i].color === closestElement.dataset["color"]
        ) {
          basket[i].quantity = Number(e.currentTarget.value);
          localStorage.setItem("basket", JSON.stringify(basket));
          let quantityChange =
            Number(e.currentTarget.value) * productElt[index].price;
          quantities.splice(i, 1, quantityChange);
        }
      }
      totalQuantity();
      total(productElt, quantities);
    });
  }
}

// Effacer un produit
function deleteProducts(productElt) {
  let itemsQuantity = document.getElementById("totalQuantity");
  let priceElt = document.getElementById("totalPrice");
  let deletedButton = document.querySelectorAll(".deleteItem");
  for (let index = 0; index < deletedButton.length; index++) {
    deletedButton[index].addEventListener("click", () => {
      const closestDeleted = deletedButton[index].closest("article");
      closestDeleted.remove();
      let foundIndex = basket.findIndex((item) => {
        return (
          item.id === closestDeleted.dataset["id"] &&
          item.color === closestDeleted.dataset["color"]
        );
      });
      if (foundIndex !== -1) {
        basket.splice(foundIndex, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        quantities.splice(foundIndex, 1);
        if (basket.length === 0) {
          priceElt.innerHTML = 0;
          itemsQuantity.innerHTML = 0;
        }
        totalQuantity(basket);
        total(productElt, quantities);
      }
    });
  }
}

// //total  prix
function total(productElt, quantities) {
  let price = [];
  let priceElt = document.getElementById("totalPrice");
  let changeButton = document.querySelectorAll(".itemQuantity");

  if (quantities.length === 0) {
    for (let index = 0; index < changeButton.length; index++) {
      quantities.push(changeButton[index].value * productElt[index].price);
    }
  }
  price = quantities.reduce((a, b) => {
    return +a + +b;
  });

  priceElt.innerHTML = price;
}

// total articles
function totalQuantity() {
  let itemsQuantity = document.getElementById("totalQuantity");
  quantityTotal = basket.reduce((previousValue, currentValue) => {
    return {
      quantity: previousValue.quantity + currentValue.quantity,
    };
  });

  itemsQuantity.innerHTML = quantityTotal.quantity;
}

//reGex
function regexVerification() {
  let form = document.querySelector(".cart__order__form");
  form.email.addEventListener("change", () => {
    let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let testEmail = emailRegExp.test(form.email.value);
    let emailMsg = document.getElementById("emailErrorMsg");
    console.log(testEmail);
    if (testEmail) {
      emailMsg.innerHTML = "Adresse Valide";
    } else {
      emailMsg.innerHTML = "Adresse Non Valide";
    }
  });
  form.firstName.addEventListener("change", () => {
    let firstNameRegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let testFirstName = firstNameRegExp.test(form.firstName.value);
    let firstNameMsg = document.getElementById("firstNameErrorMsg");
    console.log(testFirstName);
    if (testFirstName) {
      firstNameMsg.innerHTML = "Prénom Valide";
    } else {
      firstNameMsg.innerHTML = "Prénom Non Valide";
    }
  });
  form.lastName.addEventListener("change", () => {
    let lastNameRegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let testLastName = lastNameRegExp.test(form.lastName.value);
    let lastNameMsg = document.getElementById("lastNameErrorMsg");
    console.log(testLastName);
    if (testLastName) {
      lastNameMsg.innerHTML = "Nom Valide";
    } else {
      lastNameMsg.innerHTML = "Nom Non Valide";
    }
  });
  form.address.addEventListener("change", () => {
    let addressRegExp = /^[a-zA-Z0-9\s,'-]*$/;
    let testaddress = addressRegExp.test(form.address.value);
    let addressMsg = document.getElementById("addressErrorMsg");
    console.log(testaddress);
    if (testaddress) {
      addressMsg.innerHTML = "Adresse Valide";
    } else {
      addressMsg.innerHTML = "Adresse Non Valide";
    }
  });
  form.city.addEventListener("change", () => {
    let cityRegExp = /^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/;
    let testcity = cityRegExp.test(form.city.value);
    let cityMsg = document.getElementById("cityErrorMsg");
    console.log(testcity);
    if (testcity) {
      cityMsg.innerHTML = "Ville Valide";
    } else {
      cityMsg.innerHTML = "Ville Non Valide";
    }
  });
}

//Récupérer les variables avant envoie de l'API
function recoverForm() {
  let cityMsg = document.getElementById("cityErrorMsg");
  let addressMsg = document.getElementById("addressErrorMsg");
  let lastNameMsg = document.getElementById("lastNameErrorMsg");
  let firstNameMsg = document.getElementById("firstNameErrorMsg");
  let form = document.querySelector(".cart__order__form");
  const productId = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let index = 0; index < basket.length; index++) {
      for (let i = 0; i < basket[index].quantity; i++) {
        productId.push(basket[index].id);
      }
    }
    console.log(productId);
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
    if (
      cityMsg.innerHTML === "Ville Non Valide" ||
      addressMsg.innerHTML === "Adresse Non Valide" ||
      lastNameMsg.innerHTML === "Nom Non Valide" ||
      firstNameMsg.innerHTML === "Prénom Non Valide"
    ) {
      alert("Veuillez entrer des valeurs valides dans le formulaire");
    } else if (formToPost.products.length === 0) {
      alert("Veuillez sélectionner des produits");
    } else {
      sendFormToApi(formToPost);
    }
  });
}

//Envoie de la commande à l'API
function sendFormToApi(productToSend) {
  fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productToSend),
  })
    .then((response) => response.json())
    .then((dataPost) => {
      const orderId = dataPost.orderId;
      window.location.href = `confirmation.html?orderId=${orderId}`;
    })
    .catch((error) => console.log(error));
}
