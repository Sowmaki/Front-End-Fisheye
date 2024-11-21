import { getAllPhotographers } from "../datas/data.js";
import { getPhotographerPrice } from "../pages/photographer.js";
import { isClickable } from "../utils/clickables.js";
import { displayLightbox } from "../utils/lightbox.js";
import { sortMedias } from "../utils/selector.js";


function photographerMediasTemplate(data) {

  //Crée les éléments du DOM nécessaires à la liste de medias du photographe
  function createUserMediasDOM() {

    const divMedias = document.createElement("section");
    divMedias.className = "medias";

    /*****************************************************MEDIAS */

    const mediasList = document.createElement("ul")
    mediasList.className = "medias-list";
    divMedias.appendChild(mediasList);
    //on crée une variable qui compte le nombre de medias de videos pour les numéroter si il y en a plusieurs
    let numMedia = 0;
    let numVideo = 0;

    // Crée les éléments DOM pour chaque media
    data.forEach((media, index) => {
      numMedia++

      const mediaItem = document.createElement("li");
      mediaItem.className = "item";

      const mediaLink = document.createElement("a")
      mediaLink.className = "item__link"
      mediaLink.setAttribute("href", "#")
      mediaLink.addEventListener('click', (event) => {
        event.preventDefault();
        displayLightbox(index); // Passe l'index du média cliqué à la lightbox
      });
      isClickable(mediaLink)

      const mediaTitle = document.createElement("p");
      mediaTitle.textContent = media.title;
      mediaTitle.id = `item${numMedia}-title`;
      mediaTitle.classList.add("item__title")

      const itemBottom = document.createElement("div");
      itemBottom.className = "item__bottom";

      const likesDiv = document.createElement('div')
      likesDiv.classList.add('item__likesDiv')

      const likeIcon = document.createElement('span')
      likeIcon.classList.add('fa-solid', 'fa-heart')
      likeIcon.setAttribute('aria-label', 'Cliquez pour augmenter le nombre de likes.')
      likeIcon.setAttribute('role', 'button')
      likeIcon.tabIndex = 0
      incrementLikes()

      const likes = document.createElement('span')
      likes.classList.add('item__likes')
      likes.textContent = `${media.likes}`
      likes.setAttribute('aria-live', 'polite')

      likesDiv.appendChild(likes)
      likesDiv.appendChild(likeIcon)
      // Fonction qui augmente le nombre de likes du media ET le nombre de likes total quand on clique sur l'icone
      function incrementLikes() {
        likeIcon.addEventListener('click', (event) => {
          event.preventDefault()
          media.likes++
          likes.textContent = `${media.likes}`
          likesSum++
          likesSpan.textContent = `${likesSum}`
        })
        isClickable(likeIcon)
      }

      itemBottom.appendChild(mediaTitle)
      itemBottom.appendChild(likesDiv)

      if (media.image) {
        const mediaImg = document.createElement("img");
        mediaImg.classList.add("item__media")
        mediaImg.src = `assets/photographers_medias/${media.photographerId}/${media.image}`
        mediaImg.setAttribute('aria-labelledby', `item${numMedia}-title`);
        mediaItem.appendChild(mediaLink);
        mediaLink.appendChild(mediaImg);
      } else if (media.video) {
        numVideo++

        const mediaVideo = document.createElement("video");
        mediaVideo.setAttribute("aria-labeledby", `item${numMedia}-title`)
        mediaVideo.classList.add("item__media")
        mediaVideo.src = `assets/photographers_medias/${media.photographerId}/${media.video}`;
        mediaItem.appendChild(mediaLink);
        mediaLink.appendChild(mediaVideo);

        mediaVideo.addEventListener('click', (event) => event.preventDefault())
      }

      mediasList.appendChild(mediaItem);
      mediaItem.appendChild(itemBottom);
    });

    divMedias.appendChild(mediasList);

    sortMedias(data)// Lance possibilité de trier les media une fois qu'ils sont tous dans le DOM

    //**********************************************************  Encart 
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

    // Affiche le prix du photographe dans l'encart après l'avoir récupéré
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

  return { createUserMediasDOM };

}

// Affiche les medias et leurs données après les avoir créé 
export async function displaymediasData(medias) {
  const main = document.querySelector("main"); //recupere l'endroit ou vont etre affichés les medias
  // supprime l'element medias du main s'il existe deja
  main.querySelector(".medias")?.remove()
  // Variable contenant un modèle de liste de medias 
  const photographerMediasModel = photographerMediasTemplate(medias);
  // Variable contenant une liste créée à partir du modèle, prête à être intégrée dans la page
  const userMediasDOM = photographerMediasModel.createUserMediasDOM();
  main.appendChild(userMediasDOM);
}

async function getMediasbyPhotographer(id) {
  // récupère l'id du photoraphe dans l'URL
  const photographerID = parseInt(new URLSearchParams(location.search).get("id"))
  // stocke l'objet récupéré par getAllPhotographers dans une variable
  const result = await getAllPhotographers();
  // stocke tout ce que contient la clé média de cet objet dans une variable
  const photographerMedias = result.media
  // stocke uniquement les éléments du tableau dont l'id photographe est conforme
  const selectedMedias = photographerMedias.filter(element => element.photographerId === photographerID)

  if (!selectedMedias) {
    alert(`Aucun media ne correspond à l'id ${id}`)
    return
  }
  // Appel de la fonction permettant d'afficher les éléments récupérés avec le bon pattern.
  displaymediasData(selectedMedias)
}

getMediasbyPhotographer()

