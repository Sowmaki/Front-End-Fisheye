
const main = document.querySelector("main")
const lightboxCloseBtn = document.querySelector(".lightbox__closeBtn")

export function displayLightbox(mediaIndex) {

  const lightbox = document.getElementById('lightbox');
  const mediaList = document.querySelectorAll('.item__media'); // Tous les médias dans le carrousel
  const media = mediaList[mediaIndex]; // Récupère le média cliqué
  const lightboxMedia = document.querySelector('.lightbox__media');


  // Affiche la lightbox
  lightbox.style.display = 'flex';
  main.style.display = 'none';
  main.setAttribute("aria-hidden", "true");
  lightbox.setAttribute("tabindex", "-1");
  lightboxCloseBtn.focus();


  //Affiche le media dans la lightbox
  if (media.tagName === 'IMG') {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = media.alt;
    img.classList.add('lightbox-img');
    lightboxMedia.innerHTML = '';

    lightboxMedia.appendChild(img)

  } else if (media.tagName === 'VIDEO') {
    const mediaSpanDescription = document.querySelector(".item__description");
    const spanDescription = document.createElement("span");
    spanDescription.className = mediaSpanDescription.className;
    spanDescription.textContent = mediaSpanDescription.textContent;

    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.classList.add('lightbox-video');
    video.setAttribute("aria-describedby", `${media.getAttribute('aria-describedby')}`);
    video.setAttribute("aria-labeledby", `${media.getAttribute('aria-labeledby')}`);
    lightboxMedia.innerHTML = '';

    lightboxMedia.appendChild(video);
    lightboxMedia.appendChild(spanDescription);
  }

  //Ajout du titre
  const title = document.createElement("h2");
  const container = media.closest('.item');
  const mediaTitle = container.querySelector('.item__title');
  title.textContent = mediaTitle.textContent;
  title.classList.add("lightbox__title");
  let currentTitle = document.querySelector('.lightbox__title');
  if (currentTitle) {
    currentTitle.remove()
  }
  lightbox.appendChild(title);

  // Ajouter la navigation entre les médias
  const prevButton = document.querySelector('.lightbox__previous');
  const nextButton = document.querySelector('.lightbox__next');

  prevButton.addEventListener('click', () => {
    let prevIndex = mediaIndex === 0 ? mediaList.length - 1 : mediaIndex - 1;
    displayLightbox(prevIndex);
    prevButton.focus()
  });

  nextButton.addEventListener('click', () => {
    let nextIndex = mediaIndex === mediaList.length - 1 ? 0 : mediaIndex + 1;
    displayLightbox(nextIndex);
    nextButton.focus()
  });

  //Fermer la modale
  lightboxCloseBtn.addEventListener('click', (event => {
    event.preventDefault()
    lightbox.style.display = 'none';
    main.style.display = 'flex';
    main.setAttribute("aria-hidden", "false");
    const mediaLink = container.querySelector('.item__link');
    mediaLink.focus() // met le focus sur l'image sur laquelle était l'utilisateur dans la lightbox   
  }))


}
