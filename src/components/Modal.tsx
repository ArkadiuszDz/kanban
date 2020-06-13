import React, { FunctionComponent } from 'react';
// import { Task } from '../logic/Board/store';
import { RouteComponentProps, StaticContext } from 'react-router';
// import { LocationState } from 'history';


interface ModalItemProps 
  extends RouteComponentProps<{ task_id: string }, StaticContext, { modal: boolean }> {

}


const Modal: FunctionComponent<ModalItemProps> = ({ location, match }) => {

  return (
    location.state.modal ?
    <div className="modal-window">
      <div className="modal-inner">
        Modal window
      </div>
    </div>
    : 
    null
  )
}

export default Modal;
