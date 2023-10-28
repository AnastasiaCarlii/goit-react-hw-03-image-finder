import axios from 'axios';

const API_KEY = '38158764-820b680c529367ace5249e2e2';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  try {
    const { data } = await axios.get(
      `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    console.log(data);

    const images = data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => {
        return {
          id,
          webformatURL,
          largeImageURL,
          tags,
        };
      }
    );
    return { images, totalImages: data.totalHits };
  } catch (error) {
    console.log('something went wrong', error);
  }
};
