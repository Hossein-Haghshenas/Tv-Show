/* create menu burger toggle */

const burgerBtn = document.getElementById("menu-burger-icon");
const burgerMenu = document.getElementById("menu-burger");

burgerBtn.addEventListener("click", function () {
  burgerMenu.classList.toggle("d-none");
  this.firstElementChild.classList.toggle("text-red");
});

/* get information from server */

const apiUrl = "https://api.tvmaze.com/shows/82/episodes";

const getData = async () => {
  try {
    const information = await axios.get(apiUrl);
    const data = information.data;

    selectOption(data);
    addCart(data);
    filterWithSearch(data);
    filterWithSelectOption(data);
    episodCounter();
  } catch (error) {
    console.log(`Something went wrong ${error}`);
  }
};

getData();

/* set options & optionValues for selectOption */

const selectOption = (data) => {
  const select = document.querySelector("#episode-select");
  for (const item of data) {
    const newOption = document.createElement("option");

    newOption.setAttribute("value", item.id);

    newOption.textContent = `${addZero(item.season, item.number)} - ${
      item.name
    }`;

    select.append(newOption);
  }
};

/* Create & config cards & append into the conainer*/

const addCart = (data) => {
  const cardsContainer = document.querySelector(".episode-cards-container");
  for (const item of data) {
    // create cards

    const newCard = document.createElement("section");
    newCard.className = "episode-card col-8 col-md-3 col-sm-6 mt-sm-0 my-3";
    newCard.setAttribute("id", item.id);

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

    const newCardText = document.createElement("section");
    newCardText.className = "card-text";

    const cardTextSeason = document.createElement("span");

    cardTextSeason.textContent = `${addZero(item.season, item.number)}`;

    const cardTextSummery = document.createElement("span");

    cardTextSummery.innerHTML = item.summary;

    newCardText.append(cardTextSeason, cardTextSummery);

    // append all sections
    newCardFooter.append(cardFooterStar, cardFooterWatch);
    newCardInfo.append(newCardImg, newCardFooter);
    newCard.append(newCardTitle, newCardInfo, newCardText);
    cardsContainer.append(newCard);
  }
};

/* Create filter with Search-box  */

const filterWithSearch = (data) => {
  const episodeSearch = document.getElementById("episode-search");
  const cardsContainer = document.querySelectorAll(".card-title");

  episodeSearch.addEventListener("input", () => {
    for (const section of cardsContainer) {
      for (const h5 of section.children) {
        if (
          h5.textContent
            .toLowerCase()
            .includes(episodeSearch.value.toLowerCase())
        ) {
          h5.parentElement.parentElement.classList.remove("d-none");
        } else {
          section.parentElement.classList.add("d-none");
        }
        episodCounter();
      }
    }
  });
};

/* Create filter with SelectOption  */

const filterWithSelectOption = (data) => {
  const episodeSelectOption = document.getElementById("episode-select");
  const cardsContainer = document.querySelectorAll(".episode-card");

  episodeSelectOption.addEventListener("change", () => {
    for (const card of cardsContainer) {
      if (card.id === episodeSelectOption.value) {
        card.classList.remove("d-none");
      } else if (episodeSelectOption.value === "allEpisode") {
        card.classList.remove("d-none");
      } else {
        card.classList.add("d-none");
      }
    }
  });
};

/* Add Zero for seasons and episodes  */

const addZero = (seasonData, episodesData) => {
  const season = seasonData < 10 ? `0${seasonData}` : `${seasonData}`;
  const number = episodesData < 10 ? `0${episodesData}` : `${episodesData}`;

  return `S${season}E${number}`;
};

/* episodes counter */

const episodCounter = () => {
  const counterDisplay = document.getElementById("episod-counter-display");
  const allEpisodes = document.querySelector(
    ".episode-cards-container"
  ).childElementCount;
  const displayedEpisodes = document.querySelectorAll(".episode-card");

  const filtered = Array.from(displayedEpisodes).filter(
    (elem) => !elem.classList.contains("d-none")
  ).length;

  counterDisplay.textContent = `${filtered}/${allEpisodes} Episodes`;
};
