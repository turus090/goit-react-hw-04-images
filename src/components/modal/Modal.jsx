import propTypes from 'prop-types';
import s from './modal.module.css';
import { Component, createRef } from 'react';

/*
const Modal = ({imgModal, handleCloseModal}) => {

  return (
    <div onClick={handleCloseModal} className={s.modalContainer}>
      <img className={s.modalImg} src={imgModal} alt="modal" />
    </div>
  );
};
*/
class Modal extends Component{
  constructor(){
  super()
  }
  bodyModalRef = createRef()
  componentDidMount(){
  this.bodyModalRef.current.addEventListener("click", this.props.handleCloseModal)
  }
  componentWillUnmount(){
    this.bodyModalRef.current.removeEventListener("click", this.props.handleCloseModal)
  }
  render(){
    return (
      <div ref={this.bodyModalRef} className={s.modalContainer}>
        <img className={s.modalImg} src={this.props.imgModal} alt="modal" />
      </div>
    )
  }
}

export default Modal;
