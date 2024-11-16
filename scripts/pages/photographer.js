import { getPhotographers } from "../data.js";
import { photographerTemplate } from "../templates/photographer.js";

// Lorsqu'on arrive sur la page photographer.html, on recupère le paramètre id grace à la fonction URLSearchParams
const id = parseInt(new URLSearchParams(location.search).get("id"))

//On crée une fonction qui va récupérer le bon photographe dans le tableau du fichier .json

async function recupererPhotographe() {

  // Si l'objet retourné par getPhotographers() contient une propriété photographers, 
  // celle-ci est directement assignée à une variable photographers accessible dans le code 
  const { photographers } = await getPhotographers();

  //On parcourt le tableau photographers pour y TROUVER le photographe dont l'id est le même que notre variable id.
  const selectedPhotograph = photographers.find(photograph => photograph.id === id)

  // On stoppe la fonction si le bon photographe n'est pas retrouvé et on lance une alerte pour l'utilisateur.
  if (!selectedPhotograph) {
    alert(`Aucun photographe ne correspond à l'id ${id}`)
    return
  }
  // Si le bon photographe est retrouvé, on lance la fonction qui permet d'afficher ses datas.
  displayProfileData(selectedPhotograph)
}

export async function getPhotographerPrice(phtotgrapherId) {
  const photographerId = parseInt(new URLSearchParams(location.search).get("id"))
  const { photographers } = await getPhotographers();
  const selectedPhotograph = photographers.find(photograph => photograph.id === photographerId)

  if (!selectedPhotograph) {
    alert(`Aucun photographe ne correspond à l'id ${photographerId}`)
    return
  }

  // Si le bon photographe est retrouvé, on lance la fonction qui permet d'afficher ses datas.
  return selectedPhotograph.price
}
getPhotographerPrice()



const displayProfileData = (photographer) => {
  //On recupère l'endroit précis où on veut afficher nos datas
  const photographerMain = document.getElementById("main");

  //On crée un photographerModel en appelant la fonction qui récupère les datas des photographes
  const photographerModel = photographerTemplate(photographer);

  //On applique a ce photographerModel la fonction qui crée un profil à partir des données
  const userProfileDOM = photographerModel.createUserProfileDOM();

  //On envoie ce profil dans la section photograph-header
  photographerMain.prepend(userProfileDOM);
}

recupererPhotographe()


