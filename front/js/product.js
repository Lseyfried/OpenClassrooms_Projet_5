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
          if (array.length > 0) {
            for (let x = 0; x < array.length; x++) {
              if (
                array[x].id !== end_url ||
                array[x].color !== formValue.value
              ) {
                array.push(products);
                localStorage.setItem("produit", JSON.stringify(array));
              }
            }
          } else {
            array.push(products);
            localStorage.setItem("produit", JSON.stringify(array));
          }
        }

        function getStorage(array) {
          localStorage.setItem("produit", JSON.stringify(array));
        }

        function compareStorage() {
          if (bascket.length > 0) {
            let q = JSON.parse(localStorage.getItem("produit"));
            for (let index = 0; index < q.length; index++) {
              if (
                q[index].id === end_url &&
                q[index].color === formValue.value
              ) {
                bascket[0].quantity = quantity.value;
                bascket[0].color = formValue.value;
                break;
              } else {
                console.log("probleme");
              }
            }
          }
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
            compareStorage();
            addBascket(bascket, produitInformations);
            getStorage(bascket);

            // giveQuantity(bascket, name, formValue.value);
            // saveStorage(bascket);
            // getStorage(bascket);
            // productsFound(bascket, formValue.value);

            // foundArray(bascket);

            // if (bascket[index].id) {
            //   if (quantity.value === 1) {
            //     bascket[index].quantity === Number(quantity.value);
            //   } else if (quantity.value > 1) {
            //     bascket[index].quantity++;
            //   }
            // } else {
            //   console.log("pas de tableau");
            // }

            console.log(bascket);
          });
      }
    }
  }
}

recoverProducts();
