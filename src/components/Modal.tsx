import React, { FunctionComponent } from 'react';
// import { Task } from '../logic/Board/store';
import { RouteComponentProps } from 'react-router';


interface ModalItemProps 
  extends RouteComponentProps<{ task_id: string }> {

}


const Modal: FunctionComponent<ModalItemProps> = () => {
  return (
    true ? // here add isModal variable which comes from props or store (to be decided)
    <div className="modal-window">
      <div className="modal-inner">

      </div>
    </div>
    : 
    null
  )
}

export default Modal;
