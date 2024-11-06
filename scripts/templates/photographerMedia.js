// function photographerMedia(data) {
//   const { id } = data;
//   const phtotographerId = `${id}`;

function getUserMediaDOM(photographerId, mediaData) {

  const mediaArray = mediaData[photographerId]; // Accéder aux médias avec l'ID du photographe
  if (!mediaArray) {
    console.warn(`Aucun média trouvé pour le photographe avec ID: ${photographerId}`);
    return;
  }

  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'media-container';

  mediaArray.forEach(media => {
    let mediaElement;
    if (media.type === "image") {
      mediaElement = document.createElement('img');
      mediaElement.src = media.file;
      mediaElement.alt = media.description;
      mediaElement.className = 'media-item';
    } else if (media.type === "video") {
      mediaElement = document.createElement('video');
      mediaElement.controls = true;
      mediaElement.className = 'media-item';

      const source = document.createElement('source');
      source.src = media.file;
      source.type = 'video/mp4';
      mediaElement.appendChild(source);
    }
  })


  //***************************************************FactoryMedia
  factoryMediaSection = document.createElement("section");
  factoryMediaSection.className = "factory-media";
  // div Tri
  const content =
    `<label for="sort__options">Trier par :</label>
        <select id="sort__options" class="sort__selector" aria-label="Options de tri">
            <option value="popularity">Popularité</option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
        </select>`

  divTri = document.createElement("div");
  divTri.className = "sort__container";
  divTri.innerHTML = content;

  const divMedia = document.createElement("div");
  divMedia.className = "medias-container";

  const mediaList = document.createElement("ul")
  mediaList.className = "medias-list";

  //On récupère le tableau des photos du photographe dont l'id est sélectionné.
  // Pour chaque élément (photo) du tableau, on crée un élément li contenant les "articles" et on l'ajoute à la liste ul.

  // Element li
  // <li class="medias__element">
  //   <a href="">
  //     <div className="infos">
  //       <h3></h3>
  //       <p><span></span></p>
  //     </div>
  //     <img src="" alt="" />

  //   </a>
  // </li>

  factoryMediaSection.appendChild(divTri);
}

mainContainer.appendChild(factoryMediaSection);

return (factoryMediaSection)

}


return { nom, photo, ville, slogan, prix, id, getUserMediaDOM }

