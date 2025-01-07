import Salon from "../js/salon.js";
import Data from "../js/data.js";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const data = new Data("https://dummyjson.com/c/e293-1cc5-45e3-bf61");
await data.refreshData();
console.log(id);
const salonData = data.getSalonDataById(id);
console.log(salonData);

const salon = new Salon(salonData);

const mainHTML = salon.renderDetail();
const mainSection = document.getElementById("mainSection");
mainSection.innerHTML = mainHTML;

const aboutHTML = salon.getAbout();
const aboutSection = document.getElementById("aboutUsParagraph");
aboutSection.innerHTML = aboutHTML;

const employees = salon.getEmployees();
let employeesHTML = "";
employees.forEach((employee) => {
  const employeeHTML = `
     <article class="employeeProfile">
                    <img src="../${employee.image}" alt="employee" class="employeeImage">
                    <div class="employeeName">${employee.name}</div>  
                    <div class="profession">${employee.position}</div>
                    <div class="experience">${employee.experience}</div>
                </article>
  `;
  employeesHTML += employeeHTML;
});
const employeesSection = document.getElementById("employees");
employeesSection.innerHTML = employeesHTML;

const services = salon.getServices();
let selectedServices = services;
let servicesHTML = "";

selectedServices.forEach((service) => {
  const serviceHTML = ` <div class="servicesProfile" id="servicesProfile">
                  <h3>${service.name}</h3>
                  <div class="serviceDuration">${service.duration} Mинут</div>
                  <div class="servicesPrice">${service.price} MNT</div>
                  <button class="bookingButton" id=${service.id}>Захиалах</button>
              </div>`;
  servicesHTML += serviceHTML;
});

const servicesSection = document.getElementById("servicesContainer");
servicesSection.innerHTML = servicesHTML;

const serviceButtons = document.querySelectorAll(".serviceButton");
serviceButtons.forEach((serviceButton) => {
  serviceButton.addEventListener("click", () => {
    filterServices(serviceButton.textContent);
  });
});

const filterServices = (serviceName) => {
  selectedServices = services.filter((service) => service.name === serviceName);

  let filteredHTML = "";
  selectedServices.forEach((service) => {
    filteredHTML += `
      <div class="servicesProfile" id="servicesProfile">
        <h3>${service.name}</h3>
        <div class="serviceDuration">${service.duration} Mинут</div>
        <div class="servicesPrice">${service.price} MNT</div>
        <button class="bookingButton" id=${service.id}>Захиалах</button>
      </div>`;
  });

  servicesSection.innerHTML = filteredHTML;
};

const showAllButton = document.querySelector(".showAllButton");
if (showAllButton) {
  showAllButton.addEventListener("click", () => {
    selectedServices = services;
    servicesSection.innerHTML = servicesHTML;
  });
}

const bookingButton = document.querySelectorAll(".bookingButton");
bookingButton.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.id, salon, selectedServices);
    window.location.href =
      "booking.html?serviceId=" + button.id + "&salon=" + salon.id;
  });
});
