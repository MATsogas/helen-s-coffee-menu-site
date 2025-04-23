function showMenuItemDetails(item) {
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalDescription").textContent = item.description;
  document.getElementById("modalPrice").textContent = item.price;

  const img = document.getElementById("modalImage");
  if (item.image) {
    img.src = item.image;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  document.getElementById("menuModal").style.display = "flex";
}

function hideMenuItemDetails() {
  document.getElementById("menuModal").style.display = "none";
}
