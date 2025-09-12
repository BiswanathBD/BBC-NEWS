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
    navItem.id = `${category.id}`;
    navItem.innerText = `${category.title}`;
    nav.append(navItem);
  });
};

const showMenu = () => {
  const nav = getById("nav");
  const navItems = document.querySelectorAll("#nav li");
  navItems.forEach((navItem) => {
    navItem.classList.toggle("hover:border-l-4", "border-sky-500");
  });
  nav.classList.toggle("pointer-events-none");
  nav.classList.toggle("opacity-0");
  nav.classList.toggle("top-14");
  nav.classList.toggle("top-10");
};
