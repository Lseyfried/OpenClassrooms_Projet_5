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
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?${data[i]._id}">
    <article>
      <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
      <h3 class="productName">${data[i].name}</h3>
      <p class="productDescription">${data[i].description}</p>
    </article>
  </a>`;
    }
  }
}
recoverProducts();
