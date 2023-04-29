// const axios = require('axios');

// export default function fetchImages(request, pageNumber) {
//   let savedRequest = request;
//   const URL = `https://pixabay.com/api/?key=35869427-65f66342165db7316d77cd90d&q=${savedRequest}`;
//   const fields = `&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`;
//   return fetch(`${URL}${fields}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

//

// //! const axios = require('axios');
// const axios = require('axios/dist/node/axios.cjs'); // node

import axios from 'axios';

export default async function fetchImages(request, pageNumber) {
  let savedRequest = request;
  const URL = `https://pixabay.com/api/?key=35869427-65f66342165db7316d77cd90d&q=${savedRequest}`;
  const fields = `&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`;

  try {
    const response = await axios.get(`${URL}${fields}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
