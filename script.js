/* ======== GREENLEAF ONLINE PLANT STORE JavaScript ======= */

// Update the copyright year automatically.
const currentYearElement = document.getElementById("currentYear");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}


// Display the current date and time in the footer.
const dateTimeElement = document.getElementById("currentDateTime");

function updateDateTime() {
    if (!dateTimeElement) return;

    const now = new Date();

    dateTimeElement.textContent = now.toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

updateDateTime();

if (dateTimeElement) {
    window.setInterval(updateDateTime, 1000);
}


// Expand/collapse the membership details section.
const membershipButton = document.getElementById("membershipButton");
const membershipDetails = document.getElementById("membershipDetails");

if (membershipButton && membershipDetails) {

    membershipButton.addEventListener("click", function () {

        const isExpanded =
            membershipButton.getAttribute("aria-expanded") === "true";

        membershipButton.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        membershipDetails.hidden = isExpanded;

        membershipButton.textContent = isExpanded
            ? "Discover Membership"
            : "Hide Membership Details";

    });
}




/* ====== PRODUCT PAGE: SEARCH & FILTER ======= */

const plantSearch = document.getElementById("plantSearch");
const plantCategory = document.getElementById("plantCategory");
const plantItems = document.querySelectorAll(".plant-item");
const plantResult = document.getElementById("plantResult");
const noPlantsMessage = document.getElementById("noPlantsMessage");

function filterPlants() {
    if (!plantSearch || !plantCategory) return;

    const searchText = plantSearch.value.trim().toLowerCase();
    const selectedCategory = plantCategory.value;
    let visibleCount = 0;

    plantItems.forEach(function (item) {
        const plantName = item.dataset.name.toLowerCase();
        const plantCategoryName = item.dataset.category;

        const matchesSearch = plantName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            plantCategoryName === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        item.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    if (plantResult) {
        plantResult.textContent =
            `Showing ${visibleCount} of ${plantItems.length} plants`;
    }

    if (noPlantsMessage) {
        noPlantsMessage.hidden = visibleCount !== 0;
    }
}

if (plantSearch) {
    plantSearch.addEventListener("input", filterPlants);
}

if (plantCategory) {
    plantCategory.addEventListener("change", filterPlants);
}


/* ====== PRODUCT PAGE: DEMO CART ====== */

const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const cartMessageElement = document.getElementById("cartMessage");
const clearCartButton = document.getElementById("clearCartButton");

const cart = new Map();

function formatTaka(amount) {
    return "৳" + amount.toLocaleString("en-US");
}

function updateCart() {
    if (!cartItemsElement || !cartTotalElement) return;

    if (cart.size === 0) {
        cartItemsElement.textContent = "Your cart is empty.";
        cartTotalElement.textContent = formatTaka(0);
        return;
    }

    let total = 0;
    const descriptions = [];

    cart.forEach(function (item) {
        total += item.price * item.quantity;

        descriptions.push(
            `${item.name} × ${item.quantity}`
        );
    });

    cartItemsElement.textContent = descriptions.join(" | ");
    cartTotalElement.textContent = formatTaka(total);
}

document.querySelectorAll(".add-cart").forEach(function (button) {
    button.addEventListener("click", function () {
        const name = button.dataset.product;
        const price = Number(button.dataset.price);

        if (!name || !Number.isFinite(price) || price < 0) {
            return;
        }

        if (cart.has(name)) {
            cart.get(name).quantity += 1;
        } else {
            cart.set(name, {
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        if (cartMessageElement) {
            cartMessageElement.textContent =
                `${name} added to your demo cart.`;
        }
    });
});

if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
        cart.clear();
        updateCart();

        if (cartMessageElement) {
            cartMessageElement.textContent =
                "Your demo cart has been cleared.";
        }
    });
}





/* ====== GREENLEAF PRODUCT DETAILS PAGE ======= */

const plantCatalog = {
  monstera: {
    name: "Monstera Deliciosa",
    image: "images/monstera.jpg",
    price: 1200,
    category: "indoor",
    stock: true,
    description:
      "Monstera Deliciosa is a popular tropical houseplant known for its large, glossy, split leaves. It adds a fresh, modern look to living rooms, bedrooms, and offices.",
    light: "Bright, indirect sunlight.",
    water: "Water when the top 2–3 cm of soil feels dry.",
    difficulty: "Easy to moderate",
    suitable: "Living rooms, bedrooms, and offices"
  },

  "peace-lily": {
    name: "Peace Lily",
    image: "images/peace_lily.jpg",
    price: 850,
    category: "flowering",
    stock: true,
    description:
      "Peace Lily is an elegant indoor plant with deep green leaves and beautiful white flowers. It is a lovely choice for adding a calm, natural touch to your home.",
    light: "Low to medium, indirect light.",
    water: "Water when the soil surface begins to dry.",
    difficulty: "Easy",
    suitable: "Bedrooms, living rooms, and offices"
  },

  "snake-plant": {
    name: "Snake Plant",
    image: "images/snake_plant.jpg",
    price: 650,
    category: "easy-care",
    stock: true,
    description:
      "Snake Plant is a hardy, low-maintenance houseplant with upright, sword-shaped leaves. It is an excellent option for beginners and busy plant owners.",
    light: "Low light to bright, indirect light.",
    water: "Allow the soil to dry completely between watering.",
    difficulty: "Very easy",
    suitable: "Bedrooms, offices, and small spaces"
  },

  "money-plant": {
    name: "Money Plant",
    image: "images/money_plant.jpg",
    price: 450,
    category: "indoor",
    stock: true,
    description:
      "Money Plant is a versatile trailing plant with attractive green leaves. It looks beautiful on shelves, in hanging planters, or beside a bright window.",
    light: "Medium to bright, indirect light.",
    water: "Water when the top layer of soil feels dry.",
    difficulty: "Easy",
    suitable: "Shelves, desks, and hanging planters"
  },

  "areca-palm": {
    name: "Areca Palm",
    image: "images/areca_palm.jpg",
    price: 950,
    category: "indoor",
    stock: true,
    description:
      "Areca Palm is a graceful tropical plant with soft, arching green fronds. It creates a refreshing, tropical atmosphere in spacious indoor areas.",
    light: "Bright, indirect sunlight.",
    water: "Keep the soil lightly moist but never waterlogged.",
    difficulty: "Moderate",
    suitable: "Living rooms, offices, and bright corners"
  },

  "jade-plant": {
    name: "Jade Plant",
    image: "images/jade_plant.jpg",
    price: 550,
    category: "easy-care",
    stock: true,
    description:
      "Jade Plant is a compact succulent with thick, fleshy leaves. Its attractive appearance and low watering needs make it a popular choice for desks and sunny windowsills.",
    light: "Bright light with some gentle direct sunlight.",
    water: "Let the soil dry completely before watering again.",
    difficulty: "Easy",
    suitable: "Desks, windowsills, and small spaces"
  }
};

function formatPlantPrice(price) {
  return "৳" + price.toLocaleString("en-BD");
}

function renderPlantDetails() {
  const detailsContainer = document.getElementById("plantDetails");

  // Run only on the Product Details page.
  if (!detailsContainer) return;

  const params = new URLSearchParams(window.location.search);
  const plantId = params.get("plant");
  const plant = plantCatalog[plantId];

  const yearElement = document.getElementById("detailsYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (!plant) {
    detailsContainer.innerHTML = `
      <div class="details-error">
        <h2>Plant Not Found</h2>
        <p>Sorry, we could not find that plant. Please choose a plant from our catalog.</p>
        <a href="product.html">Browse All Plants</a>
      </div>
    `;
    return;
  }

  document.title = `${plant.name} | GreenLeaf`;

  const breadcrumb = document.getElementById("breadcrumbPlant");
  if (breadcrumb) breadcrumb.textContent = plant.name;

  detailsContainer.innerHTML = `
    <section class="plant-details-layout">
      <div>
        <img
          class="plant-details-image"
          src="${plant.image}"
          alt="${plant.name}"
          onerror="this.onerror=null; this.src='https://placehold.co/700x700/eef3eb/234b32?text=Plant+Image';"
        >
      </div>

      <div class="plant-details-info">
        <span class="details-category">${plant.category.replace("-", " ")}</span>

        <h1>${plant.name}</h1>

        <div class="details-price">${formatPlantPrice(plant.price)}</div>

        <p class="details-description">${plant.description}</p>

        <div class="plant-care-box">
          <h3><i class="fa-solid fa-seedling"></i> Plant Care Guide</h3>

          <ul class="plant-care-list">
            <li>
              <i class="fa-solid fa-sun"></i>
              <span><strong>Light:</strong> ${plant.light}</span>
            </li>
            <li>
              <i class="fa-solid fa-droplet"></i>
              <span><strong>Water:</strong> ${plant.water}</span>
            </li>
            <li>
              <i class="fa-solid fa-leaf"></i>
              <span><strong>Difficulty:</strong> ${plant.difficulty}</span>
            </li>
            <li>
              <i class="fa-solid fa-house"></i>
              <span><strong>Suitable for:</strong> ${plant.suitable}</span>
            </li>
          </ul>
        </div>

        <p class="details-stock">
          <i class="fa-solid fa-circle-check"></i>
          ${plant.stock ? "In Stock" : "Currently Unavailable"}
        </p>

        <button
          type="button"
          class="details-cart-button"
          id="detailsAddToCart"
          ${plant.stock ? "" : "disabled"}
        >
          <i class="fa-solid fa-cart-shopping"></i>
          Add to Cart
        </button>

        <p
          class="details-cart-message"
          id="detailsCartMessage"
          role="status"
          aria-live="polite"
        ></p>
      </div>
    </section>
  `;

  const addButton = document.getElementById("detailsAddToCart");
  const cartMessage = document.getElementById("detailsCartMessage");

  addButton.addEventListener("click", function () {
    // Demo cart shared across pages using localStorage.
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("greenLeafCart")) || [];
    } catch (error) {
      cart = [];
    }

    const existingItem = cart.find(item => item.id === plantId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: plantId,
        name: plant.name,
        price: plant.price,
        image: plant.image,
        quantity: 1
      });
    }

    localStorage.setItem("greenLeafCart", JSON.stringify(cart));

    cartMessage.textContent =
      `${plant.name} added to your demo cart.`;

    addButton.innerHTML =
      '<i class="fa-solid fa-check"></i> Added to Cart';
  });
}

document.addEventListener("DOMContentLoaded", renderPlantDetails);
