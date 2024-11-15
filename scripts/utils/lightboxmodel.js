// Fonction pour afficher la lightbox
function displayLightbox(mediaIndex) {
  const lightbox = document.getElementById('lightbox');
  const mediaList = document.querySelectorAll('.item__media'); // Tous les médias dans le carrousel
  const media = mediaList[mediaIndex]; // Récupère le média cliqué
  const lightboxMedia = document.querySelector('.lightbox-media');

  // Affiche la lightbox
  lightbox.style.display = 'flex';
  lightbox.setAttribute('aria-hidden', 'false');

  // Vérifie le type de média et l'affiche en grand dans la lightbox
  if (media.tagName === 'IMG') {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = media.alt;
    img.classList.add('lightbox-img');
    lightboxMedia.innerHTML = ''; // Vider la lightbox avant d'ajouter l'image
    lightboxMedia.appendChild(img);
  } else if (media.tagName === 'VIDEO') {
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.classList.add('lightbox-video');
    lightboxMedia.innerHTML = ''; // Vider la lightbox avant d'ajouter la vidéo
    lightboxMedia.appendChild(video);
  }

  // Ajouter la navigation entre les médias
  const prevButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');

  prevButton.addEventListener('click', () => {
    let prevIndex = mediaIndex === 0 ? mediaList.length - 1 : mediaIndex - 1;
    displayLightbox(prevIndex);
  });

  nextButton.addEventListener('click', () => {
    let nextIndex = mediaIndex === mediaList.length - 1 ? 0 : mediaIndex + 1;
    displayLightbox(nextIndex);
  });
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
}

// Fermer la lightbox lorsque le bouton est cliqué
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// Fermer la lightbox en cliquant en dehors de la fenêtre
document.getElementById('lightbox').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeLightbox();
  }
});
