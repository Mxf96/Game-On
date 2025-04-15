// Ouvre la modal
document.querySelector(".btn-inscription").addEventListener("click", () => {
  document.getElementById("modal").style.display = "flex";
});

// Ferme la modal quand on clique sur la croix
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// Ferme si on clique en dehors du formulaire
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});