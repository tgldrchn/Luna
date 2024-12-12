const filterData = (data) => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("name");
  const address = params.get("address");
  const date = params.get("date");


  console.log(address)

    const filteredSalons = data.filter(
      (salon) =>
      (  name != null && salon.name.toLowerCase().includes(name.toLowerCase()) ) && 
       ( address != null && salon.address.toLowerCase().includes(address.toLowerCase()))
    );
    displaySalons(filteredSalons);
};

fetch("https://dummyjson.com/c/f92e-cea1-45fa-9fb4")
  .then((response) => {
    if (!response.ok) {
      console.log(`status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    filterData(data.salons);
  })
  .catch((error) => {
    console.error("There was an error:", error);
  });

const displaySalons = (data) => {
  const salonsContainer = document.getElementById("salonsContainer");

  salonsContainer.innerHTML = "";

  data.forEach((salon) => {
    const articleHTML = `
      <a href="serviceProfile.html?id=${salon.id}">
          <article class="articleSalon">
              <img src="../assets/${salon.images[0]}" alt="" class="salonImage">
              <div class="articleDescription">
                  <div class="salonName">${salon.name}</div>
                  <div class="salonRating">${salon.rating}</div>
                  <div class="salonAddress">${salon.address}</div>
              </div>
          </article>
      </a>`;

    salonsContainer.innerHTML += articleHTML;
  });
};
