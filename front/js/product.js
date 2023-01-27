// recupere id de la page
let end_url = new URLSearchParams(window.location.search).get("id");
//déclarer variables locales
let color;
let colorSelected;
let id;
let quantityValue;
let colorValue;
let imageValue;
let priceChoice;
let nameChoice;
let alt;
let btn;
let bascket = [];

let foundProduct;
let iterator;
//recuperer l'API
async function recoverProducts() {
  const requete = await fetch("http://localhost:3000/api/products", {
    method: "GET",
  });
  if (!requete.ok) {
    alert("Un Problème est survenu.");
  } else {
    let data = await requete.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (end_url == data[i]._id) {
        //charge l'image de la page
        let image = (document.getElementsByClassName(
          "item__img"
        )[0].innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}">`);
        // charge le nom et le prix de la page
        let name = (document.getElementById("title").innerHTML = data[i].name);
        let price = (document.getElementById("price").innerHTML =
          data[i].price);
        document.getElementById("description").innerHTML = data[i].description;
        //charge les options couleurs de la page
        let formValue = document.getElementById("colors");
        for (const colorSelected of data[i].colors) {
          //renvoie toutes les couleurs du tableau colors
          color =
            formValue.innerHTML += `<option value=${colorSelected}>${colorSelected}</option>`;
        }

        let quantity = document.getElementById("quantity");

        function addBascket(array, products) {
          const b = JSON.parse(localStorage.getItem("produit"));
          if (localStorage.length > 0 && array.length > 0) {
            for (let x = 0; x < b.length; x++) {
              for (let index = 0; index < array.length; index++) {
                if (
                  b[x].name === name &&
                  b[x].color === formValue.value &&
                  b[x].id === end_url
                ) {
                  b[x].quantity += Number(quantity.value);
                  array[index].quantity += Number(quantity.value);
                  return getStorage(bascket);
                }
                if (b[x].name === name && b[x].color !== formValue.value) {
                  b[x].quantity += Number(quantity.value);
                  array.push(products);
                  return getStorage(bascket) + 1;
                  // } else if (b[x].id !== id) {
                  //   array.push(products);
                  //   return getStorage(bascket);
                  // }
                }
              }
            }
          } else if (localStorage.length > 0 || !array) {
            for (let a = 0; a < b.length; a++) {
              if (b[a].id !== end_url) {
                array.push(products);
                return getStorage(bascket);
              }
            }
          } else {
            array.push(products);
            getStorage(bascket);
          }
        }

        function getStorage(array) {
          localStorage.setItem("produit", JSON.stringify(array));
        }

        btn = document //variable btn contient élément du tableau à exporter dans le localStorage
          .getElementById("addToCart")
          .addEventListener("click", () => {
            // e.preventDefault;
            let produitInformations = {
              id: end_url,
              quantity: Number(quantity.value),
              color: formValue.value,
              image: data[i].imageUrl,
              price: price,
              name: name,
              alt: data[i].altTxt,
            };

            // compareStorage();
            addBascket(bascket, produitInformations);

            console.log(bascket);
          });
      }
    }
  }
}

recoverProducts();
