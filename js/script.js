
const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const URL_BODY_IMG = 'photos';
// const URL_BODY_TITLE = 'photos/title';

const imgEndpoint = BASE_URL + URL_BODY_IMG;
// const textEndpoint = BASE_URL + URL_BODY_TEXT;
// console.log(textEndpoint)

//row dove appendere la col con la card
const rowElement = document.querySelector('.my_parent');
// console.log(rowElement);

//unica richiesta http
axios.get(imgEndpoint, {
  params: {
    _limit: 6
  }
})
  .then((res) => {
    // console.log(res);//obj

    const response = res.data;//array
    console.log(response);

    response.forEach(element => {
      // console.log(element);

      let imgUrl = element.url;
      let imgTitle = element.title;

      rowElement.innerHTML += `
        <div class="col-md-6 col-lg-4 d-flex justify-content-center">
          <div class="card mb-5 position-relative">
            <div class="pin">
              <img src="./img/pin.svg" alt="">
            </div>
            <img src="${imgUrl}" class="card-img-top p-3" alt="">
            <div class="card-body">
              <p class="card-text fst-italic">${imgTitle}</p>
            </div>
          </div>
        </div>`;
    });

  })
  .catch((error) => {
    console.error(error);
  });


