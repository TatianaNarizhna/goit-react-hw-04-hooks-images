import  { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./services/apiService";
import SearchBar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";

export default function App()  {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if(searchName === '') {
      return;
    }
      fetchSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName])
  
   const fetchSearch = () => {
    setLoader(true);
    api
     .fetchSearch(searchName, page)
      .then((res) => {
        const { hits } = res;
        setImages(prevState => [...prevState, ...hits])
        setPage(prevState => prevState + 1)

        if (images.length > 12) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch(error => setError(error))
      .finally(() => setLoader(false))
  };

   const formSubmit = query => {
     if( query !== searchName ) {
      setSearchName(query);
      setPage(1)
      setImages([]);
      setError(null);
     }
  };

  // const prevSearch = useRef();

   const toggleModal = () => {
    setShowModal(showModal =>  !showModal);
  };

   const onImgClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setModalImg({
      modalImg: e.target.dataset.img,
    });
    toggleModal();
  };

    return (
      <div>
        {loader && <Loader />}
        {error && <p>{error.message}</p>}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
        <SearchBar onSubmit={formSubmit} />
        <ImageGallery images={images} onImgClick={onImgClick} />
      
        {images.length > 0 && !loader && <Button onClick={fetchSearch} />}
        {showModal && <Modal modalImg={modalImg} onClose={toggleModal} />}
      
      </div>
    );
}


