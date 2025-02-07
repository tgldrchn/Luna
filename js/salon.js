class Salon extends HTMLElement {
  constructor() {
    super();
    this.services = [{}];
    this.isDetail = false;
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["salon"]; // Salon атрибутыг хянаж байна
  }

  connectedCallback() {
    const salonData = JSON.parse(this.getAttribute("salon") || "{}");
    const isDetailValue = this.getAttribute("isDetail");

    this.id = salonData.id || "";
    this.name = salonData.name || "";
    this.about = salonData.about || "";
    this.address = salonData.address || "";
    this.rating = salonData.rating || "";
    this.images = salonData.images || "";
    this.services = salonData.services || [];
    this.hours = salonData.hours || "";
    this.employees = salonData.employees || [];
    this.isDetail = isDetailValue;

    if (this.isDetail) {
      this.renderDetail();
    } else {
      this.render();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (name === "salon" && newValue !== oldValue) {
      try {
        const salonData = JSON.parse(newValue); // Салон өгөгдлийг JSON-оор задалж авна
        this.id = salonData.id;
        this.name = salonData.name;
        this.about = salonData.about;
        this.address = salonData.address;
        this.rating = salonData.rating;
        this.images = salonData.images;
        this.services = salonData.services;
        this.hours = salonData.hours;
        this.employees = salonData.employees;

        if (this.getAttribute("isDetail")) {
          this.renderDetail();
        } else {
          this.render();
        }
      } catch (e) {
        console.error("Error parsing salon data:", e);
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        a {
          text-decoration: none;
          color: var(--text-color-primary);
        }
        .articleSalon {
          width: 15rem;
          height: 40vh;
          background-color: var(--article-background-color);
          border-radius: 1rem;
        }
        .salonImage {
          width: 100%;
          height: 60%;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        }
        .articleDescription {
          height: 30%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .salonAddress {
          color: var(--text-color-muted);
          font-size: var(--font-size-muted);
        }
        .salonRating {
          font-size: var(--font-size-muted);
        }
        .salonName {
          font-size: var(--font-size-title);
        }
      </style>
      <a href="salonProfile.html?id=${this.id}">
        <article class="articleSalon">
          <img src="../assets/${this.images}" alt="" class="salonImage">
          <div class="articleDescription">
            <div class="salonName">${this.name}</div>
            <div class="salonRating">${this.rating}</div>
            <div class="salonAddress">${this.address}</div>
          </div>
        </article>
      </a>
    `;
  }

  renderDetail() {
    this.shadowRoot.innerHTML = `
      <h2>${this.name}</h2>
      <div class="salonAddress">${this.address}</div>
      <div class="mainImageContainer">
        <video controls width="800" class="salonVideo">
          <source src="video.mp4" type="video/mp4">
        </video>
        <img src="../assets/${this.images}" alt="salonImageTop" class="salonImageTop">
        <img src="../assets/${this.images}.jpg" alt="salonImageBottom" class="salonImageBottom">
      </div>
    `;
  }

  getAbout() {
    return `<h2>Бидний тухай</h2><span>${this.about}</span>`;
  }

  getServices() {
    return this.services || [];
  }

  getEmployees() {
    return this.employees || [];
  }
}

customElements.define("salon-component", Salon);
