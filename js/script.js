//Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia(usiamo una qualunque immagine a piacimento);


//Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
//https://jsonplaceholder.typicode.com/photos?_limit=6
//Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.;

//Milestone 3
//Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!;

//Bonus
//rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata;

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const URL_BODY_IMG = 'photos';
// const URL_BODY_TITLE = 'photos/title';

const imgEndpoint = BASE_URL + URL_BODY_IMG;
// const textEndpoint = BASE_URL + URL_BODY_TEXT;
// console.log(textEndpoint)

//!TEST IMG ELEMENTO CARD
//elemento dom
const imgCard = document.querySelector('.card-img-top');

axios.get(imgEndpoint, {
  params: {
    _limit: 6
  }
})
  .then((res) => {
    console.log(res);
    const imgUrl = res.data[0].url;

    imgCard.src = imgUrl;

  })
  .catch((error) => {
    console.error('error');
  })


