import Data from "./data.js";
import Comment from "./comments.js";

const salonsData = new Data("https://dummyjson.com/c/e293-1cc5-45e3-bf61");
const commentsData = new Data("https://dummyjson.com/c/4673-bbad-482c-90fd");

const salons = await salonsData.refreshData();
const comments = await commentsData.refreshData();

console.log(salons.salons);

const suggestedSalonList = document.querySelector(
  'salon-list[type="suggested"]'
);
suggestedSalonList.data = salons.salons;

const topRatedSalonList = document.querySelector('salon-list[type="topRated"]');
topRatedSalonList.data = salons.salons;

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
