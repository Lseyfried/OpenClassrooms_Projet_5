let position = window.location.href.indexOf("?");
// alert(position);
let id;
let fin_url;
if (position != -1) {
  id = "";
  fin_url = window.location.href.substring(position + 1);
  // alert(fin_url);
  // fin_url = fin_url.replace(/-/g, " ");
  // alert(fin_url);
}
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
      if (fin_url == data[i]._id) {
        document.getElementById("title").innerHTML = data[i].name;
      }
      if (fin_url == data[i]._id) {
        document.getElementById("price").innerHTML = data[i].price;
      }
      if (fin_url == data[i]._id) {
        document.getElementById("description").innerHTML = data[i].description;
      }
    }
  }
}
recoverProducts();
