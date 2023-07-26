import axios from "axios";
const apiKey = '36205936-cd8fb584a14544fbe3836796c';
const baseUrl = 'https://pixabay.com/api/';

const getImages = async (searchText, countOnPage, page) => {
    const response = await axios.get(
      `${baseUrl}/?q=${searchText}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${countOnPage}&page=${page}`
    )
   return response.data
    }
export default getImages