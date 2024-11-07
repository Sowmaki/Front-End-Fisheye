function sortMedias() {
  const sortOptions = document.getElementById("sort-options")
  console.log(sortOptions);


  sortOptions.addEventListener('change', (event) => {
    if (event.target.value === "popularity") {
      console.log("Option 'pop' has been selected!");
    } else { console.log("pasd event") }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  sortMedias();
});
