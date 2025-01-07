export default class Salon {
  constructor(salon) {
    this.id = salon.id;
    this.name = salon.name;
    this.about = salon.about;
    this.address = salon.address;
    this.rating = salon.rating;
    this.images = salon.images;
    this.services = salon.services;
    this.hours = salon.hours;
    this.employees = salon.employees;
    this.attachShadow({ mode: "open" });
  }

  render() {
    return `  <a href="serviceProfile.html?id=${this.id}">
          <article class="articleSalon">
              <img src="../assets/${this.images}" alt="" class="salonImage">
              <div class="articleDescription">
                  <div class="salonName">${this.name}</div>
                  <div class="salonRating">${this.rating}</div>
                  <div class="salonAddress">${this.address}</div>
              </div>
          </article>
      </a>`;
  }
  renderDetail() {
    return ` <h2>${this.name}</h2>
            <div class="salonAddress">${this.address}</div>
            <div class="mainImageContainer">
                <video controls width="800" class="salonVideo">
                    <source src="video.mp4" type="video/mp4">
                </video>
                <img src="../assets/${this.images}" alt="salonImageTop" class="salonImageTop">
                <img src="../assets/${this.images}.jpg" alt="salonImageBottom" class="salonImageBottom">
            </div>`;
  }
  getAbout() {
    return `<h2>Бидний тухай</h2><span>${this.about}</span>`;
  }

  getServices() {
    return this.services;
  }

  getEmployees() {
    return this.employees;
  }
}

customElements.define("salon-component", Salon);
