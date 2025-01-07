import Salon from "./salon.js";
import Data from "./data.js";

class Booking extends HTMLElement {
  constructor(salon, services) {
    // super();
    // this.salon = salon;
    // this.innerHTML = ` <aside class="aside" id="basket">
    //         <div class="bookingImgContainer" id="bookingImgContainer">
    //         <img src="" alt="">
    //             <div class="information">
    //                 <div class="classTitle">${this.salon.name}</div>
    //                 <div class="address">${this.salon.address}</div>
    //             </div>
    //         </>
    //         </div>
    //         <div class="selectedServices">
    //             <div class="lists" id="lists">
    //             </div>
    //         </div>
    //         <button class="continueButton" id="continueButton">Үргэлжлүүлэх</button>
    //     </aside>`;

    super();
    this.attachShadow({ mode: "open" });
    this.services = services;
    this.salon = salon;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  set salonData(data) {
    this._salonData = data;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
     <aside class="aside" id="basket">
        <div class="bookingImgContainer">
            <div class="information">
              <div class="classTitle">${this._salonData.name}</div>
              <div class="address">${this._salonData.address}</div>
            </div>
        <div class="selectedServices">
          <div class="lists" id="lists">
            ${this.renderSelectedServices()}
            ${this.renderTotalPrice()}
          </div>
        </div>
        
        <button class="continueButton" id="continueButton">Үргэлжлүүлэх</button>
      </aside>
    `;
  }

  addService(service) {
    this.services.push(service);
    this.render();
  }

  setupEventListeners() {
    this.shadowRoot
      .querySelector("#continueButton")
      .addEventListener("click", () => {
        const bookingData = {
          salon: this._salonData,
          services: this.services,
        };
        localStorage.setItem("booking", JSON.stringify(bookingData));
        window.location.href = `./selectProfessional.html?salon=${this._salonData.id}`;
      });
  }

  renderSelectedServices() {
    let listsHTML = "";
    this.services.forEach((service) => {
      const listHTML = `<li>
      <div class="serviceList">
          <div class="priceInfo">
              <span class="serviveType">${service.name}</span>
              <span class="price">${service.price}</span>
          </div>
          <div class="duration">${service.duration}</div>
      </div>
  </li>`;
      listsHTML += listHTML;
    });
    return listsHTML;
  }
  renderTotalPrice() {
    let totalPrice = 0;
    this.services.forEach((service) => {
      totalPrice += service.price;
    });
    return `
    <hr>
    <li>
    <div class="serviceList">
        <div class="priceInfo">
            <span class="serviveType">Нийт</span>
            <span class="price">${totalPrice}</span>
        </div>
    </div>
</li>`;
  }

  addService(service) {
    this.services.push(service);
  }
}

window.customElements.define("booking-component", Booking);

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const salonId = params.get("salon");
const serviceId = params.get("serviceId");

const data = new Data("https://dummyjson.com/c/e293-1cc5-45e3-bf61");
await data.refreshData();
const salonData = data.getSalonDataById(salonId);

const salon = new Salon(salonData);
const services = salon.getServices();

let selectedServices = services.filter((service) => service.id == serviceId);
let remainedServices = services.filter((service) => service.id != serviceId);

const booking = new Booking(salon, selectedServices);
const bookingImgContainer = document.getElementById("bookingImgContainer");
bookingImgContainer.innerHTML = booking.renderSalon();

const lists = document.getElementById("lists");
lists.innerHTML = booking.renderSelectedServices();
const totalPrice = booking.renderTotalPrice();
lists.insertAdjacentHTML("beforeend", totalPrice);

const renderRemainedServices = (services) => {
  const servicesContainer = document.getElementById("articlesContainer");
  let servicesHTML = "";
  services.forEach((service) => {
    const serviceHTML = ` <div class="servicesProfile" id="servicesProfile">
                  <h3>${service.name}</h3>
                  <div class="serviceDuration">${service.duration} Mинут</div>
                  <div class="servicesPrice">${service.price} MNT</div>
                  <button class="buttonAdd" id=${service.id}>Нэмэх</button>
              </div>`;
    servicesHTML += serviceHTML;
  });
  servicesContainer.innerHTML = servicesHTML;
};

renderRemainedServices(remainedServices);

const buttons = document.querySelectorAll(".buttonAdd");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const serviceId = button.id;
    const selectedService = services.find((service) => service.id == serviceId);
    remainedServices = remainedServices.filter(
      (service) => service.id != serviceId
    );
    booking.addService(selectedService);

    renderRemainedServices(remainedServices);
    lists.innerHTML = booking.renderSelectedServices();
    const totalPrice = booking.renderTotalPrice();
    lists.insertAdjacentHTML("beforeend", totalPrice);
  });
});

const continueButton = document.getElementById("continueButton");
continueButton.addEventListener("click", () => {
  localStorage.setItem("booking", JSON.stringify(booking));
  window.location.href = `./selectProfessional.html?salon=${salonId}`;
});
