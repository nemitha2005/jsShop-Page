class BasketItem extends HTMLElement {
    constructor() {
      super();
    }
  
    intialize() {
      this.querySelector("#decrement").addEventListener("click", () =>
        this.dispatchEvent(
          new CustomEvent("decrement-quantity", {
            detail: { product_id: this.getAttribute("product-id") },
          })
        )
      );
  
      this.querySelector("#increment").addEventListener("click", () =>
        this.dispatchEvent(
          new CustomEvent("increment-quantity", {
            detail: { product_id: this.getAttribute("product-id") },
          })
        )
      );
    }
  
    connectedCallback() {
      this.render();
      this.intialize();
    }
  
    static get observedAttributes() {
      return ["product-id", "img", "img-alt", "name", "price", "quantity"];
    }
  
    attributeChangedCallback(_, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
  
    render() {
      this.innerHTML = `
      <link rel="stylesheet" href="styles/globals.css" />
      <style>
        .basket-item {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: 6px;
          background-color: hsl(var(--primary));
        }
        
        .basket-item-image {
          width: 60px;
          height: 60px;
          border-radius: 6px;
        }
        
        .basket-item-image img {
          height: 100%;
          object-fit: cover;
        }
        
        .basket-item-details {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-left: 0.5rem;
        }
        
        .basket-item-name {
          font-size: 1rem;
          font-weight: 500;
        }
        
        .basket-item-price-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .basket-item-price {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
        }
        
        .basket-item-quantity-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .basket-item-quantity {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
        }
        
        .basket-item-quantity-wrapper svg {
          width: 16px;
          height: 16px;
          stroke: hsl(var(--muted-foreground));
          cursor: pointer;
        }
        
        .basket-item-checkout-button {
          width: 100%;
          gap: 0.5rem;
        }
        
        .basket-item-checkout-button svg {
          width: 20px;
          height: 20px;
        }
      </style>
      <div class="basket-item">
        <div class="basket-item-image">
          <img
            src=${this.getAttribute("img")}
            alt=${this.getAttribute("img-alt") ?? "Product"}
          />
        </div>
        <div class="basket-item-details">
          <h3 class="basket-item-name">${this.getAttribute("name")}</h3>
          <div class="basket-item-price-wrapper">
            <p class="basket-item-price">$${this.getAttribute("price")}</p>
            <div class="basket-item-quantity-wrapper">
              <svg
                id="decrement"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h14"
                />
              </svg>
              <p class="basket-item-quantity">${this.getAttribute("quantity")}</p>
              <svg
                id="increment"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }
  
  customElements.define("basket-item", BasketItem);