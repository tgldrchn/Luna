import "./service.js";

class ServiceListComponent extends HTMLElement {
  constructor() {
    super();
    this.services = [];
    this.type = "all";
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["services"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (name === "services" && newValue !== oldValue) {
      try {
        this.services = JSON.parse(newValue);
        console.log(this.services);
        this.render();
      } catch (e) {
        console.error("Invalid JSON format in 'services' attribute", e);
      }
    }
  }

  render() {
    const filteredServices =
      this.type === "all"
        ? this.services
        : this.services.filter((service) => service.name === this.type);

    console.log(filteredServices);

    this.shadowRoot.innerHTML = `
        <style>
          .serviceListContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 20px;
          }
        </style>
        <div class="serviceListContainer">
          ${filteredServices
            .map(
              (service) =>
                `<service-component service='${JSON.stringify(
                  service
                )}'></service-component>`
            )
            .join("")}
        </div>
      `;
  }

  setType(type) {
    this.type = type;
    this.render();
  }
}

customElements.define("service-list", ServiceListComponent);
