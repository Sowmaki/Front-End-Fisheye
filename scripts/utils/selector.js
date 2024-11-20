import { displaymediasData } from '../templates/photographerMedia.js';
import { selectorTemplates } from "../templates/selector.js";
import { isClickable } from "./clickables.js";
import { options } from './options.js';

selectorTemplates() // importe tous les éléments du DOM créés au préalable

const optionsList = document.getElementById('sort-options');
const allOptions = document.querySelectorAll('.sort__option')
const bars = optionsList.querySelectorAll('.bar');
const arrowIcon = document.querySelector('.fa-chevron-down')

// Ouvre la liste
export function displayList() {
  optionsList.classList.add('active');
  allOptions[1].style.display = 'flex';
  allOptions[2].style.display = 'flex';
  bars.forEach(bar => bar.style.display = 'block');
  arrowIcon.setAttribute('aria-expanded', 'true')
  arrowIcon.classList.add('rotate')
}

// Ferme la liste
export function closeList() {
  optionsList.classList.remove('active');
  allOptions[1].style.display = 'none';
  allOptions[2].style.display = 'none';
  bars.forEach(bar => bar.style.display = 'none');
  arrowIcon.setAttribute('aria-expanded', 'false');
  arrowIcon.classList.remove('rotate')
}

// Parametrage de l'icone de la flèche pour ouvrir ou fermer la liste
arrowIcon.addEventListener('click', (event) => {
  event.stopPropagation()
  if (optionsList.classList.contains('active')) {
    closeList()
  } else {
    displayList()
  }
})
isClickable(arrowIcon);

// Fonction globale de tri des medias
export function sortMedias(data) {
  // Fonction de gestion partagée pour le clic et le clavier 
  const handleSelection = (clickedOption, event) => {
    const clickedOptionValue = clickedOption.getAttribute('data-value');
    const clickedOptionTxt = clickedOption.querySelector('.li-txt');
    const selectedOption = allOptions[0];
    const selectedOptionTxt = selectedOption.querySelector('.li-txt');
    // Si la liste n'est pas active, on ne fait rien
    if (!optionsList.classList.contains('active')) return;

    event.stopPropagation();

    // Donne l'information de l'option selectionnée a la liste
    selectedOption.setAttribute('aria-selected', 'true')
    const selectedOptionId = selectedOption.id
    optionsList.setAttribute('aria-activedescendant', `${selectedOptionId}`)

    // Échange des textes entre l'option sélectionnée et l'option cliquée
    const tempContent = selectedOptionTxt.innerText;
    selectedOptionTxt.innerText = clickedOptionTxt.innerText;
    clickedOptionTxt.innerText = tempContent;

    // Mise à jour des valeurs des options
    const tempValue = selectedOption.id;
    selectedOption.setAttribute('value', `${clickedOptionValue}`);
    clickedOption.setAttribute("value", `${tempValue}`);

    // Trie les medias et leurs données selon l'option cliquée
    const valueInfo = options[clickedOptionValue];
    data.sort(valueInfo.sort);

    closeList(); // Ferme la liste après l'échange
    selectedOption.setAttribute('aria-selected', 'false')
    displaymediasData(data); // Met à jour l'affichage
    arrowIcon.focus(); // Re-focus sur l'icone de la flèche
  };

  // Gère le clic sur une option
  allOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const clickedOption = e.target.closest('li');
      handleSelection(clickedOption, e);
    });

    // Gère la touche 'Entrée' ou 'Espace' pour la sélection
    option.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        const clickedOption = event.target.closest('li');
        handleSelection(clickedOption, event);
      }
    });

    // Rend l'option focusable et ajoute l'accessibilité
    option.setAttribute('tabindex', '0');
    option.addEventListener('focus', () => {
      option.setAttribute('aria-selected', 'true'); // Indique qu'une option est sélectionnée
    });
    option.addEventListener('blur', () => {
      option.setAttribute('aria-selected', 'false'); // Retirr l'indicateur de sélection lorsque l'option perd le focus
    });
  });

}


