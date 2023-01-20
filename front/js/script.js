const url = "http://localhost:3000/api/products";

fetch(url).then((reponse) => reponse.json())
.then(reponse2 => console.table(reponse2);)
