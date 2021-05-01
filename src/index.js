const formElement = document.querySelector("form");

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((json) =>
    json.forEach((toy) => {
      createCard(toy);
    })
  )
  .catch(alert);

function createCard(toy) {
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
  likeButton.onclick = handleLikeButton;

  card.classList.add("card");
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeButton);

  card.data = toy;
  card.data.likes;

  document.getElementById("toy-collection").appendChild(card);
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  handleCreateNewToy(formElement);
});

function handleCreateNewToy(formElement) {
  const formData = new FormData(formElement);
  const newToy = {
    name: formData.get("name"),
    image: formData.get("image"),
    likes: 0,
  };
  createCard(newToy);
  addToyToAPI(newToy);
}

function addToyToAPI(toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy),
  });
}

function handleLikeButton() {
  const data = this.parentElement.data;
  data.likes += 1;
  updateLikeDisplay(data.likes, this.previousSibling);
  addLikeToAPI(data);

  function addLikeToAPI(data) {
    fetch("http://localhost:3000/toys/" + data.id, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function updateLikeDisplay(likes, element) {
    element.innerHTML = likes + " Likes";
  }

  //--------------------------------

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
}
