import { isClickable } from "../utils/clickables.js";

const main = document.querySelector("main");
const lightboxCloseBtn = document.querySelector(".lightbox__closeBtn");
let currentMediaIndex = 0; // Variable pour stocker l'index actuel
let lightboxKeyListenerAdded = false; // Marqueur pour éviter d'ajouter plusieurs fois l'écouteur


// Ouvre la Lightbox
export function displayLightbox(mediaIndex) {
  const lightbox = document.getElementById('lightbox');
  const mediaList = document.querySelectorAll('.item__media');
  const lightboxMedia = document.querySelector('.lightbox__media');
  const prevButton = document.querySelector('.lightbox__previous');
  prevButton.setAttribute('aria-label', 'Previous image')
  const nextButton = document.querySelector('.lightbox__next');
  nextButton.setAttribute('aria-label', 'Next image')

  // Stocke l'index actuel
  currentMediaIndex = mediaIndex;

  // Affiche la lightbox
  lightbox.style.display = 'flex';
  main.style.display = 'none';
  main.setAttribute("aria-hidden", "true");
  lightbox.setAttribute("tabindex", "-1");
  lightboxCloseBtn.focus();

  // Affiche le média dans la lightbox
  const media = mediaList[currentMediaIndex];
  if (media.tagName === 'IMG') {
    const img = document.createElement('img');
    img.src = media.src;
    const descriptionElement = document.getElementById(media.getAttribute('aria-labelledby'))
    img.alt = descriptionElement.textContent;
    img.setAttribute('aria-label', 'Image Close up View')
    img.classList.add('lightbox-img');
    lightboxMedia.innerHTML = ''; // Vide le contenu précédent
    lightboxMedia.appendChild(img);
  } else if (media.tagName === 'VIDEO') {
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.classList.add('lightbox-video');
    lightboxMedia.innerHTML = ''; // Vide le contenu précédent
    lightboxMedia.appendChild(video);
  }

  // Ajoute le titre
  const container = media.closest('.item');
  const mediaTitle = container.querySelector('.item__title');
  const title = document.createElement("h2");
  title.textContent = mediaTitle.textContent;
  title.classList.add("lightbox__title");
  let currentTitle = document.querySelector('.lightbox__title');
  if (currentTitle) {
    currentTitle.remove();
  }
  lightbox.appendChild(title);

  // Ajoute la navigation entre les médias
  prevButton.onclick = () => {
    currentMediaIndex = currentMediaIndex === 0 ? mediaList.length - 1 : currentMediaIndex - 1;
    displayLightbox(currentMediaIndex);
    prevButton.focus();
  };

  nextButton.onclick = () => {
    currentMediaIndex = currentMediaIndex === mediaList.length - 1 ? 0 : currentMediaIndex + 1;
    displayLightbox(currentMediaIndex);
    nextButton.focus();
  };

  // Fonction de navigation avec le clavier (flèches gauche/droite + échap)
  const handleLightboxKeyNavigation = (event) => {
    if (event.key === "ArrowLeft") {
      currentMediaIndex = currentMediaIndex === 0 ? mediaList.length - 1 : currentMediaIndex - 1;
      displayLightbox(currentMediaIndex);
    } else if (event.key === "ArrowRight") {
      currentMediaIndex = currentMediaIndex === mediaList.length - 1 ? 0 : currentMediaIndex + 1;
      displayLightbox(currentMediaIndex);
    } else if (event.key === "Escape") {
      closeLightbox(); // Fermer la lightbox avec échap
    }
  };

  // Ajoute un seul écouteur global
  if (!lightboxKeyListenerAdded) {
    document.addEventListener('keydown', handleLightboxKeyNavigation);
    lightboxKeyListenerAdded = true;
  }

  // Ferme la lightbox
  const closeLightbox = () => {
    lightbox.style.display = 'none';
    main.style.display = 'grid';
    main.setAttribute("aria-hidden", "false");
    const container = media.closest('.item');
    const mediaLink = container.querySelector('.item__link');
    mediaLink.focus(); // Met le focus sur l'image de la liste qui etait ouverte dans la lightbox
    document.removeEventListener('keydown', handleLightboxKeyNavigation); // Nettoie l'écouteur
    lightboxKeyListenerAdded = false;
  };

  // Bouton qui ferme la lightbox
  lightboxCloseBtn.onclick = (event) => {
    event.preventDefault();
    closeLightbox();
  };

  // Rendre les boutons accessibles via clavier
  if (!prevButton.dataset.clickable) {
    isClickable(prevButton);
    prevButton.dataset.clickable = "true"; // Marque ce bouton comme déjà configuré
  }

  if (!nextButton.dataset.clickable) {
    isClickable(nextButton);
    nextButton.dataset.clickable = "true"; // Marque ce bouton comme déjà configuré
  }

  isClickable(lightboxCloseBtn);
}
