import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';

import Button from './button/Button';
import Modal from './modal/Modal';
import Loader from './loader/Loader';
import getImages from 'api/api';

export class App extends Component {
  state = {
    images: [],
    searchText: '',
    page: 1,
    countOnPage: 20,
    modalOpen: false,
    imgModal: null,
    isLoading: false,
    showImg: false
  };
  

  componentDidUpdate = async (prevProps,prevState) => {
    if (prevState.showImg !== this.state.showImg || prevState.isLoading !== this.state.isLoading){
      const data = await getImages(prevState.searchText, prevState.countOnPage, prevState.page)
      this.setState(prevState=>({
        images: [
          ...prevState.images,
          ...data.hits
        ],
        isLoading:false
      }))
    }
  }

   updateSearch = newSearch => {
    this.setState(prevState=>({
      searchText: newSearch,
      images: newSearch.length === 0 ? [] : prevState.images,
      isLoading: false,
      showImg: false
    }))
  };

   searchAPI = async () => {
   this.setState(prevState=>({
      showImg: true
    }))
  };

   handleOpenModal = img => {
    this.setState(prevState=>({
      imgModal: img,
      modalOpen: true
    }))

  };
   handleCloseModal = () => {
    this.setState(prevState=>({
      imgModal: null,
      modalOpen: false
    }))
  };

   handleLoadMore = () => {
      this.setState(prevState=>({
        page:prevState.page+1,
        isLoading: true
    }))
    }
    
  render() {
  
    return (
      <div>
        {this.state.isLoading && <Loader/>}
        <Searchbar updateSearch={this.updateSearch} searchAPI={this.searchAPI} />
        {this.state.showImg ? (
          <ImageGallery
            handleOpenModal={this.handleOpenModal}
            imagesStore={this.state.images}
          />
        ) : null}
        {this.state.images.length !== 0 ? (
          <Button handleLoadMore={this.handleLoadMore} />
        ) : null}
        {this.state.modalOpen && (
          <Modal
            imgModal={this.state.imgModal}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
