let order = document.querySelector("#orderId");
const orderUrl = new URLSearchParams(window.location.search).get("orderId");
order.textContent = orderUrl;
localStorage.clear();
