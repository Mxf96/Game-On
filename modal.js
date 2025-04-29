function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


function editNav() {
  const x = document.getElementById("myTopnav");
  x.className = x.className === "topnav" ? "topnav responsive" : "topnav";
}

/* --------------------------------------------------
   Ouverture / fermeture de la modale
-------------------------------------------------- */
// éléments utiles
const modalBg   = document.querySelector(".bground");      // conteneur général
const modalBtns = document.querySelectorAll(".modal-btn"); // deux boutons “je m'inscris”
const closeSpan = document.querySelector(".close");        // la croix (✕) en haut à droite

// ouvre la modale
modalBtns.forEach(btn => btn.addEventListener("click", () => {
  modalBg.style.display = "block";
}));

// ferme la modale avec la croix
closeSpan.addEventListener("click", closeModal);

// ferme si l’on clique hors de la fenêtre
window.addEventListener("click", e => {
  if (e.target === modalBg) closeModal();
});

function closeModal() {
  modalBg.style.display = "none";
}

/* --------------------------------------------------
   Validation du formulaire
-------------------------------------------------- */
const form = document.forms["reserve"];           // <form name="reserve" …>

form.addEventListener("submit", e => {
  e.preventDefault();                             // stoppe l’envoi classique
  // supprime les anciens messages d’erreur
  document.querySelectorAll(".error-message").forEach(el => el.remove());

  let isValid = true;

  /* 1. Champs obligatoires --------------------------------------------- */
  const requiredIds = ["first", "last", "email", "birthdate", "quantity"];
  requiredIds.forEach(id => {
    const input = document.getElementById(id);
    if (!input.value.trim()) {
      isValid = false;
      showError(input, "Ce champ est requis.");
    }
  });

  /* 2. Radio : choix du tournoi ---------------------------------------- */
  const radios = document.querySelectorAll('input[name="location"]');
  if (![...radios].some(r => r.checked)) {
    isValid = false;
    showError(radios[0].closest(".formData"), "Veuillez choisir un tournoi.");
  }

  /* 3. Checkbox conditions d’utilisation ------------------------------- */
  const terms = document.getElementById("checkbox1");
  if (!terms.checked) {
    isValid = false;
    showError(terms.parentElement, "Vous devez accepter les conditions.");
  }

  /* 4. Si tout est bon : écran « Merci » -------------------------------- */
  if (isValid) {
    const content = document.querySelector(".content");

    content.innerHTML = `
      <span class="close" id="closeModal"></span>
      <div style="
        display:flex; flex-direction:column; justify-content:center;
        align-items:center; height:700px; color:#ffffff; text-align:center;
        position:relative;">
        <p style="font-size:24px;font-weight:bold;">
          Merci pour <br> votre inscription
        </p>
        <button id="closeThankYou" style="
          background-color:#fe142f; color:#ffffff; border:none;
          padding:12px 24px; font-size:16px; border-radius:5px;
          cursor:pointer; position:absolute; bottom:30px;">
          Fermer
        </button>
      </div>
    `;

    /* Ajout des déclencheurs de fermeture sur la nouvelle croix
       et sur le bouton « Fermer » de l’écran de remerciement */
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("closeThankYou").addEventListener("click", closeModal);
  }
});

/* --------------------------------------------------
   Fonction utilitaire d’affichage d’erreur
-------------------------------------------------- */
function showError(element, message) {
  const error = document.createElement("span");
  error.className = "error-message";
  error.style.color = "#e54858";
  error.textContent = message;
  element.insertAdjacentElement("afterend", error);
}