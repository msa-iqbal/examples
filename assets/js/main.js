// Search and Filter Functionality
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const categoryCards = document.querySelectorAll(".category-card");
const resultsInfo = document.getElementById("resultsInfo");
const noResults = document.getElementById("noResults");
const categoriesGrid = document.getElementById("categoriesGrid");

let currentFilter = "all";
let currentSearch = "";

searchInput.addEventListener("input", (e) => {
  console.log("[v0] Search input changed:", e.target.value);
  currentSearch = e.target.value.toLowerCase().trim();
  filterContent();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("[v0] Filter button clicked:", button.dataset.category);

    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    currentFilter = button.dataset.category;
    filterContent();
  });
});

function filterContent() {
  console.log(
    "[v0] Filtering content - Filter:",
    currentFilter,
    "Search:",
    currentSearch
  );

  let visibleCards = 0;
  let totalPosts = 0;

  categoryCards.forEach((card, index) => {
    const category = card.dataset.category;
    const posts = card.querySelectorAll(".post-item");
    let visiblePosts = 0;

    // Check if category matches current filter
    const categoryMatches =
      currentFilter === "all" || category === currentFilter;

    if (categoryMatches) {
      // Filter posts within this category based on search
      posts.forEach((post) => {
        const title = post.dataset.title.toLowerCase();
        const matchesSearch =
          currentSearch === "" || title.includes(currentSearch);

        if (matchesSearch) {
          post.style.display = "flex";
          post.classList.remove("hidden");
          visiblePosts++;
        } else {
          post.style.display = "none";
          post.classList.add("hidden");
        }
      });

      // Show/hide category card based on visible posts
      if (visiblePosts > 0) {
        card.style.display = "block";
        card.classList.remove("hidden");
        visibleCards++;

        // Update post count
        const countElement = card.querySelector(".category-count");
        countElement.textContent = visiblePosts;
      } else {
        card.style.display = "none";
        card.classList.add("hidden");
      }

      totalPosts += visiblePosts;
    } else {
      // Hide entire category if it doesn't match filter
      card.style.display = "none";
      card.classList.add("hidden");
    }
  });

  updateResultsInfo(visibleCards, totalPosts);

  // Show/hide no results message
  if (visibleCards === 0) {
    categoriesGrid.style.display = "none";
    noResults.classList.remove("hidden");
    noResults.style.display = "block";
  } else {
    categoriesGrid.style.display = "grid";
    noResults.classList.add("hidden");
    noResults.style.display = "none";
  }
}

function updateResultsInfo(categories, posts) {
  if (currentSearch || currentFilter !== "all") {
    const searchText = currentSearch ? ` matching "${currentSearch}"` : "";
    const filterText = currentFilter !== "all" ? ` in ${currentFilter}` : "";
    resultsInfo.textContent = `Found ${posts} posts in ${categories} categories${searchText}${filterText}`;
    resultsInfo.style.display = "block";
  } else {
    resultsInfo.style.display = "none";
  }
}

document.querySelectorAll(".post-item").forEach((post) => {
  post.addEventListener("mouseenter", () => {
    post.style.transform = "translateX(8px)";
    post.style.background = "rgba(59, 130, 246, 0.1)";
    post.style.borderColor = "var(--accent-blue)";
    post.style.color = "var(--accent-blue)";

    const icon = post.querySelector(".material-icons");
    if (icon) {
      icon.style.color = "var(--accent-blue)";
      icon.style.transform = "scale(1.2)";
    }
  });

  post.addEventListener("mouseleave", () => {
    post.style.transform = "translateX(0)";
    post.style.background = "transparent";
    post.style.borderColor = "var(--border)";
    post.style.color = "var(--text-primary)";

    const icon = post.querySelector(".material-icons");
    if (icon) {
      icon.style.color = "var(--text-muted)";
      icon.style.transform = "scale(1)";
    }
  });

  post.addEventListener("click", (e) => {
    e.stopPropagation();
    const postTitle = post.querySelector(".post-title").textContent;
    console.log("[v0] Clicked on post:", postTitle);
    // Add click animation
    post.style.transform = "translateX(12px) scale(1.02)";
    setTimeout(() => {
      post.style.transform = "translateX(8px)";
    }, 150);
  });
});

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const icon = card.querySelector(".category-icon");
    if (icon) {
      icon.style.transform = "rotate(10deg) scale(1.1)";
    }

    const title = card.querySelector(".category-title");
    if (title) {
      title.style.color = "var(--accent-blue)";
    }

    const count = card.querySelector(".category-count");
    if (count) {
      count.style.transform = "scale(1.1)";
      count.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.4)";
    }
  });

  card.addEventListener("mouseleave", () => {
    const icon = card.querySelector(".category-icon");
    if (icon) {
      icon.style.transform = "rotate(0deg) scale(1)";
    }

    const title = card.querySelector(".category-title");
    if (title) {
      title.style.color = "var(--text-primary)";
    }

    const count = card.querySelector(".category-count");
    if (count) {
      count.style.transform = "scale(1)";
      count.style.boxShadow = "none";
    }
  });
});

// Initialize the page
filterContent();
