// funzioni creazione DOM elementi e img
function createDOMElement(tag, classList = [], content = []) {
  const element = document.createElement(tag);

  element.classList.add(...classList);

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
function createDOMImg(src = "#", classList = [], alt = "") {
  const img = document.createElement("img");

  img.classList.add(...classList);
  img.src = src;
  img.alt = alt;

  return img;
}
//aggiungi rimuovi determinate classi
function removeAddClasses(el, remove = [], add = []) {
  el.classList.remove(...remove);
  el.classList.add(...add);
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
      _limit: 6,
    },
  })
  .then((res) => {
    // console.log(res);//obj

    const response = res.data; //array
    console.log(response);

    response.forEach((element) => {
      // console.log(element);

      let imgUrl = element.url;
      let imgTitle = element.title;

      // rowElement.innerHTML += `
      //   <div class="col-md-6 col-lg-4 d-flex justify-content-center">
      //     <div class="card mb-5 position-relative">
      //       <div class="pin">
      //         <img src="./img/pin.svg" alt="">
      //       </div>
      //       <img src="${imgUrl}" class="card-img-top p-3" alt="">
      //       <div class="card-body">
      //         <p class="card-text fst-italic">${imgTitle}</p>
      //       </div>
      //     </div>
      //   </div>`;

      //creazione card e col da appendere alla pagina;
      //append degli elementi dato dalla funzione
      const card =
        // col per la card
        createDOMElement(
          "div",
          ["col-md-6", "col-lg-4", "d-flex", "justify-content-center"],
          // elemento card
          [
            createDOMElement(
              "div",
              ["card", "mb-5", "position-relative"],
              // pin da attaccare alla card
              [
                createDOMElement(
                  "div",
                  ["pin"],
                  [createDOMImg("./img/pin.svg", ["card-pin"])]
                ),
                // immagine
                createDOMImg(`${imgUrl}`, ["card-img-top", "p-3"]),
                // body della card
                createDOMElement(
                  "div",
                  ["card-body"],
                  [
                    createDOMElement(
                      "p",
                      ["card-text", "fst-italic"],
                      `${imgTitle}`
                    ),
                  ]
                ),
              ]
            ),
          ]
        );
      rowElement.appendChild(card);
    });

    //presa del'elemento card per aggiunta event
    const cardElement = document.querySelectorAll(".card-img-top");
    console.log(cardElement); //Node list

    //ciclo node list ed ascolto evento
    cardElement.forEach((el) => {
      //mostra immagine corrente
      el.addEventListener("click", () => {
        overlayImgContainer.innerHTML = "";
        //rimuovi d-none dall' overlay
        // overlay.classList.remove("d-none");
        removeAddClasses(overlay, ["d-none"], ["d-block"]);

        //blocca lo scroll della pagina impostando l'overflow su hidden

        // body.classList.remove("overflow-auto");
        // body.classList.add("overflow-hidden");
        removeAddClasses(body, ["overflow-auto"], ["overflow-hidden"]);

        //immagine da mostrare generata
        let overlayImgUrl = createDOMImg(`${el.src}`);

        overlayImgContainer.appendChild(overlayImgUrl);
      });
    });

    closeOverlayBtn.addEventListener("click", () => {
      overlay.classList.add("d-none");

      // body.classList.remove("overflow-hidden");
      // body.classList.add("overflow-auto");
      removeAddClasses(body, ["overflow-hidden"], ["overflow-auto"]);
    });

    overlay.addEventListener("click", () => {
      if (
        body.classList.contains("overflow-hidden") &&
        overlay.classList.contains("d-block")
      ) {
        removeAddClasses(body, ["overflow-auto"], ["overflow-hidden"]);
        removeAddClasses(overlay, ["d-block"], ["d-none"]);
        removeAddClasses(body, ["overflow-hidden"], ["overflow-auto"]);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

// console.log(body.classList.contains("overflow-hidden"));
