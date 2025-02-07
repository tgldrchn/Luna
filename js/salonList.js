import "../js/salon.js";

class SalonList extends HTMLElement {
  constructor() {
    super();
    this.salons = [];
    this.type = "suggested";
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["type"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type" && oldValue !== newValue) {
      if (newValue === "topRated" || newValue === "suggested") {
        this.type = newValue; // Зөв утга бол шинэчлэх
        this.render();
      } else {
        console.warn(
          `Invalid type: ${newValue}. Allowed values are "topRated" and "suggested".`
        );
      }
    }
  }

  filterSalons() {
    if (this.type === "topRated") {
      return this.salons.sort((a, b) => b.rating - a.rating).slice(0, 5);
    } else if (this.type === "suggested") {
      return this.salons;
    }
  }

  set data(salons) {
    this.salons = salons;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const filteredSalons = this.filterSalons();
    this.shadowRoot.innerHTML = `
    <style>
       .articlesContainer {
        width: 80vw;
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        scrollbar-width: none;
        padding: 1rem;
        gap: 5rem;
}   </style>
    <div class="articlesContainer" id="articlesContainer">
       ${filteredSalons
         .map((salon) => {
           console.log(salon);
           return `<salon-component salon='${JSON.stringify(
             salon
           )}'></salon-component>`;
         })
         .join("")}
    </div>`;
  }
}

customElements.define("salon-list", SalonList);
