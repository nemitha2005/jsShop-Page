class ProductItem extends HTMLElement {
    constructor() {
      super();
    }
  
    intialize() {
      this.querySelector("#add-button").addEventListener("click", () =>
        this.dispatchEvent(
          new CustomEvent("add-to-cart", {
            detail: {
              product_id: this.getAttribute("product-id"),
            },
          })
        )
      );
    }
  
    connectedCallback() {
      this.render();
      this.intialize();
    }
  
    static get observedAttributes() {
      return ["product-id", "img", "img-alt", "name", "description", "price"];
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
        .product {
          max-width: 20rem;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          border-radius: 6px;
          border: 1px solid hsl(var(--border));
        }
        
        .product-image {
          display: flex;
          justify-content: center;
        }
        
        .product-image img {
          width: auto;
          height: 18rem;
          object-fit: cover;
        }
        
        .product-content {
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
        }
        
        .product-heading {
          font-size: 1rem;
          font-weight: 500;
        }
        
        .product-description {
          display: -webkit-box;
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          margin-top: 0.5rem;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        
        .product-price {
          color: hsl(var(--muted-foreground));
          font-weight: 500;
          margin-top: 0.5rem;
        }
        
        .product button {
          margin-top: 1rem;
          gap: 0.5rem;
        }
        
        .product button svg {
          width: 18px;
          height: 18px;
        }    
      </style>
      <div class="product">
        <div class="product-image">
          <img
            src=${this.getAttribute("img")}
            alt=${this.getAttribute("img-alt") ?? "Product"}
          />
        </div>
        <div class="product-content">
          <h2 class="product-heading">${this.getAttribute("name")}</h2>
          <p class="product-description">${this.getAttribute("description")}</p>
          <p class="product-price">$${this.getAttribute("price")}</p>
        </div>
        <button id="add-button" class="button" variant="muted"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        Add to cart</button>
      </div>
      `;
    }
  }
  
  customElements.define("product-item", ProductItem);