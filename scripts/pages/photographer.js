import { getPhotographers } from "../data.js";
import { photographerTemplate } from "../templates/photographer.js";

// Recupère le paramètre id dans l'URL lde la page grace à la fonction URLSearchParams
const id = parseInt(new URLSearchParams(location.search).get("id"))

//Récupère le bon photographe dans le tableau du fichier .json
async function recupererPhotographe() {
  // Si l'objet retourné par getPhotographers() contient une propriété photographers, 
  // celle-ci est directement assignée à une variable photographers.
  const { photographers } = await getPhotographers();
  // Parcourt le tableau photographers pour y TROUVER le photographe dont l'id est le même que notre variable id.
  const selectedPhotograph = photographers.find(photograph => photograph.id === id)
  // Stoppe la fonction si le bon photographe n'est pas retrouvé et lance une alerte pour l'utilisateur.
  if (!selectedPhotograph) {
    alert(`Aucun photographe ne correspond à l'id ${id}`)
    return
  }
  // Si le bon photographe est retrouvé, on lance la fonction qui permet d'afficher ses datas de profil.
  displayProfileData(selectedPhotograph)
}

//Recupère le prix du photographe
export async function getPhotographerPrice(photographerId) {
  photographerId = parseInt(new URLSearchParams(location.search).get("id"))
  const { photographers } = await getPhotographers();
  const selectedPhotograph = photographers.find(photograph => photograph.id === photographerId)
  if (!selectedPhotograph) {
    alert(`Aucun photographe ne correspond à l'id ${photographerId}`)
    return
  }
  return selectedPhotograph.price
}
getPhotographerPrice()


const displayProfileData = (photographer) => {
  // Recupère l'endroit précis où on veut afficher nos datas de profil
  const photographerMain = document.getElementById("main");
  // Crée un photographerModel en appelant la fonction qui récupère les datas des photographes
  const photographerModel = photographerTemplate(photographer);
  // Applique a ce photographerModel la fonction qui crée un profil à partir des données
  const userProfileDOM = photographerModel.createUserProfileDOM();
  // Intègre ce profil dans la section photograph-header
  photographerMain.prepend(userProfileDOM);
}

recupererPhotographe()


