let orderIdUrl = new URLSearchParams(window.location.search).get("order");
console.log(orderIdUrl);
let confirmation = document.querySelector("#orderId");
confirmation.innerHTML = orderIdUrl;
