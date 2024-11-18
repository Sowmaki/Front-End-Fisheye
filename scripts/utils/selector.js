import { displaymediasData } from '../templates/photographerMedia.js';
import { isClickable } from "./clickables.js";

const optionsList = document.getElementById('sort-options');
const options = document.querySelectorAll('.sort__option');
const optionsTxt = document.querySelectorAll('.li-txt');
const bars = optionsList.querySelectorAll('.bar');

isClickable(optionsList);

export function displayList() {

  optionsList.classList.add('active');
  options[1].style.display = 'flex';
  options[2].style.display = 'flex';
  bars.forEach(bar => bar.style.display = 'block');

}

export function closeList() {
  optionsList.classList.remove('active');
  options[1].style.display = 'none';
  options[2].style.display = 'none';
  bars.forEach(bar => bar.style.display = 'none');
}

export function sortMedias(data) {
  let toggleState = false;

  // Gérer le clic sur une option
  optionsTxt.forEach(option => {

    //fait en sorte que le clic concerne tout l'élément li
    option.addEventListener('click', (e) => {
      const clickedOption = e.target.closest('.sort__option')
      const clickedOptionValue = clickedOption.getAttribute('value')
      const clickedOptionTxt = e.target;
      const selectedOptionTxt = optionsTxt[0];
      const selectedOption = options[0];

      if (toggleState) {
        const tempContent = selectedOptionTxt.innerText;
        selectedOptionTxt.innerText = clickedOptionTxt.innerText;
        clickedOptionTxt.innerText = tempContent;

        const tempValue = selectedOption.getAttribute('value');
        selectedOption.setAttribute('value', `${clickedOptionValue}`)
        clickedOption.setAttribute("value", `${tempValue}`)

        let sortedMedias;

        if (clickedOption.getAttribute("value") === "popularity") {
          // Tri par popularité (nombre de likes)
          sortedMedias = data.sort((a, b) => b.likes - a.likes);
        } else if (clickedOption.getAttribute("value") === "title") {
          // Tri alphabétique par titre
          sortedMedias = data.sort((a, b) => a.title.localeCompare(b.title));
        } else if (clickedOption.getAttribute("value") === "date") {
          // Tri par date (du plus récent au plus ancien)
          sortedMedias = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
          console.log("Aucune option de tri sélectionnée");
          console.log(`${e.target}`);

          return;
        }

        displaymediasData(sortedMedias); // Appelle la fonction correctement importée
        closeList(); // Fermer la liste après l'échange de contenu
      } else {
        displayList(); // Ouvrir la liste si elle est fermée
      }

      toggleState = !toggleState; // Change l'état

    });

    isClickable(option)
  });
}
