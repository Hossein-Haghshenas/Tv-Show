/* create menu burger toggle */

const burgerBtn = document.getElementById("menu-burger-icon");
const burgerMenu = document.getElementById("menu-burger");

burgerBtn.addEventListener("click", function () {
  burgerMenu.classList.toggle("d-none");
  this.firstElementChild.classList.toggle("text-red");
});

/* get information from serve */

const apiUrl = "https://api.tvmaze.com/shows/82/episodes";

const getData = async () => {
  try {
    const data = await axios.get(apiUrl);
    let information = data.data;

    selectOption(information);
    addCart(information);
  } catch (error) {
    console.log(error);
  }
};

getData();

/* set options & optionValues for selectOption */

const selectOption = (data) => {
  const select = document.querySelector("#episode-select");
  for (const item of data) {
    const newOption = document.createElement("option");

    newOption.setAttribute("value", item.id);

    const season = item.season < 10 ? `0${item.season}` : `${item.season}`;
    const number = item.number < 10 ? `0${item.number}` : `${item.number}`;

    newOption.textContent = `S${season}E${number} - ${item.name}`;

    select.append(newOption);
  }
};

/* Create cards */

const addCart = (data) => {
  const cardsContainer = document.querySelector(".episode-cards-container");
  for (const item of data) {
    const newCard = document.createElement("section");
    newCard.className = "episode-card col-8 col-md-3 col-sm-6 mt-sm-0 my-3";

    const newCardImg = document.createElement("img");
    newCardImg.className = "card-img";
    newCardImg.setAttribute("src", item.image.medium);
    newCardImg.setAttribute("alt", item.name);
    newCard.append(newCardImg);
    cardsContainer.append(newCard);
  }
};

/* Create Watch-now btn  */
