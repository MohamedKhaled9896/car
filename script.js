document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar");
  const sections = document.querySelectorAll(".section");

  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    sections.forEach((section) => {
      const items = section.querySelectorAll(".item");
      let anyVisible = false;

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "block";
          anyVisible = true;
        } else {
          item.style.display = "none";
        }
      });

      // إظهار أو إخفاء القسم كله حسب وجود عناصر مطابقة
      section.style.display = anyVisible ? "block" : "none";
    });
  });
});
