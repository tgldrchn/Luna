class Booking extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._services = [];
    this._salon = {};
  }

  connectedCallback() {
    this.render();
  }

  set salon(data) {
    this._salon = data || {};
    this.render();
  }

  set selectedServices(services) {
    this._services = services || [];
    this.render();
  }

  get salon() {
    return this._salon || {};
  }

  get selectedServices() {
    return this._services || [];
  }

  render() {
    this.shadowRoot.innerHTML = `
         <style>
     
aside {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  background-color: var(--article-background-color);
  width: 70%;
  height: 60%;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--white-bg-box-shadow);
  margin: 5rem;
}

.bookingImgContainer {
  display: flex;
  flex-direction: row;
}
.bookingImgContainer img {
  width: 50%;
  height: auto;
}
.servicesProfile {
  background-color: var(--article-background-color);
  box-shadow: var(--white-bg-box-shadow);
  width: 20%;
  height: auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-right: 2rem;
}
.buttonRemove,
.buttonAdd {
  background-color: var(--button-color);
  box-shadow: var(--white-bg-box-shadow);
  color: var(--text-color-secondary);
  width: 80%;
  height: 2rem;
  border: none;
  border-radius: 2rem;
  margin-top: 1rem;
}
.buttonAdd:hover {
  transform: scale(1.05);
}
.articlesContainer {
  display: flex;
  flex-direction: row;
}

.servicesProfile div {
  color: var(--text-color-muted);
  font-size: 0.8rem;
}
.information {
  padding-left: 1rem;
  height: 20vh;
}
.classTitle {
  font-size: var(--font-size-title);
  font-weight: var(--text-font-weight);
}
.address {
  font-size: 0.9rem;
  color: var(--text-color-muted);
}
.selectedServices {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.lists {
  width: 100%;
  list-style-type: none;
}
#servicesList{
  width: 100%
}
.serviceList {
  margin: 0.5rem;
  width: 100%
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.priceInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.priceInfo span {
  font-weight: var(--text-font-paragraph);
}
.continueButton {
  width: 80%;
  height: 3rem;
  border-radius: 2rem;
  background-color: var(--button-color);
}
.continueButton a {
  color: var(--text-color-secondary);
  text-decoration: none;
  border: none;
  font-weight: var(--text-font-weight);
  font-size: 1rem;
}
      </style>
    

      <aside id="basket">
        <div class="information">
          <div class="classTitle">${this.salon.name || "Салон"}</div>
          <div class="address">${this.salon.address || ""}</div>
        </div>

        <div class="selectedServices">
          <div id="servicesList">${this.renderSelectedServices()}</div>
          ${this.renderTotalPrice()}
        </div>

        <button class="continueButton" id="continueButton">Үргэлжлүүлэх</button>
      </aside>
    `;

    // Attach event listener after rendering
    this.setupEventListeners();
  }

  renderSelectedServices() {
    if (!this.selectedServices.length) {
      return `<li>Үйлчилгээ сонгоогүй байна.</li>`;
    }
    return this.selectedServices
      .map(
        (service, index) => `
          <div class="serviceList">
            <div class="priceInfo">
              <span class="serviceType">${service.name}</span>
              <span class="price">${service.price}₮</span>
            </div>
            <div class="duration">${service.duration} мин</div>
            <button class="removeService" data-index="${index}">X</button>
          </div>
        `
      )
      .join("");
  }

  renderTotalPrice() {
    const totalPrice = this.selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );
    return `
      <hr>
      <div class="serviceList">
        <div class="priceInfo">
          <span class="serviceType">Нийт</span>
          <span class="price">${totalPrice}₮</span>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const continueButton = this.shadowRoot.querySelector("#continueButton");

    if (continueButton) {
      continueButton.addEventListener("click", () => {
        const bookingData = {
          salon: this.salon,
          services: this.selectedServices,
        };
        localStorage.setItem("booking", JSON.stringify(bookingData));
        window.location.href = `./selectProfessional.html?salon=${this.salon.id}`;
      });
    }

    // Handle service removal
    this.shadowRoot.querySelectorAll(".removeService").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        this.selectedServices = this.selectedServices.filter(
          (_, i) => i != index
        );
      });
    });
  }

  addService(service) {
    this.selectedServices = [...this.selectedServices, service];
  }
}

customElements.define("booking-component", Booking);

// Load salon and service data from localStorage
const salonData = JSON.parse(localStorage.getItem("salonData")) || {};
const serviceData = JSON.parse(localStorage.getItem("serviceData")) || [];

const bookingComponent = document.querySelector("booking-component");
if (bookingComponent) {
  bookingComponent.salon = salonData;
  bookingComponent.selectedServices = serviceData;
}

const serviceListComponent = document.querySelector("service-list");
if (serviceListComponent) {
  serviceListComponent.setAttribute(
    "services",
    JSON.stringify(salonData.services || [])
  );
}
