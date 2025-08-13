document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".part-card");

  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "block" : "none";
    });
  });
});
