const products = [
    {
      id: "1",
      img: "public/images/products/tesla-powerwall.png",
      img_alt: "tesla-powerwall",
      name: "Tesla Powerwall",
      description:
        "The Tesla Powerwall is a residential-level rechargeable lithium-ion battery designed to store energy. It works seamlessly with solar panels and serves as a backup power source.",
      price: "10499.99",
    },
    {
      id: "2",
      img: "public/images/products/prolink-haus-v-series.webp",
      img_alt: "prolink-haus-v-series",
      name: "5KV Solar Inverter Solution",
      description:
        "Prolink IPS Haus V 5KM-48 Hybrid Inverter with 12v 100Ah Solar Deep Cycle Tubular Battery",
      price: "2940.00",
    },
    {
      id: "3",
      img: "public/images/products/sako-550w-solar-panel.png",
      img_alt: "sako-550w-solar-panel",
      name: "Sako 550W Solar Panel",
      description:
        "T10bb half-cut mono Perc cell technology with multi bus-bar design, improved cells efficiency and get higher output power. The module efficiency up to 21.02%. Such panel can reduce energy loss caused by shading due to new cell string layout and lower cell connection power loss due to half-cell design.",
      price: "129.99",
    },
    {
      id: "4",
      img: "public/images/products/deye-sun-5kw.png",
      img_alt: "deye-sun-5kw",
      name: "Deye SUN 5Kw Inverter",
      description:
        "The innovative design of the SUN5K-G is not only easy to install, but also allows for quick DC and AC connections. E.g. it weighs just 4.8 kg. Commissioning is equally easy, because the integrated user interface (local LCD display and buttons) makes it possible to choose the necessary settings quickly.",
      price: "750.00",
    },
    {
      id: "5",
      img: "public/images/products/roy-pow-battery.png",
      img_alt: "roy-pow-battery",
      name: "RoyPow 24V 80Ah Lithium Battery",
      description:
        "24V 80AH RoyPow Lithium Battery. State of Charge Meter for Dash Mount.",
      price: "499.00",
    },
    {
      id: "6",
      img: "public/images/products/growatt-ark-hv-battery.png",
      img_alt: "growatt-ark-hv-battery",
      name: "Growatt ARK HV Battery",
      description:
        "The Growatt ARK battery system has a modular design. Extra batteries can be stacked on top of each other. The ARK-2.5H-A1 is suited for high voltage systems",
      price: "259.00",
    },
    {
      id: "7",
      img: "public/images/products/solar-edge-power-optimizer.png",
      img_alt: "solar-edge-power-optimizer",
      name: "Growatt ARK HV Battery",
      description:
        "The SolarEdge S440 optimizer is a device that optimizes the energy output of solar panels. The S440 optimizer works by optimizing the output of each individual panel, since the output per panel can vary due to age, shadow, or orientation.",
      price: "139.00",
    },
    {
      id: "8",
      img: "public/images/products/enphase-iq8.webp",
      img_alt: "enphase-iq8",
      name: "Enphase IQ8-AC Micro Inverter",
      description:
        "Enphase IQ8-AC belongs to the most recent models of Enphase micro-inverters. This series boasts exceptionally high efficiency, ensuring maximum energy yield from solar panels. These generation inverters are renowned for the highest energy production and reliability in the market.",
      price: "320.00",
    },
    {
      id: "9",
      img: "public/images/products/sma-sunny-boy.webp",
      img_alt: "sma-sunny-boy",
      name: "SMA Sunny Boy 5.0 1AV-41",
      description:
        "lightweight and therefore quick to install. The Shadefix shadow management system, formerly known as OptiTrac Global Peak, makes this inverter suitable for various environments.",
      price: "120.00",
    },
  ];
  
  const basket = [];
  
  const productsWrapper = document.querySelector(".products-wrapper");
  products.forEach((product) => {
    const productItem = document.createElement("product-item");
    productItem.setAttribute("product-id", product.id);
    productItem.setAttribute("img", product.img);
    productItem.setAttribute("img-alt", product.img_alt);
    productItem.setAttribute("name", product.name);
    productItem.setAttribute("description", product.description);
    productItem.setAttribute("price", product.price);
    productItem.addEventListener("add-to-cart", (event) => {
      const product = products.find(
        (product) => product.id === event.detail.product_id
      );
      if (product) {
        const productInBasket = basket.find(
          (product) => product.id === event.detail.product_id
        );
        if (productInBasket) {
          productInBasket.quantity = productInBasket.quantity + 1;
          productInBasket.price = Number.parseFloat(
            Number.parseFloat(productInBasket.price) +
              Number.parseFloat(product.price)
          ).toFixed(2);
        } else {
          basket.push({ ...product, quantity: 1 });
        }
      }
      renderBasket();
    });
    productsWrapper.appendChild(productItem);
  });
  
  const basketWrapper = document.querySelector(".basket-items");
  const basketEmptyWrapper = document.querySelector(".basket-empty-wrapper");
  const checkoutButton = document.querySelector(".basket-item-checkout-button");
  const basketTotal = document.querySelector("#basket-total");
  
  checkoutButton.addEventListener("click", () => {
    if (basket.length > 0) {
      renderBasket();
      window.location.href = "checkout.html";
    }
  });
  
  function renderBasket() {
    if (basket.length == 0) {
      basketWrapper.style.display = "none";
      basketEmptyWrapper.style.display = "inline-flex";
      checkoutButton.setAttribute("variant", "secondary");
    } else {
      basketWrapper.style.display = "flex";
      basketEmptyWrapper.style.display = "none";
      checkoutButton.setAttribute("variant", "primary");
    }
  
    const total = basket.reduce((acc, product) => acc + Number(product.price), 0);
    basketTotal.innerHTML = total.toFixed(2);
  
    basketWrapper.innerHTML = "";
    basket.forEach((product) => {
      const basketItem = document.createElement("basket-item");
      basketItem.setAttribute("product-id", product.id);
      basketItem.setAttribute("img", product.img);
      basketItem.setAttribute("img-alt", product.img_alt);
      basketItem.setAttribute("name", product.name);
      basketItem.setAttribute("price", product.price);
      basketItem.setAttribute("quantity", product.quantity);
      basketItem.addEventListener("decrement-quantity", (event) => {
        const originalProduct = products.find(
          (product) => product.id === event.detail.product_id
        );
        const productInBasket = basket.find(
          (product) => product.id === event.detail.product_id
        );
        if (productInBasket) {
          productInBasket.quantity = productInBasket.quantity - 1;
          productInBasket.price = Number.parseFloat(
            Number.parseFloat(productInBasket.price) -
              Number.parseFloat(originalProduct.price)
          ).toFixed(2);
          if (productInBasket.quantity < 1) {
            basket.splice(basket.indexOf(productInBasket), 1);
          }
        }
        storeBasket();
        renderBasket();
      });
      basketItem.addEventListener("increment-quantity", (event) => {
        const originalProduct = products.find(
          (product) => product.id === event.detail.product_id
        );
        const productInBasket = basket.find(
          (product) => product.id === event.detail.product_id
        );
        if (productInBasket) {
          productInBasket.quantity = productInBasket.quantity + 1;
          productInBasket.price = Number.parseFloat(
            Number.parseFloat(productInBasket.price) +
              Number.parseFloat(originalProduct.price)
          ).toFixed(2);
        }
        storeBasket();
        renderBasket();
      });
      basketWrapper.appendChild(basketItem);
      storeBasket();
    });
  }
  
  const basketToggle = document.querySelector("#basket-toggle");
  const basketClose = document.querySelector("#basket-close");
  const basketModal = document.querySelector(".basket-content");
  
  basketToggle.addEventListener("click", () => {
    basketModal.classList.toggle("hidden");
  });
  basketClose.addEventListener("click", () => {
    basketModal.classList.add("hidden");
  });
  
  function storeBasket() {
    localStorage.setItem("basket", JSON.stringify(basket));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      basket.push(...JSON.parse(storedBasket));
    }
    renderBasket(); 
  });