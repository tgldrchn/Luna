fetch("https://dummyjson.com/c/f92e-cea1-45fa-9fb4")
  .then((response) => {
    if (!response.ok) {
      console.log(`status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    getDataById(data.salons);
  })
  .catch((error) => {
    console.error("There was an error:", error);
  });

const getDataById = (data) => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const salon = data.filter((salon) => salon.id == id);
  displaySalons(salon[0]);
  displayServices(salon[0].services);
};

const displaySalons = (data) => {
  const mainSection = document.getElementById("mainSection");

  const mainHTML = `  <h2>${data.name}</h2>
            <div class="salonAddress">${data.address}</div>
            <div class="mainImageContainer">
                <video controls width="800" class="salonVideo">
                    <source src="video.mp4" type="video/mp4">
                </video>
                <img src="../assets/${data.images[0]}" alt="salonImageTop" class="salonImageTop">
                <img src="../assets/${data.images[1]}" alt="salonImageBottom" class="salonImageBottom">
            </div>`;

  mainSection.innerHTML = mainHTML;
};

const displayServices = (services) => {
  const serviceContainer = document.getElementById("articlesContainer");

  services.forEach((service) => {
    const articleHTML = `
            <div class="servicesProfile" id="servicesProfile">
                <h3>${service.name}</h3>
                <div class="serviceDuration">${service.duration} Mинут</div>
                <div class="servicesPrice">${service.price} MNT</div>
                <button class="buttonBook" id=${service.id}>Захиалах</button>
            </div>`;

    serviceContainer.innerHTML += articleHTML;
  });

  const bookButtons = document.querySelectorAll(".buttonBook");
  bookButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const serviceId = event.target.id;
      const queryString = window.location.search;
      const queryParams = new URLSearchParams(queryString);
      queryParams.append("serviceId", serviceId);

      window.location.href = `booking.html?${queryParams.toString()}`;
    });
  });
};
