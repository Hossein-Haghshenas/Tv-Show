/* create menu burger toggle */

const burgerBtn = document.getElementById("menu-burger-icon");
const burgerMenu = document.getElementById("menu-burger");

burgerBtn.addEventListener("click", function () {
  burgerMenu.classList.toggle("d-none");
  this.firstElementChild.classList.toggle("text-red");
});

console.log(burgerBtn);
