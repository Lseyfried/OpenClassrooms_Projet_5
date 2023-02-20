let basket = JSON.parse(localStorage.getItem("basket"));
//Tableau des ids avant envoie de la requête POST
const products = [];
//Tableau récupérant les produits du panier avant promiseall
const promises = [];
//Tableau récupérant les produits après clique du bouton "Commander"
const productId = [];
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
      displayProducts(product);
      changeQuantity();
      deleteProducts();
      totalQuantity();
      total();
    })

    .catch((err) => {
      console.log(err);
    });
}

//affiche les produits sélectionnés
function displayProducts(productElt) {
  let cartElt = document.getElementById("cart__items");
  console.log(productElt);
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

// change quantity
function changeQuantity() {
  console.log(basket);
  // let itemsQuantity = document.getElementById("totalQuantity");
  //passer en argument les prix récupérés depuis l'API
  let changeButton = document.querySelectorAll(".itemQuantity");
  for (let index = 0; index < changeButton.length; index++) {
    changeButton[index].addEventListener("change", (e) => {
      // console.log(quantityPrice);
      //plusieurs fonctions à mettre
      const closestElement = changeButton[index].closest("article");
      let foundItem = basket.find((item) => {
        return (
          item.id === closestElement.dataset["id"] &&
          item.color === closestElement.dataset["color"]
        );
      });
      if (foundItem) {
        foundItem.quantity = Number(e.currentTarget.value);
        localStorage.setItem("basket", JSON.stringify(basket));
        quantities[index] = Number(e.currentTarget.value) * foundItem.price;
      }
      totalQuantity();
      total();
    });
  }
}

// Effacer un produit
function deleteProducts() {
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
        totalQuantity();
        total();
      }
    });
  }
}
// //total  prix
function total() {
  let price = [];
  let priceElt = document.getElementById("totalPrice");
  let changeButton = document.querySelectorAll(".itemQuantity");
  if (quantities.length === 0) {
    for (let index = 0; index < changeButton.length; index++) {
      quantities.push(changeButton[index].value * promises[index].price);
    }
  }
  basket.forEach((item) => {
    let foundItem = promises.find((product) => {
      return product._id === item.id;
    });
    if (foundItem) {
      price.push(foundItem.price * item.quantity);
    }
  });

  price = price.reduce((a, b) => {
    return +a + +b;
  });

  priceElt.innerHTML = price;
}
// total articles
function totalQuantity() {
  // let basket = JSON.parse(localStorage.getItem("basket"));
  let itemsQuantity = document.getElementById("totalQuantity");

  quantityTotal = basket.reduce((previousValue, currentValue) => {
    return {
      quantity: previousValue.quantity + currentValue.quantity,
    };
  });
  itemsQuantity.innerHTML = quantityTotal.quantity; //revoir
}

//reGex
function regexVerification() {
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

//Récupérer les variables avant envoie de l'API
function recoverForm() {
  let form = document.querySelector(".cart__order__form");
  const productId = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let index = 0; index < basket.length; index++) {
      for (let i = 0; i < basket[index].quantity; i++) {
        productId.push(basket[index].id);
      }
    }
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
    // console.log(basket);
    sendFormToApi(formToPost);
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
      // console.log(dataPost);
      const orderId = dataPost.orderId;
      window.location.href = `confirmation.html?orderId=${orderId}`;
    })
    .catch((error) => console.log(error));
}
