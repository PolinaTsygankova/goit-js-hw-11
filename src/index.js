//* При натисканні на самбіт в окремому файлі айпі жс виконується запит з інтупу та повертає данні в консоль
import Notiflix from 'notiflix';
import fetchImages from './components/api';

const refs = {
  input: document.querySelector("input[type='text']"),
  submitBtn: document.querySelector("button[type='submit']"),
  form: document.querySelector('.search-form'),
  divGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

function onSubmitBtn(e) {
  e.preventDefault();
  const value = refs.input.value.trim();
  refs.divGallery.innerHTML = ' ';
  fetchImages(value).then(res => {
    if (res.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
      const images = res.hits;

      refs.divGallery.insertAdjacentHTML('beforeend', makeMarkup(images));
    }
  });
  // .catch(error => {
  //   if (error.message === '404') {
  //     // Notiflix.Notify.failure('Oops, there is no country with that name!');
  //   } else {
  //     console.log(error.message);
  //   }
  // });
}

function makeMarkup(images) {
  return images
    .map(img => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;

      return `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width=320 height=220 />
            <div class="info">
                  <p class="info-item">
                        <b>Likes</b>
                        <b>${likes}</b>
                 </p>
                <p class="info-item">
                    <b>Views</b>
                    <b>${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <b>${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <b>${downloads}</b>
                </p>
            </div>
        </div>
            `;
    })
    .join(' ');
}

let pageNumber = 0;

function onLoadMoreForIncrementPage() {
  let sum = (pageNumber += 1);
  console.log(sum);
  return sum;
}

const result = onLoadMoreForIncrementPage();
console.log(result);

refs.loadMoreBtn.addEventListener('click', onLoadMoreForIncrementPage);
refs.form.addEventListener('submit', onSubmitBtn);
