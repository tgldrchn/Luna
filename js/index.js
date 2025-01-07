import Data from "./data.js";
import Comment from "./comments.js";
import Salon from "./salon.js";
import "./salonList.js";

const salonsData = new Data("https://dummyjson.com/c/e293-1cc5-45e3-bf61");
const commentsData = new Data("https://dummyjson.com/c/4673-bbad-482c-90fd");

const salons = await salonsData.refreshData();
const comments = await commentsData.refreshData();

console.log(salons.salons);

// const suggestedSection = document.getElementById("suggestedSection");
// const articlesContainer = suggestedSection.querySelector("#articlesContainer");
// let salonsHTML = "";
// salons.salons.forEach((salon) => {
//   const salonHTML = new Salon(salon).render();
//   salonsHTML += salonHTML;
// });
// articlesContainer.innerHTML = salonsHTML;

const salonList = document.querySelector("salon-list");
salonList.data = salons.salons;

// const topRatedSection = document.getElementById("topRatedSection");
// const topRatedContainer = topRatedSection.querySelector("#articlesContainer");
// let topRatedHTML = "";
// const ratedSalons = salons.salons.sort((a, b) => b.rating - a.rating);
// console.log(ratedSalons);
// ratedSalons.forEach((salon) => {
//   const salonHTML = new Salon(salon).render();
//   topRatedHTML += salonHTML;
// });
// topRatedContainer.innerHTML = topRatedHTML;

const commentsSection = document.getElementById("commentsSection");
const commentsContainer = commentsSection.querySelector("#articlesContainer");
let commentsHTML = "";
comments.comments.forEach((comment) => {
  const commentHTML = new Comment(comment).render();
  commentsHTML += commentHTML;
});
commentsContainer.innerHTML = commentsHTML;

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener(
  "click",
  () => {
    const name = document.getElementById("nameInput").value;
    const address = document.getElementById("locationInput").value;

    const queryParams = new URLSearchParams({
      name: name,
      address: address,
    });
    window.location.href = `salons.html?${queryParams.toString()}`;
  },
  true
);
