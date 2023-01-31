const basket = JSON.parse(localStorage.getItem("basket"));
for (let index = 0; index < basket.length; index++) {
  const basketColor = basket[index].color;
  const basketQuantity = basket[index].quantity;
  recoverId();
  async function recoverId() {
    const basketId = await fetch(
      `http://localhost:3000/api/products/${basket[index].id}`,
      {
        method: "GET",
      }
    );
    if (!basketId.ok) {
      alert("Un problème est survenu");
    } else {
      let arrayID = await basketId.json();
      console.log(arrayID);
      Promise.all([basketColor, basketQuantity, arrayID]).then((values) => {
        console.log(values);
      });
    }
  }
}
