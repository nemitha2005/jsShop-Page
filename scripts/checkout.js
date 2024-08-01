const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvvRegex = /^\d{3}$/;
const addressRegex = /^[a-zA-Z0-9\s,.'\-/]*$/;
const postalCodeRegex = /^\d{5}$/;
const cityRegex = /^[a-zA-Z\s]+$/;
const countryRegex = /^[a-zA-Z\s]+$/;

const checkoutTotal = document.querySelector(".checkout-header-total-price");

const checkoutForm = document.querySelector("#checkout-form");
checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(checkoutForm);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  if (!nameRegex.test(formData.get("full-name"))) {
    alert("Please enter a valid name.");
    return;
  }

  if (!emailRegex.test(formData.get("email-address"))) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!phoneRegex.test(formData.get("phone-number"))) {
    alert("Please enter a valid phone number.");
    return;
  }

  if (!cardNumberRegex.test(formData.get("card-number"))) {
    alert("Please enter a valid card number.");
    return;
  }

  if (!expiryDateRegex.test(formData.get("expiry-date"))) {
    alert("Please enter a valid expiry date in MM/YY format.");
    return;
  }

  if (!cvvRegex.test(formData.get("cvv"))) {
    alert("Please enter a valid CVV.");
    return;
  }

  if (!addressRegex.test(formData.get("address"))) {
    alert("Please enter a valid address.");
    return;
  }

  if (!postalCodeRegex.test(formData.get("postal-code"))) {
    alert("Please enter a valid postal code.");
    return;
  }

  if (!cityRegex.test(formData.get("city"))) {
    alert("Please enter a valid city name.");
    return;
  }

  if (!countryRegex.test(formData.get("country"))) {
    alert("Please enter a valid country name.");
    return;
  }

  alert("Order placed successfully!");
  localStorage.setItem("basket", JSON.stringify([]));
  window.location.href = "shop.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  if (basket.length === 0) {
    window.location.href = "shop.html";
  }
  const total = basket
    .reduce((acc, product) => acc + Number.parseFloat(product.price), 0)
    .toFixed(2);
  const intValue = Math.floor(total);
  const decimalValue = (total - intValue).toFixed(2).slice(2);
  checkoutTotal.innerHTML = `<span>$</span>${intValue}.<span>${decimalValue}</span>`;
});