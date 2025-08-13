document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.search-bar');
  const cards = document.querySelectorAll('.workshop-card');

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const textContent = card.textContent.toLowerCase();
      if (textContent.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
