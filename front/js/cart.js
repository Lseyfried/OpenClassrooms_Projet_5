const fetchbasket = fetch(localStorage.getItem("basket"));

console.log(fetchbasket);

// document.getElementById(
//   "cart__items"
// ).innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
//     <div class="cart__item__img">
//       <img src="${element.image}" alt="${element.alt}">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__description">
//         <h2>${element.name}</h2>
//         <p>${element.color}</p>
//         <p>${element.price} €</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté : </p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem">Supprimer</p>
//         </div>
//       </div>
//     </div>
//   </article>`;

//   console.log(localStorage);

// recoverProducts();
