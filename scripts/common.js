
/**
 * Renders error message if failed to retrieve wp data
 * @param {HTMLElement} parentElem
 */
 function showErrorMsg(parentElem) {
    let messageWrapper = document.createElement("div");
    let spanTag = document.createElement("span");
  
    messageWrapper.setAttribute("class", "--centred");
    spanTag.setAttribute("class", "heading --block");
    spanTag.innerHTML = "An error occured, please refresh the page";
  
    messageWrapper.appendChild(spanTag);
    parentElem.appendChild(messageWrapper);
  }
  
/**
 * Renders a single post card
 * @param {Number} id 
 * @param {String} cover 
 * @param {String} title 
 * @param {String} desc 
 * @returns {HTMLElement}
 */
function renderPostCard(id, cover, title, desc) {
    // Card wrapper div element
    let cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", "card-wrapper");
  
    // Card cover
    let cardCover = document.createElement("img");
    cardCover.setAttribute("alt", "post cover");
    cardCover.setAttribute("src", cover);
  
    // Card body
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
  
    let titleHolder = document.createElement("h2");
    titleHolder.setAttribute("class", "heading4");
  
    let titleText = document.createElement("span");
    titleText.setAttribute("class", "--block");
    titleText.innerHTML = title;
    titleHolder.appendChild(titleText);
  
    let descHolder = document.createElement("div");
    descHolder.setAttribute("class", "card-p-holder");
  
    let descText = document.createElement("p");
    descText.setAttribute("class", "paragraph");
    descText.innerHTML = desc;
    descHolder.appendChild(descText);
  
    cardBody.appendChild(titleHolder);
    cardBody.appendChild(descHolder);
  
    // Card Footer
    let cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "card-footer");
  
    let linkToPost = document.createElement("a");
    linkToPost.setAttribute("class", "btn btn--sm btn--orange");
    linkToPost.setAttribute("href", `post.html?id=${id}`);
    linkToPost.innerHTML = "continue reading";
    cardFooter.appendChild(linkToPost);
  
    cardWrapper.appendChild(cardCover);
    cardWrapper.appendChild(cardBody);
    cardWrapper.appendChild(cardFooter);
  
    return cardWrapper;
  }