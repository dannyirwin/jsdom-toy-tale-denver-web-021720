
fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => json.forEach(toy => {
    createCard(toy);
  }));



function createCard(toy) {
  console.log(toy);
  const card = document.createElement("div");
  const name = document.createElement("h2");
  const image = document.createElement("img");
  const likes = document.createElement("p");
  const likeButton = document.createElement("button");

  name.textContent = toy.name;
  image.src = toy.image;
  image.classList.add("toy-avatar");
  likes.textContent = `${toy.likes} Likes`;
  likeButton.textContent = "Like";
  likeButton.classList.add("like-btn");

  card.classList.add("card");
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeButton);

  document.getElementById("toy-collection").appendChild(card);
}

function addNewToy(toy) {

}



//---------------

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
