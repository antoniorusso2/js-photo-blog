// funzioni creazione DOM elementi e img
/**
 *
 * @param {any} tag
 * @param {string Array} classList
 * @param {string Array} content
 * @returns
 */
function createDOMElement(tag, classList = [], content = []) {
  const element = document.createElement(tag);
  if (classList.length > 0) {
    element.classList.add(...classList);
  }

  if (Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      element.appendChild(content[i]);
    }
  } else if (content instanceof HTMLElement) {
    element.appendChild(content);
  } else if (typeof content === "string") {
    element.innerHTML = content;
  } else {
    console.log("elemento non riconosciuto");
  }
  return element;
}

/**
 *
 * @param {url} src
 * @param {string Array} classList
 * @param {any} alt
 * @returns img html element
 */
function createDOMImg(src = "#", classList = [], alt = "") {
  const img = document.createElement("img");

  img.classList.add(...classList);
  img.src = src;
  img.alt = alt;

  return img;
}

function toggleOverlay() {
  overlay.classList.toggle("d-flex");
  overlay.classList.toggle("d-none");
  body.classList.toggle("overflow-hidden");
  body.classList.toggle("overflow-auto");
}
//row dove appendere la col con la card
const rowElement = document.querySelector(".my_parent");

//elementi overflow body e overlay
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const closeOverlayBtn = document.querySelector(".close_overlay");

//container img overlay
const overlayImgContainer = document.querySelector(".img_overlay");

const BASE_URL = "https://jsonplaceholder.typicode.com/";
const URL_BODY_IMG = "photos";

const imgEndpoint = BASE_URL + URL_BODY_IMG;
// console.log(textEndpoint)

//unica richiesta http
axios
  .get(imgEndpoint, {
    params: {
      _limit: 8,
    },
  })
  .then((res) => {
    // console.log(res);//obj

    const response = res.data; //array
    console.log(response);

    const overlayImg = createDOMElement("img");
    overlayImgContainer.appendChild(overlayImg);

    response.forEach((element) => {
      // console.log(element);

      let imgUrl = element.url;
      let imgTitle = element.title;

      //contenuto card, e pin
      const card = `
          <div class="card mb-5 position-relative">
             <div class="pin">
               <img src="./img/pin.svg" alt="">
             </div>
             <img src="${imgUrl}" class="card-img-top p-3" alt="">
                <div class="card-body">
               <p class="card-text fst-italic">${imgTitle}</p>
             </div>
          </div>`;

      // const card = createDOMElement("div", [
      //   "card",
      //   "mb-5",
      //   "position-relative",
      // ]);

      // card.innerHTML = cardContent;

      //colonna alla quale andare ad appendere la card
      const col = createDOMElement("div", [
        "col-md-6",
        "col-lg-4",
        "d-flex",
        "justify-content-center",
      ]);

      col.innerHTML = card;

      rowElement.appendChild(col);

      col.addEventListener("click", (event) => {
        // console.log(event.target);
        // overlayImgContainer.innerHTML = "";

        if (event.target.tagName === "IMG") {
          toggleOverlay();
          overlayImg.src = imgUrl;
        }

        // overlayImg.src = cardImg.src;
      });
    });

    closeOverlayBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      toggleOverlay();
    });

    overlay.addEventListener("click", (event) => {
      if (event.target.tagName !== "IMG") {
        toggleOverlay();
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

// console.log(body.classList.contains("overflow-hidden"));
