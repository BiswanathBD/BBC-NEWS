const getById = (id) => document.getElementById(id);

fetch("https://news-api-fs.vercel.app/api/categories")
  .then((res) => res.json())
  .then((categories) => loadNav(categories.categories));

const loadNav = (categories) => {
  const nav = getById("nav");
  categories.forEach((category) => {
    const navItem = document.createElement("li");
    navItem.classList.add(
      "text-red-500",
      "cursor-pointer",
      "my-2",
      "transition-all"
    );
    navItem.innerText = `${category.title}`;
    nav.append(navItem);
    navItem.addEventListener("click", function () {
      const selectedCategories = document.querySelectorAll("#nav li");
      selectedCategories.forEach((nav) => {
        nav.classList.remove("active");
      });
      navItem.classList.add("active");

      getById("category-name").innerText = "";
      const newsContainer = getById("news-container");
      newsContainer.innerHTML = `
<div class="text-red-500 mx-auto mt-16 col-span-full"><span class="loading loading-ring loading-xl w-20"></span></div>
`;

      const loadNewsCategory = async () => {
        try {
          const res = await fetch(
            `https://news-api-fs.vercel.app/api/categories/${category.id}`
          );
          const data = await res.json();
          const newsByCategory = data.articles;
          newsContainer.innerHTML = "";
          if (!newsByCategory || newsByCategory.length === 0) {
            newsContainer.innerHTML = `
            <div class="col-span-full text-center mt-16 text-xl text-gray-400"><i class="fa-solid fa-triangle-exclamation text-2xl"></i> No data found</div>
            `;
            return;
          }
          newsByCategory.forEach((news) => {
            const newsBox = document.createElement("div");
            newsBox.classList.add(
              "border",
              "border-red-300",
              "p-4",
              "rounded-xl"
            );
            newsBox.innerHTML = `
      <a href="${news.link}.">
            <p class="text-sm text-gray-400">${news.scrapedAt}</p>
            <h4 class="text-2xl font-semibold mt-4 text-red-500">${news.title}</h4>
          </a>
      `;
            newsContainer.append(newsBox);
          });
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };
      loadNewsCategory();
    });
  });
};

// popular news load
const newsContainer = getById("news-container");
newsContainer.innerHTML = `
<div class="text-red-500 mx-auto mt-16 col-span-full"><span class="loading loading-ring loading-xl w-20"></span></div>
`;

const loadPopularNews = async () => {
  try {
    const res = await fetch("https://news-api-fs.vercel.app/api/popular");
    const data = await res.json();

    const popularNews = data.articles;
    newsContainer.innerHTML = "";

    popularNews.forEach((news) => {
      const newsBox = document.createElement("div");
      newsBox.classList.add("border", "border-red-300", "p-4", "rounded-xl");
      newsBox.innerHTML = `
      <a href="${news.link}.">
      <p class="text-sm text-gray-400">${news.scrapedAt}</p>
      <h4 class="text-2xl font-semibold mt-4 text-red-500">${news.title}</h4>
      </a>
      `;
      newsContainer.append(newsBox);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
loadPopularNews();

// mobile nav functionality
const showMenu = () => {
  const nav = getById("nav");
  const navItems = document.querySelectorAll("#nav li");
  navItems.forEach((navItem) => {
    navItem.classList.toggle("hover:border-l-4");
    navItem.classList.toggle("border-red-500");
    navItem.classList.add("md:border-none");
  });
  nav.classList.toggle("pointer-events-none");
  nav.classList.toggle("opacity-0");
  nav.classList.toggle("top-14");
  nav.classList.toggle("top-10");
};
