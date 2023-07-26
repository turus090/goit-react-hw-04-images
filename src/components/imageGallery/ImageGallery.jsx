import propTypes from 'prop-types'
import ImageItem from './ImageItem'
import s from './imageGallery.module.css'

const ImageGallery = ({imagesStore, handleOpenModal}) => {
const ImageCollection = imagesStore.map(imageItem => {
    return (
    <ImageItem
        key ={imageItem.id}
        previewURL={imageItem.previewURL}
        largeImageURL ={imageItem.largeImageURL}
        handleOpenModal = {handleOpenModal}
        tags={imageItem.tags}
    />
    )
})
    return (
        <div className={s.imageGallery}>
           {ImageCollection}
        </div>
    )
}

ImageGallery.propTypes = {
    imagesStore: propTypes.array,
    handleOpenModal: propTypes.func
}

export default ImageGallery