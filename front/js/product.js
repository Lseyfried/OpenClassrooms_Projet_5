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
      if (data.indexOf(data[i]._id) == data.indexOf(data[i].name)) {
        document.getElementById("title").innerHTML = data[i].name;
      } else {
        i++;
      }
    }
  }
}
recoverProducts();
console.log(indexOf(data[0]._id));
