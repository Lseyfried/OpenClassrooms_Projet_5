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
        document.getElementsByClassName(
          "item__img"
        )[0].innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}>`;
        // alert(image);
        document.getElementById("title").innerHTML = data[i].name;
        document.getElementById("price").innerHTML = data[i].price;
        document.getElementById("description").innerHTML = data[i].description;
        let formValue = document.getElementById("colors");
        for (const colorSelected of data[i].colors) {
          console.log(colorSelected);
          formValue.innerHTML += `<option value=${colorSelected}>${colorSelected}</option>`;
        }
      }
    }
  }
}

recoverProducts();
