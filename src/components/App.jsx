import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import { Component } from 'react';
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
    moreBtn: false
  };
  

  componentDidUpdate = async (prevProps,prevState) => {
    if (prevState.searchText !== this.state.searchText || prevState.page !== this.state.page){
      this.setState(()=>({
        isLoading: true
      }))
      try{
          const data = await getImages(this.state.searchText,this.state.page)
        console.log(data)
          this.setState(prevState=>({
            images: [
              ...prevState.images,
              ...data.hits
            ],
            moreBtn: this.state.page < Math.ceil(data.totalHits/12)
          }))

      } catch (e) {
        console.log(e)
      }
      finally{
        this.setState(()=>({
          isLoading:false
        }))
      }
    }
  }
   submitSearch = newSearch => {
    
    this.setState(()=>({
      searchText: newSearch,
      images:  [],
      isLoading: false
    }))
  }
   handleOpenModal = img => {
    this.setState(()=>({
      imgModal: img,
      modalOpen: true
    }))

  };
   handleCloseModal = () => {
    this.setState(()=>({
      imgModal: null,
      modalOpen: false
    }))
  };

   handleLoadMore = () => {
      this.setState(prevState=>({
        page:prevState.page+1,
    }))
    }
  render() {
  
    return (
      <div>
        {this.state.isLoading && <Loader/>}
        <Searchbar submitSearch={this.submitSearch} />
        {this.state.images.length ? (
          <ImageGallery
            handleOpenModal={this.handleOpenModal}
            imagesStore={this.state.images}
          />
        ) : null}
        {this.state.moreBtn && (
          <Button handleLoadMore={this.handleLoadMore} />
        ) }
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
