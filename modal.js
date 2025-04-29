// --------------------------------------------------
// Fonction pour rendre le menu de navigation responsive
// --------------------------------------------------
function editNav() {
  const x = document.getElementById("myTopnav");
  x.className = x.className === "topnav" ? "topnav responsive" : "topnav";
}

// Rendre la fonction visible globalement :
window.editNav = editNav;

/* --------------------------------------------------
    DOM Elements
-------------------------------------------------- */
const modalBg = document.querySelector(".bground"); // conteneur général
const modalBtns = document.querySelectorAll(".modal-btn"); // boutons “je m'inscris”
const closeSpan = document.getElementById("close"); // croix de fermeture sur le formulaire
const closeThankYouBtn = document.getElementById("closeThankYou"); // bouton "Fermer" écran Merci
const closeThankYouSpan = document.getElementById("closeThankYouSpan"); // croix de fermeture écran Merci
const form = document.forms["reserve"]; // formulaire

// Ouvre la modale
modalBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalBg.style.display = "block";
  })
);

// Ferme la modale avec la croix principale
closeSpan.addEventListener("click", closeModal);

// Ferme la modale avec la croix du message de remerciement
closeThankYouSpan.addEventListener("click", closeModal);

// Ferme la modale avec le bouton "Fermer" du message de remerciement
closeThankYouBtn.addEventListener("click", closeModal);

// Ferme la modale si l'on clique en dehors de la fenêtre
window.addEventListener("click", (e) => {
  if (e.target === modalBg) {
    closeModal();
  }
});

// Fonction générale pour fermer la modale
function closeModal() {
  modalBg.style.display = "none";

  // Réaffiche le formulaire
  document.getElementById("form-body").style.display = "block";

  // Cache le message de remerciement
  document.getElementById("thank-you").style.display = "none";

  // Affiche la croix du formulaire
  closeSpan.style.display = "block";

  // Cache la croix du message de remerciement
  closeThankYouSpan.style.display = "none";

  // Réinitialise le formulaire
  form.reset();

  // Supprime les messages d'erreur
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
}

/* --------------------------------------------------
   Validation du formulaire
-------------------------------------------------- */
form.addEventListener("submit", (e) => {
  e.preventDefault(); // empêche l'envoi classique

  // Supprime les anciens messages d'erreur
  document.querySelectorAll(".error-message").forEach((el) => el.remove());

  let isValid = true;

  /* 1. Champs obligatoires */
  const requiredIds = ["first", "last", "email", "birthdate", "quantity"];
  requiredIds.forEach((id) => {
    const input = document.getElementById(id);
    if (!input.value.trim()) {
      isValid = false;
      showError(input, "Ce champ est requis.");
    }
  });

  /* 2. Radio : choix du tournoi */
  const radios = document.querySelectorAll('input[name="location"]');
  if (![...radios].some((r) => r.checked)) {
    isValid = false;
    showError(radios[0].closest(".formData"), "Veuillez choisir un tournoi.");
  }

  /* 3. Checkbox conditions d’utilisation */
  const terms = document.getElementById("checkbox1");
  if (!terms.checked) {
    isValid = false;
    showError(terms.parentElement, "Vous devez accepter les conditions.");
  }

  /* 4. Si tout est valide : Affiche l'écran Merci */
  if (isValid) {
    document.getElementById("form-body").style.display = "none";
    document.getElementById("thank-you").style.display = "flex";

    // Cache la croix du formulaire
    closeSpan.style.display = "none";

    // Affiche la croix du message de remerciement
    closeThankYouSpan.style.display = "block";
  }
});

/* --------------------------------------------------
   Fonction utilitaire pour afficher une erreur
-------------------------------------------------- */
function showError(element, message) {
  const error = document.createElement("span");
  error.className = "error-message";
  error.style.color = "#e54858";
  error.textContent = message;
  element.insertAdjacentElement("afterend", error);
}