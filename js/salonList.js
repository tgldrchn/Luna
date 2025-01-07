import Salon from "../js/salon.js";

class SalonList extends HTMLElement {
  constructor() {
    super();
    this.salons = [];
    this.attachShadow({ mode: "open" });
  }

  set data(salons) {
    this.salons = salons;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <div class="articlesContainer" id="articlesContainer">
      ${this.salons
        .map((salon) => {
          const salonComponent = new Salon(salon);
          return salonComponent.render();
        })
        .join("")}
    </div>    
    `;
  }
}

customElements.define("salon-list", SalonList);
