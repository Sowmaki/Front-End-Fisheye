import { isClickable } from "./clickables.js";

const main = document.querySelector("main");
const modal = document.getElementById("contact_modal");
const modalCloseBtn = document.querySelector(".modal__closeBtn")
const modalOpenBtn = document.querySelector(".contact__button")
const modalForm = document.querySelector(".modal__form");

// Ouvre la modale du formulaire
function displayModal() {
    main.setAttribute("aria-hidden", "true");
    main.style.opacity = '30%'
    main.classList.add('no-scroll')
    modal.setAttribute("tabindex", "-1");
    modal.style.display = "flex";
    modalCloseBtn.focus()
    /**Au vu de l'utilisation de la balise <dialog>, pas besoin d'ajouter un rôle ARIA dialog 
        ou d'autres attributs comme aria-hidden manuellement**/
}

// Ferme la modale du formulaire
function closeModal() {
    main.setAttribute("aria-hidden", "false");
    main.style.opacity = '100%'
    main.classList.remove('no-scroll')
    // modal.setAttribute('aria-hidden', 'true');
    modal.style.display = "none";
}

// Ouvre la modale au clic sur le bouton "Contactez-moi"
modalOpenBtn.addEventListener('click', (event) => {
    event.preventDefault()
    displayModal()
});
isClickable(modalOpenBtn)

// Ferme la modale au clic sur la croix ou en pressant "echap"
document.addEventListener("keydown", (event) => {
    event.key === "Escape" && closeModal()
})

modalCloseBtn.addEventListener('click', (event) => {
    event.preventDefault()
    closeModal()
});

// Fonction de validation du formulaire
function validateForm() {
    let isFormValid = true;
    const inputs = document.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
        if (!input.checkValidity()) {
            element.setAttribute("aria-invalid", "true");
            invalidFeedback.style.display = "block"
            isFormValid = false;
        } else {
            input.setAttribute("aria-invalid", "false");
            console.log(`${input.name}: ${input.value}`)
            isFormValid = true;
        }
    })

    if (isFormValid) {
        closeModal()
    }
}

// Applique la fonction validateForm() à l'évènement de soumission du formulaire, et supprime son comportement par defaut.
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm()
    closeModal()
});


isClickable(modalCloseBtn)

