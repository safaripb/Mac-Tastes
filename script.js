const locations = [
  {
    name: "Bistro",
    searchTerms: ["bistro", "steak", "smoothie", "burger", "chicken"],
    heroImage: "images/Bistro/store-view.jpg",
    slides: [
      "images/Bistro/store-view.jpg",
      "images/Bistro/steak.jpg",
      "images/Bistro/smoothie.jpg",
      "images/Bistro/burger.jpg"
    ],
    hours: "Breakfast 7:30 am - 11:00 am · Lunch 11:00 am - 3:00 pm · Dinner 4:00 pm - 8:30 pm",
    note: "Restaurant-style dining with upscale meals, lighter options, and fresh drinks.",
    distance: 4,
    pickup: "Pickup today · 7:45 pm - 8:30 pm",
    bagPrice: 7.99,
    badge: "Premium bag",
    reserveCount: 5,
    menu: [
      {
        name: "Local Steak",
        price: "$26.99",
        image: "images/Bistro/steak.jpg",
        description: "Striploin steak with vegetables and a composed plate feel."
      },
      {
        name: "Campus Burger",
        price: "$17.49",
        image: "images/Bistro/burger.jpg",
        description: "A hearty burger option with a restaurant-style feel."
      },
      {
        name: "Berry Smoothie",
        price: "$5.49",
        image: "images/Bistro/smoothie.jpg",
        description: "A fresh smoothie-style drink perfect for breakfast or a snack."
      }
    ]
  },
  {
    name: "Centro",
    searchTerms: ["centro", "pasta", "fruit", "butter chicken", "shrimp", "commons", "salmon"],
    heroImage: "images/Centro/store-view.jpg",
    slides: [
      "images/Centro/store-view.jpg",
      "images/Centro/pasta.jpg",
      "images/Centro/fruits.jpg",
      "images/Centro/salmon.jpg"
    ],
    hours: "Monday - Friday 7:00 am - 11:00 pm · Saturday - Sunday 10:00 am - 10:00 pm",
    note: "Busy all-day campus hub with fast options, warm meals, and grab-and-go picks.",
    distance: 3,
    pickup: "Pickup today · 8:30 pm - 9:15 pm",
    bagPrice: 5.99,
    badge: "Best value",
    reserveCount: 11,
    menu: [
      {
        name: "Creamy Pasta Bowl",
        price: "$8.99",
        image: "images/Centro/pasta.jpg",
        description: "A warm pasta option with a comforting food-court feel."
      },
      {
        name: "Fresh Fruit Cup",
        price: "$4.29",
        image: "images/Centro/fruits.jpg",
        description: "Grab-and-go fruit for a lighter choice."
      },
      {
        name: "Salmon Plate",
        price: "$10.99",
        image: "images/Centro/salmon.jpg",
        description: "A plated salmon option that gives the menu more variety and balance."
      }
    ]
  },
  {
    name: "La Piazza",
    searchTerms: ["la piazza", "thai", "wonton", "quesadillas", "chili", "noodles", "wrap"],
    heroImage: "images/La Piazza/store-view.jpg",
    slides: [
      "images/La Piazza/store-view.jpg",
      "images/La Piazza/Thai.jpg",
      "images/La Piazza/wonton soup.jpg",
      "images/La Piazza/wrap.jpg"
    ],
    hours: "Monday - Thursday 8:00 am - 10:00 pm · Friday 8:00 am - 8:00 pm",
    note: "Food-court variety with rotating global flavours and comfort meals.",
    distance: 5,
    pickup: "Pickup today · 7:15 pm - 8:00 pm",
    bagPrice: 6.49,
    badge: "Variety bag",
    reserveCount: 7,
    menu: [
      {
        name: "Thai Noodle Plate",
        price: "$9.29",
        image: "images/La Piazza/Thai.jpg",
        description: "Flavourful noodle dish with vegetables and a fast lunch feel."
      },
      {
        name: "Wonton Soup",
        price: "$6.79",
        image: "images/La Piazza/wonton soup.jpg",
        description: "Warm soup option for colder days on campus."
      },
      {
        name: "Chicken Wrap",
        price: "$8.49",
        image: "images/La Piazza/wrap.jpg",
        description: "A quick, filling wrap option that fits the campus food-court style."
      }
    ]
  }
];

const locationsGrid = document.getElementById("locationsGrid");
const searchInput = document.getElementById("searchInput");
const sortFilter = document.getElementById("sortFilter");

