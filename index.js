const getById = (id) => document.getElementById(id);

fetch("https://news-api-fs.vercel.app/api/categories")
  .then((res) => res.json())
  .then((categories) => loadNav(categories.categories));

const loadNav = (categories) => {
  const nav = getById("nav");
  categories.forEach((category) => {
    const navItem = document.createElement("li");
    navItem.classList.add(
      "text-sky-500",
      "cursor-pointer",
      "my-2",
      "transition-all"
    );
    navItem.innerText = `${category.title}`;
    nav.append(navItem);
    navItem.addEventListener("click", function () {
      try {
        fetch(`https://news-api-fs.vercel.app/api/categories/${category.id}`)
          .then((res) => res.json())
          .then((newsCategory) => loadNewsCategory(newsCategory.articles));
      } catch (error) {
        console.log(error);
      }

      const loadNewsCategory = (newsCategory) => {
        const newsContainer = getById("news-container");
        newsCategory.forEach((news) => {});
      };
    });
  });
};

// popular news load
const loadPopularNews = async () => {
  try {
    const res = await fetch("https://news-api-fs.vercel.app/api/popular");
    const data = await res.json();
    const popularNews = data.articles;
    const newsContainer = getById("news-container");
    newsContainer.innerHTML = "";

    popularNews.forEach((news) => {
      const newsBox = document.createElement("div");
      newsBox.classList.add("border", "border-sky-300", "p-4", "rounded-xl");
      newsBox.innerHTML = `
      <a href="${news.link}">
            <p class="text-sm text-gray-400">${news.scrapedAt}</p>
            <h4 class="text-2xl font-semibold mt-4 text-sky-500">${news.title}</h4>
          </a>
      `;
      newsContainer.append(newsBox);
    });
  } catch (error) {
    console.error("Error fetching popular news:", error);
  }
};
loadPopularNews();

// mobile nav functionality
const showMenu = () => {
  const nav = getById("nav");
  const navItems = document.querySelectorAll("#nav li");
  navItems.forEach((navItem) => {
    navItem.classList.toggle("hover:border-l-4");
    navItem.classList.toggle("border-sky-500");
    navItem.classList.add("md:border-none");
  });
  nav.classList.toggle("pointer-events-none");
  nav.classList.toggle("opacity-0");
  nav.classList.toggle("top-14");
  nav.classList.toggle("top-10");
};
