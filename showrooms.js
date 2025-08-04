document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar");
  const cards = document.querySelectorAll(".showroom-card");

  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    let anyVisible = false;

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = "block";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    // إظهار رسالة "لا توجد نتائج" إن أردت، ممكن تضيفها هنا
  });
});
