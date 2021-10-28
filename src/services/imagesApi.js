import axios from "axios"

const apiKey = "23396378-fed243cf5b1bf6c558340d468"

axios.defaults.baseURL = "https://pixabay.com/api/"

const fetchData = ({
  searchQuery = "",
  currentPage = 1,
}) => {
  return axios
    .get(
      `/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits)
}

export default { fetchData }
