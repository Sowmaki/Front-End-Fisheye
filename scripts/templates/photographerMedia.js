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

    //on crée une variable qui compte le nombre de video pour les numéroter si il y en a plusieurs
    let numMedia = 0;
    let numVideo = 0;
    // Pour chaque élément (photo) du tableau, on crée un élément li contenant les "articles" et on l'ajoute à la liste ul qui contient ceci
    mediasData.forEach((media, index) => {
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
      mediaLink.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.key === "Space" || event.key === " ") {
          event.preventDefault()
          mediaLink.click()
        }
      })


      const mediaTitle = document.createElement("h2");
      mediaTitle.textContent = media.title;
      mediaTitle.id = `item${numMedia}-title`;
      mediaTitle.classList.add("item__title")

      const itemBottom = document.createElement("div");
      itemBottom.className = "item__bottom";

      const itemLikes = document.createElement('div')
      itemLikes.classList.add('item__likesDiv')
      const itemIcon = document.createElement('i')
      itemIcon.classList.add('fa-solid', 'fa-heart')
      itemIcon.setAttribute('aria-label', 'Likes')
      const likes = document.createElement('span')
      likes.classList.add('item__likes')
      likes.textContent = `${media.likes}`

      itemLikes.appendChild(likes)
      itemLikes.appendChild(itemIcon)


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

        numVideo++  //incrémente numVideo

        //on crée un span de description pour la video
        const spanDescription = document.createElement("span");
        spanDescription.id = `description${numVideo}`;
        spanDescription.className = "item__description";
        spanDescription.textContent = `${media.description}`

        const mediaVideo = document.createElement("video");
        mediaVideo.setAttribute("aria-describedby", `description${numVideo}`)
        mediaVideo.setAttribute("aria-labeledby", `item${numMedia}-title`)
        mediaVideo.classList.add("item__media")
        mediaVideo.src = media.file;
        // mediaVideo.controls = true; // Ajoute les contrôles de lecture de la vidéo
        mediaItem.appendChild(mediaLink);
        mediaLink.appendChild(mediaVideo);
        mediaLink.appendChild(spanDescription);

        mediaVideo.addEventListener('click', (event) => event.preventDefault())
      }

      mediasList.appendChild(mediaItem);
      mediaItem.appendChild(itemBottom);

      //***************************************************Encart 



      // const price = document.createElement("p");
      // encart.appendChild(price);

    });

    divMedias.appendChild(mediasList);

    const likesList = mediasList.querySelectorAll('.item__likes')

    let likesSum = 0

    likesList.forEach(element => {
      const elementContent = element.innerText
      const numberLikes = parseInt(elementContent)
      likesSum += numberLikes

    })
    console.log(likesSum);

    const likesSpan = document.createElement('span')
    likesSpan.classList.add('encart__likes')
    likesSpan.textContent = `${likesSum}`

    sortMedias()

    return divMedias;


  };




  return { title, file, description, likes, type, getUserMediasDOM };

}

async function displaymediasData(medias) {
  const main = document.querySelector("main"); //recupere l'endroit ou vont etre affichés les medias
  const likesDiv = document.querySelector('.encart__likesDiv')

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

