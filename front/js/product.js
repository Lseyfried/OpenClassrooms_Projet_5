let end_url = new URLSearchParams(window.location.search).get("id");
// let end_url = id.get("id");
let color;
// let quantityForm;
// let bascket = [];
let colorSelected;
let idValue;
let quantityValue;
let colorValue;
let imageValue;
let priceChoice;
let nameChoice;
let bascket;
let alt;
let btn;
let produitInformations;
// alert(end_url);
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
        let image = (document.getElementsByClassName(
          "item__img"
        )[0].innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}">`);
        // console.log(image);
        let name = (document.getElementById("title").innerHTML = data[i].name);
        let price = (document.getElementById("price").innerHTML =
          data[i].price);
        document.getElementById("description").innerHTML = data[i].description;
        let formValue = document.getElementById("colors"); //selection de couleur
        for (const colorSelected of data[i].colors) {
          //renvoie toutes les couleurs du tableau colors
          // console.log(colorSelected);
          color =
            formValue.innerHTML += `<option value=${colorSelected}>${colorSelected}</option>`;
        }

        let quantity = document.getElementById("quantity"); //quantité de canapé
        // let produitInformations = {
        //   idValue: end_url,
        //   quantityValue: quantity.value,
        //   colorValue: formValue.value,
        //   imageValue: data[i].imageUrl,
        //   priceChoice: price,
        //   nameChoice: name,
        //   alt: data[i].altTxt,
        // };

        btn = document //variable btn contient élément du tableau à exporter dans le localStorage
          .getElementById("addToCart")
          .addEventListener("click", (e) => {
            e.defaultPrevented;
            idValue = end_url;
            quantityValue = quantity.value;
            colorValue = formValue.value;
            imageValue = data[i].imageUrl;
            priceChoice = price;
            nameChoice = name;
            alt = data[i].altTxt;

            // bascket.push(idValue);
            // bascket.push(quantityValue);
            // bascket.push(colorValue);
            // bascket.push(imageValue);
            // bascket.push(priceChoice);
            // bascket.push(nameChoice);
            // bascket.push(alt);
            // localStorage.setItem("id", idValue);
            // localStorage.setItem("colorChoice", colorValue);
            // localStorage.setItem("quantityChoice", quantityValue);
            // localStorage.setItem("image", imageValue);
            // localStorage.setItem("price", priceChoice);
            // localStorage.setItem("name", nameChoice);
            // localStorage.setItem("alt", alt);

            // if (bascket) {
            //   bascket.push(btn);
            //   localStorage.setItem("produit", bascket);
            // } else {
            //   bascket = [];
            //   bascket.push(btn);
            //   localStorage.setItem("produit", bascket);
            //   console.log(localStorage);
            //
            produitInformations = {
              //recupérer informations dans une seule variable
              idValue: end_url,
              quantityValue: quantity.value,
              colorValue: formValue.value,
              imageValue: data[i].imageUrl,
              priceChoice: price,
              nameChoice: name,
              alt: data[i].altTxt,
            };
            console.log(produitInformations);
            bascket = JSON.parse(localStorage.getItem("produit"));
            // console.log(bascket);
            if (bascket) {
              bascket.push(produitInformations);
              localStorage.setItem("produit", JSON.stringify(bascket));
              // console.log(bascket);
            } else {
              bascket = [];
              bascket.push(produitInformations);
              localStorage.setItem("produit", JSON.stringify(bascket));

              console.log(bascket);
            }
            window.location.href = "cart.html";
          });
      }
    }
  }
}

recoverProducts();
