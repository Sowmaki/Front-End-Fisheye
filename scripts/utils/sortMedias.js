import { displaymediasData } from '../templates/photographerMedia.js';

export function sortMedias(data) {
  const sortOptions = document.getElementById("sort-options");

  sortOptions.addEventListener('change', (event) => {
    let sortedMedias;

    if (event.target.value === "popularity") {
      // Tri par popularité (nombre de likes)
      sortedMedias = data.sort((a, b) => b.likes - a.likes);
    } else if (event.target.value === "title") {
      // Tri alphabétique par titre
      sortedMedias = data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (event.target.value === "date") {
      // Tri par date (du plus récent au plus ancien)
      sortedMedias = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      console.log("Aucune option de tri sélectionnée");
      return;
    }

    displaymediasData(sortedMedias); // Appelle la fonction correctement importée
  });
}