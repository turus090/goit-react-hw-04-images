import propTypes from 'prop-types'
import s from './imageGallery.module.css'

const ImageItem = ({handleOpenModal, largeImageURL, previewURL, tags}) => {
    const handleClick = () => {
        handleOpenModal(largeImageURL)
    }
    return (
        <div onClick={handleClick} className={s.imageItem}>
                <img 
                    className={s.imageCard} 
                    src={previewURL} 
                    alt={tags} 
                />
        </div>
    )
}

ImageItem.propTypes = {
    handleOpenModal: propTypes.func,
    largeImageURL: propTypes.string,
    previewURL: propTypes.string,
    tags: propTypes.string
}

export default ImageItem