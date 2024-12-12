fetch("https://dummyjson.com/c/f92e-cea1-45fa-9fb4")
  .then((response) => {
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    displaySalons(data.salons);
  })
  .catch((error) => {
    console.error("There was an error:", error);
  });

const displaySalons = (data) => {
  const containerSuggested = document.getElementById("suggestedSection");
  const containerSuggestedArticle =
    containerSuggested.querySelector(".articlesContainer");
  const containerTopRated = document.getElementById("topRatedSection");
  const containerTopRatedArticle =
    containerTopRated.querySelector(".articlesContainer");

  containerSuggestedArticle.innerHTML = "";

  data.forEach((salon) => {
    const articleHTML = `
    <a href="serviceProfile.html?id=${salon.id}">
        <article class="articleSalon">
            <img src="../assets/${salon.images[0]}" alt="img" class="salonImage">
            <div class="articleDescription">
                <div class="salonName">${salon.name}</div>
                <div class="salonRating">${salon.rating}</div>
                <div class="salonAddress">${salon.address}</div>
            </div>
        </article>
    </a>`;

    containerSuggestedArticle.innerHTML += articleHTML;
    containerTopRatedArticle.innerHTML += articleHTML;
  });
};

fetch("https://dummyjson.com/c/4673-bbad-482c-90fd")
  .then((response) => {
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    displayComments(data.comments);
  })
  .catch((error) => {
    console.error("There was an error:", error);
  });

const displayComments = (data) => {
  const commentContainer = document.getElementById("commentsSection");
  const commentContainerArticle =
    commentContainer.querySelector(".articlesContainer");

  commentContainerArticle.innerHTML = "";

  data.forEach((comment) => {
    const articleHTML = `
         <div>
            <article class="commentArticle">
                <div class="topSection"> 
                    <img src="..${comment.profileImage}" alt="salon" class="profileImage">
                    <div class="profileName">${comment.user}</div>
                </div>
                <div class="comments">${comment.content}</div>
               
            </article>
        </div>`;
    commentContainerArticle.innerHTML += articleHTML;
  });
};

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    const address = document.getElementById("locationInput").value;
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;

    const queryParams = new URLSearchParams({
        name: name,
        address: address,
        date: date,
        time: time
    });
    window.location.href = `salons.html?${queryParams.toString()}`;
}, true);
