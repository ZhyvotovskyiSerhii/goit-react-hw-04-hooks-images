import { useState, useEffect } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import imagesApi from "./services/imagesApi";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalImg, setModalImg] = useState({ url: null, tag: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      fetchImages().then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [searchQuery]);

  const onChangeQuery = (query) => {
    setImages([]);
    setError(null);
    setSearchQuery(query);
    setSearchPage(1);
  };

  const fetchImages = () => {
    setIsLoaded(true);
    return imagesApi
      .fetchData({
        searchQuery,
        currentPage: searchPage,
      })
      .then((hits) => {
        setImages([...images, ...hits]);
        setSearchPage(searchPage + 1);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoaded(false));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onImageClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }

    setModalImg({
      largeUrl: e.target.dataset.url,
      tags: e.target.alt,
    });
    toggleModal();
  };
  return (
    <div className="container">
      <Searchbar onSubmit={onChangeQuery} />

      {error && (
        <h2>
          Sorry something went wrong, try again later!(
          {error.message})
        </h2>
      )}

      <ImageGallery images={images} onClick={onImageClick} />

      {isLoaded && (
        <Loader
          type="ThreeDots"
          color="blue"
          height={80}
          width={100}
          timeout={4000}
        />
      )}

      {images.length > 0 && !isLoaded && <Button onClick={fetchImages} />}

      {isModalVisible && (
        <Modal onClose={toggleModal}>
          <img src={modalImg.largeUrl} alt={modalImg.tag} />
        </Modal>
      )}
    </div>
  );
};

export default App;
