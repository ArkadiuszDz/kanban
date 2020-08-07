import React, { FunctionComponent, useEffect } from 'react';
import { DeepReadonly } from 'ts-essentials';
// import { Column } from '../logic/Board/store';
import { RouteComponentProps } from 'react-router';
import { ModalDispatch, ModalProps } from '../containers/Modal';
import '../styles/modal.scss';

// import { LocationState } from 'history';

interface ComponentProps
  extends 
  ModalDispatch,
  ModalProps,
  RouteComponentProps<{ board: string, task_id: string }>,
  DeepReadonly<{}>
  {}


const Modal: FunctionComponent<ComponentProps> = ({ match, getTaskDetails, taskItem }) => {

  // eslint-disable-next-line
  useEffect(() => getTaskDetails(match.params.board, match.params.task_id), []);

  return (
    <div className="modal-window">
      <div className="modal-inner">
        <h2>
          {taskItem.name}
        </h2>
        <p>
          {taskItem.description}
        </p>
        <p>Status: {taskItem.status}</p>
        <div className="select-wrapper">

        </div>
      </div>
    </div>
  )
}

export default Modal;