const menuModal = document.getElementById("menuModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalTitle = document.getElementById("modalTitle");
const modalBadge = document.getElementById("modalBadge");
const modalHours = document.getElementById("modalHours");
const modalDescription = document.getElementById("modalDescription");
const modalBagPrice = document.getElementById("modalBagPrice");
const modalPickup = document.getElementById("modalPickup");
const modalDistance = document.getElementById("modalDistance");
const menuItems = document.getElementById("menuItems");
const slideImage = document.getElementById("slideImage");
const slideDots = document.getElementById("slideDots");
const prevSlideBtn = document.getElementById("prevSlideBtn");
const nextSlideBtn = document.getElementById("nextSlideBtn");
const reserveNowBtn = document.getElementById("reserveNowBtn");
const reserveSection = document.getElementById("reserveSection");
const reserveForm = document.getElementById("reserveForm");
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const bagsSaved = document.getElementById("bagsSaved");
const bagsSavedValue = document.getElementById("bagsSavedValue");
const scoreValue = document.getElementById("scoreValue");

let activeLocation = null;
let activeSlideIndex = 0;

function renderLocations() {
  const query = searchInput.value.trim().toLowerCase();
  const sortValue = sortFilter.value;

  let filtered = locations.filter((location) => {
    const locationMatch = location.name.toLowerCase().includes(query);
    const keywordMatch = location.searchTerms.some((term) =>
      term.toLowerCase().includes(query)
    );
    const menuMatch = location.menu.some((item) =>
      item.name.toLowerCase().includes(query)
    );

    return locationMatch || keywordMatch || menuMatch || query === "";
  });

  filtered = [...filtered];

  if (sortValue === "priceLow") {
    filtered.sort((a, b) => a.bagPrice - b.bagPrice);
  } else if (sortValue === "priceHigh") {
    filtered.sort((a, b) => b.bagPrice - a.bagPrice);
  } else if (sortValue === "distance") {
    filtered.sort((a, b) => a.distance - b.distance);
  }

  locationsGrid.innerHTML = filtered
    .map((location, index) => {
      return `
        <article class="location-card">
          <div class="location-image-wrap">
            <img src="${location.heroImage}" alt="${location.name}" class="location-image" />
            <div class="location-overlay"></div>
            <div class="location-label">
              <h3>${location.name}</h3>
              <p>${location.pickup}</p>
            </div>
          </div>

          <div class="location-card-body">
            <div class="location-badges">
              <span class="badge">${location.badge}</span>
              <span class="badge">${location.reserveCount} bags left</span>
            </div>

            <p class="location-note">${location.note}</p>

            <div class="location-meta-row">
              <div class="bag-price-box">
                <span class="bag-price-label">Surprise bag</span>
                <div class="bag-price">$${location.bagPrice.toFixed(2)}</div>
              </div>

              <div class="location-side-meta">
                <div>${location.distance} min from central campus</div>
                <div>${location.hours}</div>
              </div>
            </div>

            <div class="location-actions">
              <button class="btn preview-btn" data-index="${index}" data-action="preview">
                Preview
              </button>
              <button class="btn btn-primary" data-index="${index}" data-action="reserve">
                Reserve
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  if (filtered.length === 0) {
    locationsGrid.innerHTML = `
      <article class="location-card">
        <div class="location-card-body">
          <h3>No matches found</h3>
          <p class="location-note">Try another location or food keyword.</p>
        </div>
      </article>
    `;
  }

  const previewButtons = document.querySelectorAll('[data-action="preview"]');
  const reserveButtons = document.querySelectorAll('[data-action="reserve"]');

  previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      openModal(filtered[index], false);
    });
  });

  reserveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      openModal(filtered[index], true);
    });
  });
}

function openModal(location, jumpToReserve) {
  activeLocation = location;
  activeSlideIndex = 0;

  modalTitle.textContent = location.name;
  modalBadge.textContent = location.badge;
  modalHours.textContent = location.hours;
  modalDescription.textContent = location.note;
  modalBagPrice.textContent = `$${location.bagPrice.toFixed(2)}`;
  modalPickup.textContent = location.pickup;
  modalDistance.textContent = `${location.distance} min from central campus`;

  renderMenu(location);
  renderSlide();

  if (jumpToReserve) {
    reserveSection.classList.remove("hidden");
  } else {
    reserveSection.classList.add("hidden");
  }

  studentName.value = "";
  studentId.value = "";

  menuModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  menuModal.classList.add("hidden");
  document.body.style.overflow = "";
  reserveSection.classList.add("hidden");
}

function renderMenu(location) {
  menuItems.innerHTML = location.menu
    .map((item) => {
      return `
        <article class="menu-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="menu-item-body">
            <div class="menu-item-top">
              <h5>${item.name}</h5>
              <span class="menu-item-price">${item.price}</span>
            </div>
            <p>${item.description}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSlide() {
  if (!activeLocation) return;

  slideImage.src = activeLocation.slides[activeSlideIndex];
  slideImage.alt = `${activeLocation.name} preview ${activeSlideIndex + 1}`;

  slideDots.innerHTML = activeLocation.slides
    .map((_, index) => {
      return `<span class="slide-dot ${index === activeSlideIndex ? "active" : ""}"></span>`;
    })
    .join("");
}

function nextSlide() {
  if (!activeLocation) return;
  activeSlideIndex = (activeSlideIndex + 1) % activeLocation.slides.length;
  renderSlide();
}

function prevSlide() {
  if (!activeLocation) return;
  activeSlideIndex =
    (activeSlideIndex - 1 + activeLocation.slides.length) % activeLocation.slides.length;
  renderSlide();
}

function updateImpact() {
  const bags = Number(bagsSaved.value);
  const score = bags * 12;

  bagsSavedValue.textContent = bags;
  scoreValue.textContent = `${score} pts`;
}

function showToast(message) {
  toastText.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

searchInput.addEventListener("input", renderLocations);
sortFilter.addEventListener("change", renderLocations);

prevSlideBtn.addEventListener("click", prevSlide);
nextSlideBtn.addEventListener("click", nextSlide);

closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

reserveNowBtn.addEventListener("click", () => {
  reserveSection.classList.remove("hidden");
  reserveSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

reserveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = studentName.value.trim();
  const id = studentId.value.trim();

  if (!name || !id || !activeLocation) return;

  showToast(`${name}, your ${activeLocation.name} surprise bag is reserved!`);
  closeModal();
});

bagsSaved.addEventListener("input", updateImpact);

document.addEventListener("keydown", (event) => {
  if (menuModal.classList.contains("hidden")) return;

  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") prevSlide();
});

renderLocations();
updateImpact();