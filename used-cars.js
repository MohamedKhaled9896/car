document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("carForm");
  const list = document.getElementById("carsList");
  const priceInput = document.getElementById("price");
  const searchInput = document.getElementById("searchInput");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const owner = document.getElementById("owner").value;
    const phone = document.getElementById("phone").value;
    const type = document.getElementById("carType").value;
    const model = document.getElementById("carModel").value;
    const rawPrice = priceInput.value.replace(/[^\d]/g, "");
    const priceNumber = Number(rawPrice);

    if (isNaN(priceNumber) || rawPrice === "") {
      alert("يرجى إدخال سعر صحيح");
      return;
    }

    const formattedPrice = priceNumber.toLocaleString("en-EG");
    const payment = document.getElementById("payment").value;

    const newCar = document.createElement("div");
    newCar.classList.add("car-card");
    newCar.innerHTML = `
      <h3>${type} ${model}</h3>
      <p><strong>المالك:</strong> ${owner}</p>
      <p><strong>رقم الهاتف:</strong> ${phone}</p>
      <p><strong>السعر:</strong> ${formattedPrice} جنيه</p>
      <p><strong>الدفع:</strong> ${payment}</p>
    `;

    list.appendChild(newCar);
    form.reset();
  });

  searchInput.addEventListener("input", function () {
    const term = searchInput.value.toLowerCase();
    const cars = list.querySelectorAll(".car-card");

    cars.forEach((car) => {
      const text = car.innerText.toLowerCase();
      car.style.display = text.includes(term) ? "block" : "none";
    });
  });
});
