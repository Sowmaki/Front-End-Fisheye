import { options } from '../../data/options.js';
import { displaymediasData } from '../templates/photographerMedia.js';
import { selectorTemplates } from "../templates/selector.js";
import { isClickable } from "./clickables.js";

selectorTemplates()

const optionsList = document.getElementById('sort-options');
const allOptions = document.querySelectorAll('.sort__option')
const bars = optionsList.querySelectorAll('.bar');



export function displayList() {
  optionsList.classList.add('active');
  allOptions[1].style.display = 'flex';
  allOptions[2].style.display = 'flex';
  bars.forEach(bar => bar.style.display = 'block');

}

export function closeList() {
  console.log('CLOSE LIST')
  optionsList.classList.remove('active');
  allOptions[1].style.display = 'none';
  allOptions[2].style.display = 'none';
  bars.forEach(bar => bar.style.display = 'none');
}

optionsList.addEventListener('click', () => {
  if (optionsList.classList.contains('active'))
    closeList()
  else
    displayList()
})
isClickable(optionsList);

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

    // Échange des textes entre l'option sélectionnée et l'option cliquée
    const tempContent = selectedOptionTxt.innerText;
    selectedOptionTxt.innerText = clickedOptionTxt.innerText;
    clickedOptionTxt.innerText = tempContent;

    // Mise à jour des valeurs
    const tempValue = selectedOption.id;
    selectedOption.setAttribute('value', `${clickedOptionValue}`);
    clickedOption.setAttribute("value", `${tempValue}`);

    // Trier les données selon l'option cliquée
    const valueInfo = options[clickedOptionValue];
    data.sort(valueInfo.sort);

    closeList(); // Fermer la liste après l'échange de contenu
    displaymediasData(data); // Mettre à jour l'affichage
    optionsList.focus(); // Re-focus sur la liste
  };

  // Gérer le clic sur une option
  allOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const clickedOption = e.target.closest('li');
      handleSelection(clickedOption, e);
    });

    // Gérer la touche 'Entrée' ou 'Espace' pour la sélection
    option.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        const clickedOption = event.target.closest('li');
        handleSelection(clickedOption, event);
      }
    });

    // Rendre l'option focusable et ajouter l'accessibilité
    option.setAttribute('tabindex', '0');
    option.addEventListener('focus', () => {
      option.setAttribute('aria-selected', 'true'); // Indiquer qu'une option est sélectionnée
    });
    option.addEventListener('blur', () => {
      option.setAttribute('aria-selected', 'false'); // Retirer l'indicateur de sélection lorsque l'option perd le focus
    });
  });

}


