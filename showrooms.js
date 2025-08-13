document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.search-bar');
  const cards = document.querySelectorAll('.showroom-card');

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      const show = title.includes(query);
      card.style.display = show ? 'block' : 'none';
    });
  });
});
