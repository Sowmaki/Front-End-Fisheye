
function photographerFactoryTemplate(factoryData) {
  const { title, file, description, likes, type } = factoryData;


  function getUserFactoryDOM() {

    const divFactory = document.createElement("section");
    divFactory.className = "factory";

    /*****************************************************DivTri */
    const divTri = document.createElement("div");
    divTri.className = "sort"
    divTri.innerHTML =
      `<label for="sort__options">Trier par :</label>
    <select id="sort-options" class="sort__selector" aria-label="Options de tri">
      <option id="popularity-option" value="popularity">Popularité</option>
      <option id="date-option" value="date">Date</option>
      <option id="title-option" value="title">Titre</option>
    </select>`

    /*****************************************************Factory */

    const mediasList = document.createElement("ul")
    mediasList.className = "medias-list";

    divFactory.appendChild(mediasList);

    // Pour chaque élément (photo) du tableau, on crée un élément li contenant les "articles" et on l'ajoute à la liste ul qui contient ceci

    factoryData.forEach(media => {
      //on crée une variable qui compte le nombre de video pour les numéroter si il y en a plusieurs
      let nbVideo = 0

      const mediaItem = document.createElement("li");
      mediaItem.className = "item";

      const mediaLink = document.createElement("a")
      mediaLink.className = "item-link"
      mediaLink.setAttribute("href", "#")

      const mediaTitle = document.createElement("h2");
      mediaTitle.textContent = media.title;
      mediaTitle.id = "item-title";
      mediaTitle.classList.add("item__title")

      const itemBottom = document.createElement("div");
      itemBottom.className = "item__bottom";

      const itemLikes = document.createElement("span");
      itemLikes.className = "item__spanlikes";
      itemLikes.innerHTML = `${media.likes} <i class="fa-solid fa-heart" aria-label="likes"></i>`

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
        //on incrémente nbVideo
        nbVideo++

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
      }

      mediasList.appendChild(mediaItem);
      mediaItem.appendChild(itemBottom);

    });
    divFactory.appendChild(divTri);
    divFactory.appendChild(mediasList);


    return divFactory;
  };

  return { title, file, description, likes, type, getUserFactoryDOM };


}

async function displayFactoryData(factory) {
  const factorySection = document.querySelector(".main-container");
  const photographerFactoryModel = photographerFactoryTemplate(factory);
  const userFactoryDOM = photographerFactoryModel.getUserFactoryDOM();
  factorySection.appendChild(userFactoryDOM);
  ;
}

async function recupererFactoryPhotographe(id) {
  const photographerID = parseInt(new URLSearchParams(location.search).get("id"))

  const result = await getPhotographersFactory();

  const photographersFactory = result

  //On parcourt le tableau d'IDs pour y TROUVER le ID , identique a  notre variable id.

  // const selectedFactory = photographersFactory[id]

  const selectedFactory = photographersFactory[photographerID]

  // On stoppe la fonction si le bon photographe n'est pas retrouvé et on lance une alerte pour l'utilisateur.
  if (!selectedFactory) {
    alert(`Aucune factory ne correspond à l'id ${id}`)
    return
  }
  // Si le bon photographe est retrouvé, on lance la fonction qui permet d'afficher ses datas.
  displayFactoryData(selectedFactory)
}

recupererFactoryPhotographe()







//
// // Element li
// // <li class="medias__element">
// //   <a href="">
// //     <div className="infos">
// //       <h3></h3>
// //       <p><span></span></p>
// //     </div>
// //     <img src="" alt="" />

// //   </a>
// // </li>



// //***************************************************FactoryMedia
// factorySection = document.createElement("section");
// factorySection.className = "factory";
// // div Tri
// const content =
// <div class="divTri">
//   `<label for="sort__options">Trier par :</label>
//       <select id="sort__options" class="sort__selector" aria-label="Options de tri">
//           <option value="popularity">Popularité</option>
//           <option value="date">Date</option>
//           <option value="title">Titre</option>
//       </select>`
//</div>

// divTri = document.createElement("div");
// divTri.className = "sort__container";
// divTri.innerHTML = content;

// const divMedia = document.createElement("div");
// divMedia.className = "medias-container";

// const mediaList = document.createElement("ul")
// mediaList.className = "medias-list";

// //On récupère le tableau des photos du photographe dont l'id est sélectionné.
// 







