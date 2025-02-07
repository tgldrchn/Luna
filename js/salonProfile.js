import "./salon.js";
import Data from "./data.js";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const data = new Data("https://dummyjson.com/c/e293-1cc5-45e3-bf61");
await data.refreshData();

const salonData = data.getSalonDataById(id);

// LocalStorage-д салон өгөгдлийг хадгалах
localStorage.setItem("salonData", JSON.stringify(salonData));

// salon component руу дамжуулах
const salon = document.querySelector("salon-component");

// Бид salonData-ыг JSON мөр болгон дамжуулж байна
salon.setAttribute("salon", JSON.stringify(salonData));

// About мэдээллийг авах
const aboutHTML = salon.getAbout();
const aboutSection = document.getElementById("aboutUsParagraph");
aboutSection.innerHTML = aboutHTML;

// Ажилчдын мэдээллийг авах
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

// Үйлчилгээний жагсаалт
const services = salon.getServices();

// ServiceList component руу үйлчилгээнүүдийг дамжуулах
const serviceListComponent = document.querySelector("service-list");
serviceListComponent.setAttribute("services", JSON.stringify(services));

// Үйлчилгээнүүдийн төрлөөр фильтер хийх
const serviceButtons = document.querySelectorAll(".serviceButton");
serviceButtons.forEach((serviceButton) => {
  serviceButton.addEventListener("click", () => {
    serviceListComponent.setType(serviceButton.textContent);
  });
});

// "Бүх үйлчилгээ" товчийг дарахад бүх үйлчилгээг үзүүлэх
const showAllButton = document.querySelector(".showAllButton");
showAllButton.addEventListener("click", () => {
  serviceListComponent.setType("all");
});
