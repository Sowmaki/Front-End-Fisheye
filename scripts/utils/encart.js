//***************************************************Encart 
const mediasList = document.querySelector('.medias__list')
const likesList = mediasList.querySelectorAll('.item__likes')
console.log(likesList);

let likesSum = 0
likesList.forEach(element => {
  const elementContent = element.innerText
  const numberLikes = parseInt(elementContent)
  likesSum += numberLikes

  console.log(element);
})


const likesSpan = document.createElement('span')
likesSpan.classList.add('encart__likes')
likesSpan.textContent = `${likesSum}`

// const price = document.createElement("p");
// encart.appendChild(price);
