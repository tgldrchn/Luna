import "./booking.js";

class Service extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Check if the 'service' attribute exists before parsing
    const serviceData = JSON.parse(this.getAttribute("service"));

    this.id = serviceData.id;
    this.name = serviceData.name;
    this.price = serviceData.price;
    this.duration = serviceData.duration;
    this.description = serviceData.description;

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .servicesProfile {
          background-color: var(--article-background-color);
          width: 15rem;
          height: 10rem;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          transition: transform 0.3s ease;
        }

        .servicesProfile:hover {
          transform: scale(1.05);
        }

        .servicesProfile a {
          text-decoration: none;
        }

        .bookingButton {
          background-color: var(--button-color);
          width: 80%;
          height: 2rem;
          border: none;
          border-radius: 2rem;
          margin-top: 1rem;
          color: var(--text-color-secondary);
          font-size: 1rem;
          cursor: pointer;
        }

        .bookingButton:hover {
          background-color: var(--button-hover-color);
        }

        .servicesProfile div {
          color: var(--text-color-muted);
          font-size: var(--font-size-muted);
        }

        /* Add responsiveness */
        @media (max-width: 600px) {
          .servicesProfile {
            width: 12rem;
            height: 8rem;
          }
        }
      </style>

      <div class="servicesProfile" id="servicesProfile">
        <h3>${this.name}</h3>
        <div class="serviceDuration">${this.duration}</div>
        <div class="servicesPrice">${this.price} MNT</div>
        <button class="bookingButton" id="${this.id}">
          ${this.isBooked() ? "Захиалсан" : "Захиалах"}
        </button>
      </div>
    `;

    // Add event listener for booking button
    this.shadowRoot
      .querySelector(".bookingButton")
      .addEventListener("click", () => {
        this.handleBooking();
      });
  }

  handleBooking() {
    // Retrieve existing service data from localStorage or initialize empty array
    const existingServices =
      JSON.parse(localStorage.getItem("serviceData")) || [];

    // Add the current service to the existing list
    existingServices.push({
      id: this.id,
      name: this.name,
      price: this.price,
      duration: this.duration,
      description: this.description,
      count: 1,
    });

    // Store the updated list back to localStorage
    localStorage.setItem("serviceData", JSON.stringify(existingServices));

    // Redirect to the booking page
    window.location.href = `booking.html?serviceId=${this.id}`;
  }

  isBooked() {
    const bookedServices =
      JSON.parse(localStorage.getItem("serviceData")) || [];
    return bookedServices.some((service) => service.id === this.id);
  }
}

customElements.define("service-component", Service);
