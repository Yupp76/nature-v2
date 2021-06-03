const apiBaseUrl = "https://jsolutions.no/wp-json";

const loadingSpinner = document.querySelector("#loading-spinner");
const cardsGrid = document.querySelector(".cards-wrapper");
const loadBtn = document.querySelector("#load-more");

let partsLoaded = 0;
let maxParts = 0

/**
 * Gets Blog posts from worpdress api and renders
 * the appropriate UI deppending on the api response
 */
 const getBlogPosts = async (pageOffset) => {    
    const page = pageOffset || 1

    try {
      const getData = await fetch(`${apiBaseUrl}/wp/v2/posts?per_page=8&page=${page}`);
      const response = await getData.json();    
      
      getData.headers.forEach((val, key) => {         
          if (key === "x-wp-totalpages") {
            maxParts = parseInt(val);
          }
      });

      if (page === maxParts + 1) {
        loadBtn.disabled = true;
        loadBtn.innerHTML = "No more posts available"
      } else {
        loadBtn.children[0].classList.remove("fa-spin");          
        loadingSpinner.style.display = "none";
        partsLoaded++;
        response.forEach((item) => {        
          const { id, featured_media_src_url: cover } = item;
          const { excerpt: { rendered: pollutedDesc } } = item;
          const { title: { rendered: title } } = item;
    
          const desc = pollutedDesc
            .replaceAll("[&hellip;]</p>\n", "")
            .replaceAll("<p>", "");
      
          const card = renderPostCard(id, cover, title, desc);
          cardsGrid.appendChild(card)          
        })
      }
    } catch(err) {      
      // shows an error message
      showErrorMsg(cardsGrid);
      loadBtn.style.display = "none";
    }
  };
  
  getBlogPosts();
  
  loadBtn.addEventListener("click", (e) => {  
    loadBtn.children[0].classList.add("fa-spin");
    getBlogPosts(partsLoaded + 1);
  })
  