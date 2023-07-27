import { useState, useEffect, useCallback } from "react";
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import Modal from './modal/Modal';
import Loader from './loader/Loader';
import getImages from 'api/api';

const App = () => {
    const [state, setState] = useState({
        images: [],
        searchText: '',
        page: 1,
        countOnPage: 20,
        modalOpen: false,
        imgModal: null,
        isLoading: false,
        showImg: false 
    })   
    const reqImg = useCallback( async () =>{
        const data = await getImages(state.searchText, state.countOnPage, state.page)
        setState({
            ...state,
            images: [
            ...state.images,
            ...data.hits
            ],
            isLoading:false
        })
    }, [state.showImg, state.isLoading, state.searchText, setState])
    useEffect(()=>{
        reqImg()
    }, [ reqImg])

   const updateSearch = newSearch => {
    setState({
        ...state,
        searchText: newSearch,
        images: newSearch.length === 0 ? [] : state.images,
        isLoading: false,
        showImg: false
    })
  };

   const searchAPI = () => {
    setState({
            ...state,
            showImg: true
        })
  };

  const handleOpenModal = img => {
    setState({
        ...state,
        imgModal: img,
        modalOpen: true
    })
  };
 const  handleCloseModal = () => {
    setState({
      ...state,  
      imgModal: null,
      modalOpen: false
    })
  };

  const handleLoadMore = () => {
        setState({
        ...state,    
        page:state.page+1,
        isLoading: true
    })
    }
    return(
        <div>
        {state.isLoading && <Loader/>}
        <Searchbar updateSearch={updateSearch} searchAPI={searchAPI} />
        {state.showImg ? (
          <ImageGallery
            handleOpenModal={handleOpenModal}
            imagesStore={state.images}
          />
        ) : null}
        {state.images.length !== 0 ? (
          <Button handleLoadMore={handleLoadMore} />
        ) : null}
        {state.modalOpen && (
          <Modal
            imgModal={state.imgModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    )
}

export default App;