const main = document.querySelector("main");
const modal = document.getElementById("contact_modal");
const modalCloseBtn = document.querySelector(".modal__closeBtn")
const modalOpenBtn = document.querySelector(".contact__button")
const modalForm = document.querySelector(".modal__form");

function displayModal() {
    main.setAttribute("aria-hidden", "true");
    // modal.setAttribute('aria-hidden', 'false');
    // modal.setAttribute("role", "dialog");
    /**Au vu de l'utilisation de la balise <dialog>, pas besoin d'ajouter un rôle ARIA dialog 
    ou d'autres attributs comme aria-hidden manuellement**/
    main.classList.add('no-scroll')
    modal.setAttribute("tabindex", "-1");
    modal.style.display = "flex";
    modalCloseBtn.focus()
}

function closeModal() {
    main.setAttribute("aria-hidden", "false");
    main.classList.remove('no-scroll')
    // modal.setAttribute('aria-hidden', 'true');
    modal.style.display = "none";
}

//Ouvrir la modale
modalOpenBtn.addEventListener('click', (event) => {
    event.preventDefault()
    displayModal()
});

// Fermer la modale
document.addEventListener("keydown", (event) => {
    event.key === "Escape" && closeModal()
})

modalCloseBtn.addEventListener('click', (event) => {
    event.preventDefault()
    closeModal()
});

// Parametrage formulaire
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

// Application de la fonction validateForm() à l'évènement de soumission du formulaire, et suppression de son comportement par defaut.
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm()
    closeModal()
});


