export function sortMedias() {
  const sortOptions = document.getElementById("sort-options");

  sortOptions.addEventListener('change', (event) => {
    if (event.target.value === "popularity") {
      mediasData.sort((a, b) => b.likes - a.likes)

      displaymediasData(mediasData)
    } else { console.log("pa sd event") }
  })
}