
const main = document.querySelector("main")
const lightboxCloseBtn = document.querySelector(".lightbox__closeBtn")

export function displayLightbox(mediaIndex) {

  const lightbox = document.getElementById('lightbox');
  const mediaList = document.querySelectorAll('.item__media'); // Tous les médias dans le carrousel
  const media = mediaList[mediaIndex]; // Récupère le média cliqué
  const lightboxMedia = document.querySelector('.lightbox__media');

  console.log(media.getAttribute('aria-labelledby'))


  // Affiche la lightbox
  lightbox.style.display = 'flex';
  main.style.display = 'none';
  main.setAttribute("aria-hidden", "true");
  main.classList.add('no-scroll');
  lightbox.setAttribute("tabindex", "-1");
  lightbox.style.display = "flex";
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
  title.classList.add("ligthbox__title");
  lightbox.appendChild(title);
}
