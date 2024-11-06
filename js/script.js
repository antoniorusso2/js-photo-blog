//Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia(usiamo una qualunque immagine a piacimento);


//Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
//https://jsonplaceholder.typicode.com/photos?_limit=6
//Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.;

//Milestone 3
//Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!;

//Bonus
//rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata;

// function createDOMElement(tag, classList = [], content = '') {

//   const element = document.createElement(tag);

//   element.classList.add(...classList);
//   element.innerHTML = content;
// }

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const URL_BODY_IMG = 'photos';
// const URL_BODY_TITLE = 'photos/title';

const imgEndpoint = BASE_URL + URL_BODY_IMG;
// const textEndpoint = BASE_URL + URL_BODY_TEXT;
// console.log(textEndpoint)

//row dove appendere la col con la card
const rowElement = document.querySelector('.my_parent');
// console.log(rowElement);


axios.get(imgEndpoint, {
  params: {
    _limit: 6
  }
})
  .then((res) => {
    console.log(res);//obj

    const response = res.data;//array
    console.log(response);

    response.forEach(element => {
      // console.log(element);

      let imgUrl = element.url;
      let imgTitle = element.title;

      rowElement.innerHTML +=
        `<div class="col-md-6 col-lg-4">
          <div class="card mb-5">
            <img src="${imgUrl}" class="card-img-top p-3" alt="">
              <div class="card-body">
                <p class="card-text">${imgTitle}</p>
              </div>
          </div>
        </div>`;
    });



  })
  .catch((error) => {
    console.error(error);
  })


