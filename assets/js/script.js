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
    // create cards

    const newCard = document.createElement("section");
    newCard.className = "episode-card col-8 col-md-3 col-sm-6 mt-sm-0 my-3";

    // create & config cards title

    const newCardTitle = document.createElement("section");
    newCardTitle.className = "card-title";

    const cardTitleText = document.createElement("h5");
    cardTitleText.textContent = item.name;

    newCardTitle.appendChild(cardTitleText);

    // create & config cards info

    const newCardInfo = document.createElement("section");
    newCardInfo.className = "card-info position-relative";

    // create & config card info image

    const newCardImg = document.createElement("img");
    newCardImg.className = "card-img";
    newCardImg.setAttribute("src", item.image.medium);
    newCardImg.setAttribute("alt", item.name);

    // create & config card info footer

    const newCardFooter = document.createElement("section");
    newCardFooter.className = "card-footer";

    // create & config card info footer star section

    const cardFooterStar = document.createElement("section");
    cardFooterStar.className = "card-footer-star";

    const cardStarIcon = document.createElement("i");
    cardStarIcon.className = "fa fa-star text-warning";

    const cardStarText = document.createElement("span");
    cardStarText.textContent = ` ${item.rating.average}`;

    cardFooterStar.append(cardStarIcon, cardStarText);

    // create & config card info footer WatchNow section

    const cardFooterWatch = document.createElement("section");
    cardFooterWatch.className = "card-footer-watch";

    const cardWatchIcon = document.createElement("i");
    cardWatchIcon.className = "fa fa-play-circle";

    const cardWatchLink = document.createElement("a");
    cardWatchLink.textContent = " Watch now";
    cardWatchLink.setAttribute("href", item.url);

    cardFooterWatch.append(cardWatchIcon, cardWatchLink);

    // create & config card text section

    // append all sections
    newCardFooter.append(cardFooterStar, cardFooterWatch);
    newCardInfo.append(newCardImg, newCardFooter);
    newCard.append(newCardTitle, newCardInfo);
    cardsContainer.append(newCard);
  }
};

/* Create Watch-now btn  */
