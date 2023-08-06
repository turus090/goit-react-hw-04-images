import propTypes from 'prop-types'
import s from './modal.module.css';
import { useEffect, useRef } from 'react';

const Modal = ({imgModal, handleCloseModal}) => {

  const modalRef = useRef(null)
  useEffect(()=>{
    const handleCloseClick = (e) => {
      if (e.target === e.currentTarget) {
        handleCloseModal()
      }
     }
    const handleClose = (e) => {
      if (e.code === 'Escape') {
       handleCloseModal()
      }
     }
   
    window.addEventListener('keydown', handleClose)
    modalRef.current.addEventListener('click', handleCloseClick)
    return ()=>{
      window.removeEventListener('keydown', handleClose)

    }
  },[handleCloseModal])
  return (
    <div ref={modalRef} className={s.modalContainer}>
      <img className={s.modalImg} src={imgModal} alt="modal" />
    </div>
  )

 }
 Modal.propTypes = {
  imgModal: propTypes.string,
  handleCloseModal: propTypes.func
 }
 
export default Modal;
