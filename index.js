const getById = (id) => document.getElementById(id);

fetch("https://news-api-fs.vercel.app/api/categories")
  .then((res) => res.json())
  .then((categories) => loadNav(categories.categories));

const loadNav = (categories) => {
  const nav = getById("nav");

  categories.forEach((category) => {
    const navItem = document.createElement("li");
    navItem.classList.add("cursor-pointer", "my-4", "transition-all");
    navItem.innerText = `${category.title}`;
    nav.append(navItem);
    const firstItem = nav.querySelector("li");
    firstItem.classList.add("active", "text-sky-500");

    navItem.addEventListener("click", function () {
      showMenu();
      const selectedCategories = document.querySelectorAll("#nav li");
      selectedCategories.forEach((nav) => {
        nav.classList.remove("active", "text-sky-500");
      });
      navItem.classList.add("active", "text-sky-500");

      const newsContainer = getById("news-container");
      newsContainer.innerHTML = `
<div class="text-sky-500 mx-auto mt-16 col-span-full"><span class="loading loading-ring loading-xl w-20"></span></div>
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
            <div class="col-span-full text-center my-20 text-xl text-gray-400"><span class="text-red-300"><i class="fa-solid fa-triangle-exclamation text-2xl"></i></span> No data found</div>
            `;
            return;
          }
          newsByCategory.forEach((news) => {
            const newsBox = document.createElement("div");
            newsBox.classList.add(
              "p-4",
              "rounded-xl",
              "transition-all",
              "hover:scale-[1.05]",
              "shadow-lg",
              "shadow-slate-300",
              "bg-white"
            );
            newsBox.innerHTML = `
        <div id="${news.id}" onclick="showModal(${news.id})">
            <div class="mb-2"><img class='rounded-md h-full object-cover' src="${news.image.srcset[8].url}" alt=""></div>
            <p class="text-sm text-gray-500">${news.time}</p>
            <h4 class="text-2xl font-bold mt-4">${news.title}</h4>
          </div>
      `;
            newsContainer.append(newsBox);
          });
        } catch (error) {
          newsContainer.innerHTML = `
            <div class="col-span-full text-center my-20 text-xl text-gray-400"><span class="text-red-300"><i class="fa-solid fa-triangle-exclamation text-2xl"></i></span> No data found</div>
            `;
        }
      };
      loadNewsCategory();
    });
  });
};

// Main page news load
const newsContainer = getById("news-container");
newsContainer.innerHTML = `
<div class="text-sky-500 mx-auto my-20 col-span-full"><span class="loading loading-ring loading-xl w-20"></span></div>
`;

const loadNews = async () => {
  try {
    const res = await fetch(
      "https://news-api-fs.vercel.app/api/categories/main"
    );
    const data = await res.json();

    const Newses = data.articles;
    newsContainer.innerHTML = "";

    Newses.forEach((news) => {
      const newsBox = document.createElement("div");
      newsBox.classList.add(
        "p-4",
        "rounded-xl",
        "transition-all",
        "hover:scale-[1.03]",
        "shadow-lg",
        "shadow-slate-300",
        "bg-white",
        "cursor-pointer"
      );
      newsBox.innerHTML = `
      <div id="${news.id}" onclick="showModal(${news.id})">
      <div class="mb-2"><img class='rounded-md h-full object-cover' src="${
        news.image.srcset[8].url
      }" alt=""></div>
      <p class="text-sm text-gray-500">${new Date(
        news.scrapedAt
      ).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</p>
      <h4 class="text-2xl font-semibold mt-4">${news.title}</h4>
      </div>
      `;
      newsContainer.append(newsBox);
    });
  } catch (error) {
    newsContainer.innerHTML = `
            <div class="col-span-full text-center my-20 text-xl text-gray-400"><span class="text-red-300"><i class="fa-solid fa-triangle-exclamation text-2xl"></i></span> No data found</div>
            `;
  }
};
loadNews();

// mobile nav functionality
const showMenu = () => {
  const nav = getById("nav");
  const navItems = document.querySelectorAll("#nav li");
  navItems.forEach((navItem) => {
    navItem.classList.toggle("hover:border-l-4");
    navItem.classList.toggle("border-slate-700");
    navItem.classList.add("md:border-none");
  });
  nav.classList.toggle("pointer-events-none");
  nav.classList.toggle("opacity-0");
  nav.classList.toggle("translate-y-[-12px]");
  nav.classList.toggle("translate-y-[-8px]");
};

// mouse hover
const hoverCircle = getById("hover-circle");
let mouseX = 0,
  mouseY = 0;
let circleX = 0,
  circleY = 0;

document.addEventListener("mousemove", (e) => {
  hoverCircle.classList.remove("scale");
  mouseX = e.pageX;
  mouseY = e.pageY;
  hoverCircle.style.opacity = "1";
});
document.addEventListener("mouseleave", () => {
  hoverCircle.style.opacity = "0";
});

document.addEventListener("click", () => {
  hoverCircle.classList.add("scale");
  setTimeout(() => {
    hoverCircle.classList.remove("scale");
    hoverCircle.style.opacity = "1";
  }, 500);
});

function move() {
  circleX += mouseX - circleX;
  circleY += mouseY - circleY;
  hoverCircle.style.left = circleX + "px";
  hoverCircle.style.top = circleY + "px";
  requestAnimationFrame(move);
}
move();

// news details modal
const newsDetailsModal = getById("newsDetailsModal");
const modalNewsContainer = getById("modalNewsContainer");
const showModal = async (news) => {
  const id = news.id;
  try {
    const res = await fetch(`https://news-api-fs.vercel.app/api/news/${id}`);
    const data = await res.json();
    const newsDetails = data.article;

    if (newsDetails) {
      modalNewsContainer.innerHTML = `
      <div class="noto-serif">
      <h4 class="text-2xl font-bold">${newsDetails.title}</h4>
      <img class='rounded-md my-4' src="${newsDetails.images[2].url}" alt="">
      <p>${newsDetails.content.join(" ")}</p>
      </div>
      `;
    } else {
      modalNewsContainer.innerHTML = `
      <div class="text-center mt-20 mb-10 text-xl text-gray-400"><span class="text-red-300"><i class="fa-solid fa-triangle-exclamation text-2xl"></i></span> Details not found</div>
      `;
    }
  } catch (error) {
    modalNewsContainer.innerHTML = `
      <div class="text-center mt-20 mb-10 text-xl text-gray-400"><span class="text-red-300"><i class="fa-solid fa-triangle-exclamation text-2xl"></i></span> Details not found</div>
      `;
  }
  newsDetailsModal.showModal();
};
