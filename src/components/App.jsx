import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import { useState, useEffect } from 'react';
import Button from './button/Button';
import Modal from './modal/Modal';
import Loader from './loader/Loader';
import getImages from 'api/api';

const App = () => {
  const [images, setImages] = useState([])
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [imgModal, setImgModal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [moreBtn, setMoreBtn] = useState(false)
  

  useEffect(() => {
   
    const uploadImg = async () =>{
      setIsLoading(true)
      try{
        const data = await getImages(searchText,page)
        
        setImages((prevState)=>([
          ...prevState,
          ...data.hits
        ]))
        setMoreBtn(page < Math.ceil(data.totalHits/12))
      } catch (e) {
        console.log(e)
      }
      finally{
        setIsLoading(false)
      }
    }
    if(searchText.length > 0){
      uploadImg()
    }
  }, [searchText, page])

  const submitSearch = (newSearch) => {
    setSearchText(newSearch)
    setImages([]);
    setPage(1)
    
  }

  const handleOpenModal = (img) =>{
    setImgModal(img)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setImgModal(null)
    setModalOpen(false)
  }

  const handleLoadMore = () => {
    setPage(page+1)
  }
  return (
    <div>
      {isLoading && <Loader/>}
        <Searchbar submitSearch={submitSearch} />
        {images.length ? (
          <ImageGallery
            handleOpenModal={handleOpenModal}
            imagesStore={images}
          />
        ) : null}
        {moreBtn && (
          <Button handleLoadMore={handleLoadMore} />
        ) }
        {modalOpen && (
          <Modal
            imgModal= {imgModal}
            handleCloseModal={handleCloseModal}
          />
        )}
    </div>
  )
}

export default App