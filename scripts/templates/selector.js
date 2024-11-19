import { options } from "../../data/options.js";

export function selectorTemplates() {

  const divTri = document.querySelector('.divTri');
  const list = document.createElement('ul');
  list.classList.add('sort');
  list.id = "sort-options";
  list.setAttribute('aria-label', 'Options de tri');
  list.tabIndex = 0;
  const bar = document.createElement('hr')
  bar.classList.add('bar')

  // Boucle pour créer chaque élément de la liste
  Object.keys(options).forEach((optionKey, index) => {
    const optionData = options[optionKey]; // Récupère l'objet correspondant à la clé
    const optionElement = document.createElement('li');
    optionElement.tabIndex = 0; // Permettre la navigation clavier
    optionElement.classList.add('sort__option');
    optionElement.id = optionData.id; // Attribue une valeur personnalisée
    optionElement.dataset.value = optionData.value;

    // Contenu principal de l'élément
    const optionContent = document.createElement('div');
    optionContent.classList.add('li-content');

    // Texte de l'option
    const optionText = document.createElement('span');
    optionText.classList.add('li-txt');
    optionText.innerText = optionData.text;

    // Icône pour le premier élément uniquement
    if (index === 0) {
      const likeIcon = document.createElement('span');
      likeIcon.classList.add('fa-solid', 'fa-chevron-down');
      optionContent.appendChild(likeIcon);
    }

    // Ajout des éléments au DOM
    optionContent.prepend(optionText);
    optionElement.appendChild(optionContent);
    if (index <= 1) {
      optionElement.insertAdjacentElement('afterend', bar)
    }
    list.appendChild(optionElement);
  });

  divTri.appendChild(list);
}

