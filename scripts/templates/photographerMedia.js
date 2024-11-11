import { getPhotographersMedias } from "../data.js";
import { displayLightbox } from "../utils/lightbox.js";
import { sortMedias } from "../utils/sortMedias.js";

function photographerMediasTemplate(mediasData) {
  const { title, file, description, likes, type } = mediasData[0];

  function getUserMediasDOM() {

    const divMedias = document.createElement("section");
    divMedias.className = "medias";


    /*****************************************************MEDIAS */

    const mediasList = document.createElement("ul")
    mediasList.className = "medias-list";

    divMedias.appendChild(mediasList);

    // Pour chaque élément (photo) du tableau, on crée un élément li contenant les "articles" et on l'ajoute à la liste ul qui contient ceci

    mediasData.forEach(media => {
      //on crée une variable qui compte le nombre de video pour les numéroter si il y en a plusieurs
      let nbVideo = 0

      const mediaItem = document.createElement("li");
      mediaItem.className = "item";

      const mediaLink = document.createElement("a")
      mediaLink.className = "item-link"
      mediaLink.setAttribute("href", "#")
      mediaLink.addEventListener('click', () => {
        displayLightbox()
      })

      const mediaTitle = document.createElement("h2");
      mediaTitle.textContent = media.title;
      mediaTitle.id = "item-title";
      mediaTitle.classList.add("item__title")

      const itemBottom = document.createElement("div");
      itemBottom.className = "item__bottom";

      const itemLikes = document.createElement("p");
      itemLikes.className = "item__plikes";
      const likesNb = document.createElement("span");
      likesNb.content = media.likes;
      itemLikes.innerHTML = `${media.likes} '<i class="fa-solid fa-heart" aria-label="likes"></i>`

      itemBottom.appendChild(mediaTitle)
      itemBottom.appendChild(itemLikes)

      if (media.type === "image") {
        const mediaImg = document.createElement("img");
        mediaImg.classList.add("item__media")
        mediaImg.src = media.file;
        mediaImg.alt = media.description;
        mediaItem.appendChild(mediaLink);
        mediaLink.appendChild(mediaImg);
      } else if (media.type === "video") {

        nbVideo++  //incrémente nbVideo

        //on crée un span de description pour la video
        const spanDescription = document.createElement("span");
        spanDescription.id = `description${nbVideo}`;
        spanDescription.className = "item__description";
        spanDescription.textContent = `${media.description}`

        const mediaVideo = document.createElement("video");
        mediaVideo.setAttribute("aria-describedby", `description${nbVideo}`)
        mediaVideo.setAttribute("aria-labeledby", "item-title")
        mediaVideo.classList.add("item__media")
        mediaVideo.src = media.file;
        mediaVideo.controls = true; // Ajoute les contrôles de lecture de la vidéo
        mediaItem.appendChild(mediaLink);
        mediaLink.appendChild(mediaVideo);
        mediaLink.appendChild(spanDescription);

        // mediaVideo.addEventListener('click',(event)=>launchLightbox(mediaVideo))
      }

      mediasList.appendChild(mediaItem);
      mediaItem.appendChild(itemBottom);


      // function launchLightbox(media){

      // }

    });

    divMedias.appendChild(mediasList);

    sortMedias()

    return divMedias;
  };

  return { title, file, description, likes, type, getUserMediasDOM };

}

async function displaymediasData(medias) {
  const main = document.querySelector("main"); //recupere l'endroit ou vont etre affichés les medias

  // supprime l'element medias du main s'il existe deja
  main.querySelector(".medias")?.remove()

  const photographerMediasModel = photographerMediasTemplate(medias); //
  const userMediasDOM = photographerMediasModel.getUserMediasDOM();
  main.appendChild(userMediasDOM);
}

async function recupererMediasPhotographe(id) {
  const photographerID = parseInt(new URLSearchParams(location.search).get("id"))

  const result = await getPhotographersMedias();

  const photographersMedia = result

  //On parcourt le tableau d'IDs pour y TROUVER le ID , identique a  notre variable id.

  // const selectedMedias = photographersMedia[id]

  const selectedMedias = photographersMedia[photographerID]

  // On stoppe la fonction si le bon photographe n'est pas retrouvé et on lance une alerte pour l'utilisateur.
  if (!selectedMedias) {
    alert(`Aucun media ne correspond à l'id ${id}`)
    return
  }
  // Si le bon photographe est retrouvé, on lance la fonction qui permet d'afficher ses datas.
  displaymediasData(selectedMedias)
}

recupererMediasPhotographe()