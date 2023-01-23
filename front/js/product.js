// let position = window.location.href.indexOf("=");
// alert(position);
// let id;
// let end_url;
// if (position != -1) {
//   id = "";
//   end_url = window.location.href.substring(position + 1);
// alert(fin_url);
// fin_url = fin_url.replace(/-/g, " ");
// alert(fin_url);
// }
let id = new URLSearchParams(window.location.search);
let end_url = id.get("id");
let color;
let quantityForm;
let bascket = [];
let colorSelected;
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
        )[0].innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}>`);
        // console.log(image);
        let name = (document.getElementById("title").innerHTML = data[i].name);
        let price = (document.getElementById("price").innerHTML =
          data[i].price);
        document.getElementById("description").innerHTML = data[i].description;
        let formValue = document.getElementById("colors");
        for (const colorSelected of data[i].colors) {
          // console.log(colorSelected);
          color =
            formValue.innerHTML += `<option value=${colorSelected}>${colorSelected}</option>`;
        }

        let quantity = document.getElementById("quantity");
        // console.log(quantity);
        // const total = bascket.push(data[i]._id, color, quantity);
        // localStorage.removeItem("data[i].colors");
        // localStorage.setItem("id", data[i]._id);
        // localStorage.setItem("quantity", quantity);
        // localStorage.setItem("color", color);
        // console.log(localStorage);
        const id = end_url;
        // console.log(color);
        bascket.push(quantity, id, color);

        let btn = document.getElementById("addToCart");
        btn.onclick = () => {
          let idValue = id;
          let quantityValue = quantity.value;
          let colorValue = formValue.value;
          let imageValue = data[i].imageUrl;
          let priceChoice = price;
          let nameChoice = name;
          let alt = data[i].altTxt;
          console.log(quantityValue);
          console.log(idValue);
          console.log(colorValue);
          console.log(imageValue);
          console.log(priceChoice);
          console.log(alt);

          localStorage.setItem("id", idValue);
          localStorage.setItem("colorChoice", colorValue);
          localStorage.setItem("quantityChoice", quantityValue);
          localStorage.setItem("image", imageValue);
          localStorage.setItem("price", priceChoice);
          localStorage.setItem("name", nameChoice);
          localStorage.setItem("alt", alt);
          console.log(localStorage);
        };

        // for (let index = 0; index < localStorage.length; index++) {
        //   idValue = localStorage.idValue(i);
        //   quantityValue = localStorage.quantityValue(i);
        //   colorValue = localStorage.colorValue(i);
      }
    }
  }
}

recoverProducts();
