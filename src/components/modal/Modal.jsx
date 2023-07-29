import s from './modal.module.css';
import { Component, createRef } from 'react';

class Modal extends Component{
  modalRef = createRef()
  handleClose = (e) =>{
    if (e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  }
  handleCloseClick = (e) =>{
   if (e.target === e.currentTarget) {
      this.props.handleCloseModal();
   }
  }
  componentDidMount(){
  window.addEventListener("keydown",this.handleClose)
  this.modalRef.current.addEventListener("click",this.handleCloseClick)
  }
  componentWillUnmount(){
    window.removeEventListener("keydown", this.handleClose)
    this.modalRef.current.removeEventListener("click", this.handleCloseClick)
  }
  render(){
    return (
      <div ref={this.modalRef} className={s.modalContainer}>
        <img className={s.modalImg} src={this.props.imgModal} alt="modal" />
      </div>
    )
  }
}

export default Modal;
