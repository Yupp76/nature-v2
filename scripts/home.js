const apiBaseUrl = "https://jsolutions.no/wp-json";

const carousel = document.querySelector(".S01-cards-carousel");
const nextBtn = document.querySelectorAll("#next");
const nextBtnMob = document.querySelectorAll("#next-mobile");
const prevBtn = document.querySelectorAll("#prev");
const prevBtnMob = document.querySelectorAll("#prev-mobile");

const nextButtons = [nextBtn, nextBtnMob];
const prevButtons = [prevBtn, prevBtnMob];

nextButtons.forEach((elem) => {
  elem[0].addEventListener("click", () => slideCarousel("next"));
});

prevButtons.forEach((elem) => {
  elem[0].addEventListener("click", () => slideCarousel("prev"));
});

/**
 * Slides the carousel to rigth or left
 * @param {String} btnType
 */
function slideCarousel(btnType) {
  if (btnType === "next") {
    carousel.style.transform = "translateX(-50%)";
  } else {
    carousel.style.transform = "translateX(0%)";
  }
}

/**
 * Renders the carousel lists
 * @param {Array} blogPosts
 */
function renderCarouselLists(posts) {
  const lists = [posts.slice(0, 4), posts.slice(4)];

  const secondListWrapper = document.createElement("div");
  secondListWrapper.setAttribute("class", "S01-cards-list");

  lists.forEach((list) => {
    const listWrapper = document.createElement("div");
    listWrapper.setAttribute("class", "S01-cards-list");

    list.forEach((item) => {
      const { id, featured_media_src_url: cover } = item;
      const {
        excerpt: { rendered: pollutedDesc },
      } = item;
      const {
        title: { rendered: title },
      } = item;

      const desc = pollutedDesc
        .replaceAll("[&hellip;]</p>\n", "")
        .replaceAll("<p>", "");

      const card = renderPostCard(id, cover, title, desc);
      listWrapper.appendChild(card);
    });

    carousel.appendChild(listWrapper);
  });
}

/**
 * Gets Blog posts from worpdress api and renders
 * the appropriate UI deppending on the api response
 */
const getBlogPosts = async () => {
  try {
    let getData = await fetch(`${apiBaseUrl}/wp/v2/posts?per_page=8`);
    let response = await getData.json();
    // shows carousel lists UI
    renderCarouselLists(response);
  } catch (err) {
    // shows an error message
    showErrorMsg(carousel);
    nextBtn.forEach((elem) => {
      elem.disabled = true;
    });
    prevBtn.forEach((elem) => {
      elem.disabled = true;
    });
  }
};

getBlogPosts();
