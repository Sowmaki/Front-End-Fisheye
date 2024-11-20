import { options } from "../../data/options.js";

// Crée les éléments du DOM nécessaires au sélecteur de tri
export function selectorTemplates() {
  const divTri = document.querySelector('.divTri');
  const list = document.createElement('ul');
  list.classList.add('sort');
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-labelledby', 'sort-by');
  list.id = "sort-options";
  list.setAttribute('aria-label', 'Options de tri');

  // Boucle pour créer chaque élément de la liste à partir de l'objet "options"
  Object.keys(options).forEach((optionKey, index) => {
    const optionData = options[optionKey]; // Récupère l'objet correspondant à la clé
    const optionElement = document.createElement('li');
    optionElement.tabIndex = 0;
    optionElement.classList.add('sort__option');
    optionElement.id = optionData.id;
    optionElement.dataset.value = optionData.value;
    optionElement.setAttribute('role', 'option');
    optionElement.setAttribute("aria-selected", "false");

    // Contenu principal de l'élément
    const optionContent = document.createElement('div');
    optionContent.classList.add('li-content');

    // Texte de l'option
    const optionText = document.createElement('span');
    optionText.classList.add('li-txt');
    optionText.innerText = optionData.text;

    // Icône de la flèche pour le premier élément uniquement
    if (index === 0) {
      const likeIcon = document.createElement('span');
      likeIcon.tabIndex = 0;
      likeIcon.classList.add('fa-solid', 'fa-chevron-down');
      likeIcon.setAttribute('role', 'button')
      likeIcon.setAttribute('aria-haspopup', 'listbox')
      likeIcon.setAttribute('aria-expanded', 'false');//indique par defaut que la liste est fermée
      optionContent.appendChild(likeIcon);
    }

    optionContent.prepend(optionText);
    optionElement.appendChild(optionContent);

    // Crée une nouvelle barre uniquement si nécessaire
    if (index === 0 || index === 1) {
      const bar = document.createElement('hr');
      bar.classList.add('bar');

      list.appendChild(optionElement); // Ajoutez d'abord l'élément dans la liste
      optionElement.insertAdjacentElement('afterend', bar); // Puis insérez la barre après
    } else {
      list.appendChild(optionElement); // Sinon, ajoutez simplement l'élément
    }
  });



  divTri.appendChild(list);
}

