import Notiflix from 'notiflix';
import fetchImages from './components/api';

const refs = {
  input: document.querySelector("input[type='text']"),
  submitBtn: document.querySelector("button[type='submit']"),
  form: document.querySelector('.search-form'),
  divGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let pageNumber = 1;

function onSubmitBtn(e) {
  e.preventDefault();
  const value = refs.input.value.trim();
  refs.divGallery.innerHTML = ' ';
  pageNumber = 1;

  fetchImages(value, pageNumber)
    .then(res => {
      if (res.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (value === '') {
        Notiflix.Notify.failure('Please write what you want to find.');
      } else if (res.totalHits <= 40) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        const images = res.hits;

        refs.divGallery.insertAdjacentHTML('beforeend', makeMarkup(images));
      } else {
        Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
        const images = res.hits;

        refs.divGallery.insertAdjacentHTML('beforeend', makeMarkup(images));
        refs.loadMoreBtn.classList.remove('invisible');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
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
          <div class="photo-wrapper"> 
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width=320 height=240 />
            </div>
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

function incrementPage() {
  return (pageNumber += 1);
}

async function onLoadMoreBtn() {
  const value = refs.input.value.trim();

  fetchImages(value, incrementPage()).then(res => {
    const pageAmount = Math.ceil(res.totalHits / 40);

    if (pageNumber < pageAmount) {
      refs.loadMoreBtn.classList.remove('invisible');
    } else if (pageNumber === pageAmount) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtn.classList.add('invisible');
    }

    const images = res.hits;

    refs.divGallery.insertAdjacentHTML('beforeend', makeMarkup(images));
  });
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
refs.form.addEventListener('submit', onSubmitBtn);
