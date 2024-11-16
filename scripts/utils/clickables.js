export function isClickable(element) {
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === 'Space' || event.key === ' ') {
      event.preventDefault(); // Bloque les comportements par défaut (par ex. scroll pour Espace)
      event.stopPropagation(); // Empêche la propagation vers d'autres gestionnaires
      element.click(); // Simule un clic sur l'élément
    } else {
      // Ne rien faire pour les autres touches comme ArrowLeft, ArrowRight
      return;
    }
  });
}
