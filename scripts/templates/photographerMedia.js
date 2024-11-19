import { getPhotographers } from "../data.js";
import { getPhotographerPrice } from "../pages/photographer.js";
import { isClickable } from "../utils/clickables.js";
import { displayLightbox } from "../utils/lightbox.js";
import { sortMedias } from "../utils/selector.js";


function photographerMediasTemplate(data) {

  function getUserMediasDOM() {

    const divMedias = document.createElement("section");
    divMedias.className = "medias";


    /*****************************************************MEDIAS */

    const mediasList = document.createElement("ul")
    mediasList.className = "medias-list";

    divMedias.appendChild(mediasList);

    //on crée une variable qui compte le nombre de video pour les numéroter si il y en a plusieurs
    let numMedia = 0;
    let numVideo = 0;
    // Pour chaque élément (photo) du tableau, on crée un élément li contenant les "articles" et on l'ajoute à la liste ul qui contient ceci
    data.forEach((media, index) => {
      numMedia++

      const mediaItem = document.createElement("li");
      mediaItem.className = "item";

      const mediaLink = document.createElement("a")
      mediaLink.className = "item__link"
      mediaLink.setAttribute("href", "#")
      mediaLink.addEventListener('click', (event) => {
        event.preventDefault();
        displayLightbox(index); // Passer l'index du média cliqué à la lightbox
      });
      isClickable(mediaLink)


      const mediaTitle = document.createElement("h2");
      mediaTitle.textContent = media.title;
      mediaTitle.id = `item${numMedia}-title`;
      mediaTitle.classList.add("item__title")

      const itemBottom = document.createElement("div");
      itemBottom.className = "item__bottom";

      const itemLikes = document.createElement('div')
      itemLikes.classList.add('item__likesDiv')
      const iconLink = document.createElement('a')
      iconLink.classList.add('item__iconLink')
      iconLink.setAttribute('href', '#')
      const itemIcon = document.createElement('span')
      itemIcon.classList.add('fa-solid', 'fa-heart')
      itemIcon.setAttribute('aria-label', 'Likes')
      incrementLikes()

      const likes = document.createElement('span')
      likes.classList.add('item__likes')
      likes.textContent = `${media.likes}`

      iconLink.appendChild(itemIcon)
      itemLikes.appendChild(likes)
      itemLikes.appendChild(iconLink)

      function incrementLikes() {
        iconLink.addEventListener('click', (event) => {
          event.preventDefault()
          media.likes++
          likes.textContent = `${media.likes}`
          likesSum++
          likesSpan.textContent = `${likesSum}`
        })
        isClickable(iconLink)
      }


      itemBottom.appendChild(mediaTitle)
      itemBottom.appendChild(itemLikes)

      if (media.image) {
        const mediaImg = document.createElement("img");
        mediaImg.classList.add("item__media")
        mediaImg.src = `assets/photographers_medias/${media.photographerId}/${media.image}`
        mediaImg.setAttribute('aria-labelledby', `item${numMedia}-title`);
        mediaItem.appendChild(mediaLink);
        mediaLink.appendChild(mediaImg);
      } else if (media.video) {

        numVideo++  //incrémente numVideo

        //on crée un span de description pour la video
        const spanDescription = document.createElement("span");
        spanDescription.id = `description${numVideo}`;
        spanDescription.className = "item__description";
        spanDescription.textContent = `${media.description}`

        const mediaVideo = document.createElement("video");
        mediaVideo.setAttribute("aria-labeledby", `item${numMedia}-title`)
        mediaVideo.classList.add("item__media")
        mediaVideo.src = `assets/photographers_medias/${media.photographerId}/${media.video}`;
        // mediaVideo.controls = true; // Ajoute les contrôles de lecture de la vidéo
        mediaItem.appendChild(mediaLink);
        mediaLink.appendChild(mediaVideo);

        mediaVideo.addEventListener('click', (event) => event.preventDefault())
      }

      mediasList.appendChild(mediaItem);
      mediaItem.appendChild(itemBottom);


      // const price = document.createElement("p");
      // encart.appendChild(price);

    });

    divMedias.appendChild(mediasList);

    sortMedias(data)
    //***************************************************Encart 
    // afficher le nombre total de likes dans l'encart
    const likesList = mediasList.querySelectorAll('.item__likes')
    let likesSum = 0

    likesList.forEach(element => {
      const elementContent = element.innerText
      const numberLikes = parseInt(elementContent)
      likesSum += numberLikes

    })

    const likesSpan = document.createElement('span')
    likesSpan.classList.add('encart__likes')
    likesSpan.textContent = `${likesSum}`

    const divLikes = document.querySelector('.encart__likes')
    divLikes.textContent === "" && divLikes.prepend(likesSpan)

    //Afficher le prix du photographe dans l'encart

    async function displayPhotographerPrice(id) {
      const encart = document.querySelector('.encart')
      const priceDiv = document.createElement('div')
      priceDiv.classList.add('encart__priceDiv')
      const price = await getPhotographerPrice(id);
      if (price !== null) {
        priceDiv.textContent = `${price}€ /jour`
        encart.querySelector(".encart__priceDiv")?.remove()
        encart.appendChild(priceDiv)
      }
    }

    displayPhotographerPrice()

    return divMedias;

  };

  return { getUserMediasDOM };

}

export async function displaymediasData(medias) {
  const main = document.querySelector("main"); //recupere l'endroit ou vont etre affichés les medias
  // supprime l'element medias du main s'il existe deja
  main.querySelector(".medias")?.remove()

  const photographerMediasModel = photographerMediasTemplate(medias); //

  const userMediasDOM = photographerMediasModel.getUserMediasDOM();
  // const userLikesDOM = photographerMediasModel.getUserLikes()
  main.appendChild(userMediasDOM);
  // likesDiv.prepend(userLikesDOM)
}

async function recupererMediasPhotographe(id) {
  const photographerID = parseInt(new URLSearchParams(location.search).get("id"))

  const result = await getPhotographers();

  const photographerMedias = result.media

  const selectedMedias = photographerMedias.filter(element => element.photographerId === photographerID)

  if (!selectedMedias) {
    alert(`Aucun media ne correspond à l'id ${id}`)
    return
  }
  displaymediasData(selectedMedias)
}

recupererMediasPhotographe()

