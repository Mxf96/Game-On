// --------------------------------------------------
// Fonction pour rendre le menu de navigation responsive
// --------------------------------------------------
function editNav() {
  const x = document.getElementById("myTopnav");
  x.className = x.className === "topnav" ? "topnav responsive" : "topnav";
}
window.editNav = editNav;

/* --------------------------------------------------
   DOM Elements
-------------------------------------------------- */
const modalBg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".modal-btn");
const closeSpan = document.getElementById("close");
const closeThankYouBtn = document.getElementById("closeThankYou");
const closeThankYouSpan = document.getElementById("closeThankYouSpan");
const form = document.forms["reserve"];

/* --------------------------------------------------
   Ouverture / fermeture de la modale
-------------------------------------------------- */
modalBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalBg.style.display = "block";
  })
);

closeSpan.addEventListener("click", closeModal);
closeThankYouSpan.addEventListener("click", closeModal);
closeThankYouBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modalBg) closeModal();
});

function closeModal() {
  modalBg.style.display = "none";
  document.getElementById("form-body").style.display = "block";
  document.getElementById("thank-you").style.display = "none";
  closeSpan.style.display = "block";
  closeThankYouSpan.style.display = "none";
  // form.reset();
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
}

/* --------------------------------------------------
   Validation du formulaire
-------------------------------------------------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelectorAll(".error-message").forEach((el) => el.remove());

  let isValid = true;

  /* 1. Champs obligatoires -------------------- */
  const requiredIds = ["first", "last", "email", "birthdate", "quantity"];
  requiredIds.forEach((id) => {
    const input = document.getElementById(id);

    // a) champ vide
    if (!input.value.trim()) {
      isValid = false;
      showError(input, "Ce champ est requis.");
      return;
    }

    // b) first / last : minimum 2 caractères
    if (["first", "last"].includes(id) && input.value.trim().length < 2) {
      isValid = false;
      showError(input, "Veuillez entrer 2 caractères ou plus pour ce champ.");
    }
  });

  /* 2. Radio : choix du tournoi --------------- */
  const radios = document.querySelectorAll('input[name="location"]');
  if (![...radios].some((r) => r.checked)) {
    isValid = false;
    showError(radios[0].closest(".formData"), "Veuillez choisir un tournoi.");
  }

  /* 3. Checkbox CGU --------------------------- */
  const terms = document.getElementById("checkbox1");
  if (!terms.checked) {
    isValid = false;
    showError(terms.parentElement, "Vous devez accepter les conditions.");
  }

  /* 4. Date de naissance ---------------------- */
  const birthInput = document.getElementById("birthdate");
  if (!birthInput.value) {
    isValid = false;
    showError(birthInput, "Vous devez entrer votre date de naissance.");
  }

  /* 5. E-mail valide -------------------------- */
  const emailInput = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    isValid = false;
    showError(emailInput, "Adresse e-mail invalide.");
  }

  /* 6. Quantité numérique --------------------- */
  const qtyInput = document.getElementById("quantity");
  if (
    qtyInput.value.trim() === "" ||
    isNaN(qtyInput.value) ||
    Number(qtyInput.value) < 0
  ) {
    isValid = false;
    showError(qtyInput, "Veuillez indiquer un nombre valide.");
  }

  /* 7. Affichage “Merci” si tout est OK -------- */
  if (isValid) {
    document.getElementById("form-body").style.display = "none";
    document.getElementById("thank-you").style.display = "flex";
    closeSpan.style.display = "none";
    closeThankYouSpan.style.display = "block";
  }
});

/* --------------------------------------------------
   Affichage d’erreur
-------------------------------------------------- */
function showError(element, message) {
  const error = document.createElement("span");
  error.className = "error-message";
  error.setAttribute("role", "alert");
  error.textContent = message;
  element.insertAdjacentElement("afterend", error);
}