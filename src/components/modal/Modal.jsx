
import s from './modal.module.css';
import { Component, createRef } from 'react';


class Modal extends Component{
  constructor(props){
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
