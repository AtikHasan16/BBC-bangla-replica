// Get category data from API
const loadCategory = async () => {
  const response = await fetch("https://news-api-fs.vercel.app/api/categories");
  const data = await response.json();
  displayCategory(data.categories);
};
// display the category section
const displayCategory = (data) => {
  const categoryContainer = document.getElementById("category-container");
  //   console.log();

  data.forEach((d) => {
    const catId = d.id;
    categoryContainer.innerHTML += `<li id="${catId}"
            onclick="buttonClicked('${catId}')"
            class=" cat-btn border-b-4 border-b-white hover:border-b-4 hover:border-red-700 cursor-pointer"
          >
            ${d.title}
          </li>`;
  });
};
//after category Button clicked
const buttonClicked = (id) => {
  // for button active design
  const allId = document.querySelectorAll(".cat-btn");
  allId.forEach((element) => {
    element.classList.remove("select-button");
  });
  //   console.log(document.getElementById(id));
  const category = document.getElementById(id);
  category.classList.add("select-button");

  // Get news data by category-wise
  const loadNews = async () => {
    const response = await fetch(
      `https://news-api-fs.vercel.app/api/categories/${id}`
    );
    const data = await response.json();
    displayNews(data);
  };
  //   news data called
  loadNews();
};
// display news by clicking category button
const displayNews = (news) => {
  // console.log(news);
  const newContainer = document.getElementById("news-container");
  newContainer.innerHTML = "";
  news.articles.forEach((data) => {
    // console.log(data.link);

    // console.log(data.image.srcset[7].url);
    newContainer.innerHTML += `<div class="col-span-2">
        <figure>
          <img src="${data.image.srcset[7].url}" alt="" />
        </figure>
        <h1 class="text-xl">
          <a
          target="blank"
            href="${data.link}"
            class="no-underline hover:underline cursor-pointer decoration-gray-300"
            >${data.title}</a
          >
        </h1>
      </div>`;
  });
};
// default news display

const defaultNews = async () => {
  const response = await fetch(
    "https://news-api-fs.vercel.app/api/categories/main"
  );
  const data = await response.json();

  const newContainer = document.getElementById("news-container");
  data.articles.forEach((data) => {
    // console.log(data.link);
    newContainer.innerHTML += `<div class="col-span-2">
        <figure>
          <img src="${data.image.srcset[7].url}" alt="" />
        </figure>
        <h1 class="text-xl">
          <a
          target="blank"
            href="${data.link}"
            class="no-underline hover:underline cursor-pointer decoration-gray-300"
            >${data.title}</a
          >
        </h1>
      </div>`;
  });
};
// default news called
defaultNews();
// Category data called
loadCategory();
