import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
// import Loader from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import api from "./services/apiService";
import SearchBar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";

class App extends Component {
  state = {
    searchName: " ",
    images: [],
    page: 1,
    loader: false,
    error: null,
    showModal: false,
    modalImg: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      this.fetchSearch();
    }
  }

  formSubmit = (searchName) => {
    this.setState({ searchName: searchName, page: 1, images: [] });
  };

  fetchSearch = () => {
    const { searchName, page, images } = this.state;
    this.setState({ loader: true });

    api
      .fetchSearch(searchName, page)
      .then((res) => {
        const { hits } = res;

        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
        if (images.length > 12) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loader: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImgClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    this.setState({
      modalImg: e.target.dataset.img,
    });
    this.toggleModal();
  };

  render() {
    const { images, loader, showModal, modalImg } = this.state;
    return (
      <div>
        {loader && <Loader />}
        {this.state.error && <p>{this.state.error.message}</p>}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
        <SearchBar onSubmit={this.formSubmit} />
        <ImageGallery images={images} onImgClick={this.onImgClick} />

        {images.length > 0 && !loader && <Button onClick={this.fetchSearch} />}
        {showModal && <Modal modalImg={modalImg} onClose={this.toggleModal} />}
      
      </div>
    );
  }
}

export default App;
