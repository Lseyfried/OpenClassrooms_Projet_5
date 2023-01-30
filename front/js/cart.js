const basket = JSON.parse(localStorage.getItem("basket"));
for (let index = 0; index < basket.length; index++) {
  const basketColor = basket[index].color;
  const basketQuantity = basket[index].quantity;
  const ID = fetch(`http://localhost:3000/api/products/${basket[index].id}`);

  Promise.all([basketColor, basketQuantity, ID]).then((values) => {
    console.log(values);
  });
}
