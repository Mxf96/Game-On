// Activer/Désactiver le menu
const burger = document.querySelector(".burger");
const navList = document.querySelector(".nav-list");

burger.addEventListener("click", () => {
  navList.classList.toggle("active");
});

// Ferme le menu si on clique en dehors
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navList.contains(e.target);
  const isClickOnBurger = burger.contains(e.target);

  if (!isClickInsideMenu && !isClickOnBurger) {
    navList.classList.remove("active");
  }
});



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

// Validation du formulaire
document
  .querySelector(".registration-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche l'envoi par défaut

    // Réinitialise les anciens messages d’erreur
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    let isValid = true;

    const requiredFields = [
      "prenom",
      "nom",
      "email",
      "birthdate",
      "participations",
    ];
    requiredFields.forEach((id) => {
      const input = document.getElementById(id);
      if (!input.value.trim()) {
        isValid = false;
        showError(input, "Ce champ est requis.");
      }
    });

    // Vérifie qu'un tournoi est sélectionné
    const radios = document.querySelectorAll('input[name="tournament"]');
    if (![...radios].some((r) => r.checked)) {
      isValid = false;
      const container = document.querySelector(".tournament-options");
      showError(container, "Veuillez choisir un tournoi.");
    }

    // Vérifie que la première checkbox (conditions) est cochée
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (!checkboxes[0].checked) {
      isValid = false;
      showError(
        checkboxes[0].parentElement,
        "Vous devez accepter les conditions."
      );
    }

    if (isValid) {
      const form = document.querySelector(".registration-form");
      form.innerHTML = `
        <span class="close-btn" id="closeModal">&times;</span>
        <div style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 750px;
          color: #ffffff;
          text-align: center;
          position: relative;
        ">
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 40px;">
            Merci pour <br> votre inscription
          </p>
          <button id="closeThankYou" style="
            background-color: #fe142f;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            position: absolute;
            bottom: 10px;
          ">Fermer</button>
        </div>
      `;

      // Ajoute les écouteurs pour fermer la modal
      document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
      });

      document.getElementById("closeThankYou").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
      });
    }
  });

function showError(element, message) {
  const error = document.createElement("span");
  error.className = "error-message";
  error.textContent = message;
  element.insertAdjacentElement("afterend", error);
}
