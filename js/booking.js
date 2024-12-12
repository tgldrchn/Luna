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
  const serviceId = params.get("serviceId");
  const salon = data.filter((salon) => salon.id == id);
  addService(salon[0], serviceId);
  displayServices(salon[0].services);
};

const displayServices = (services) => {
  const serviceContainer = document.getElementById("articlesContainer");
  selectedServices.forEach((service) => {
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

const addService = (salon, serviceId) => {
  const basket = document.getElementById("basket");
  const salonContainer = basket.querySelector(".bookingImgContainer");
  const serviceContainer = basket.querySelector(".selectedServices");
  const lists = serviceContainer.querySelector(".lists");
  console.log(salon);

  const salonHTML = `  <img src="../assets/${salon.images[0]}" alt="">
                <div class="information">
                    <div class="classTitle">${salon.name}</div>
                    <div class="address">${salon.address}</div>
                </div>
    `;
  salonContainer.innerHTML = salonHTML;

  var selectedServices = salon.services.filter(
    (service) => service.id == serviceId
  );

  selectedServices.forEach((service) => {
    const serviceHTML = `  <li>
    <div class="serviceList">
        <div class="priceInfo">
            <span class="serviveType">${service.name}</span>
            <span class="price">${service.price}</span>
        </div>
        <div class="duration">${service.duration}</div>
    </div>
</li>`;

    lists.innerHTML += serviceHTML;
  });

  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0
  );

  const totalPriceHTML = ` 
  <hr><li>
    <div class="serviceList">
        <div class="priceInfo">
            <span class="serviveType">Нийт</span>
            <span class="price">${totalPrice}</span>
        </div>
        <div class="duration"></div>
    </div>
</li>`;

  lists.innerHTML += totalPriceHTML;
};
