import React, { FunctionComponent } from 'react';
import { useDrag } from 'react-dnd';
import { Types } from '../constants/dnd';
import '../styles/card.scss';

interface CardProps {
  id: string;
  name: string;
  status: string;
  description: string;
  statusArray: string[];
  removeTask: (status: string, id: string) => void,
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => void
}


const Card: FunctionComponent<CardProps> = ({id, name, status, description, removeTask, changeStatus, statusArray}) => {

  const [{ isDragging }, drag] = useDrag({
    item: { type: Types.CARD, id: id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      dupa: monitor
    }),
    begin: monitor => {
      console.log(monitor, 'dragging started');
    }
  });

  const removeHandler = (status: string, id: string) => {
    removeTask(status, id);
  }

  const changeStatusHandler = (prevStatus: string, nextStatus: string, id: string) => {
    changeStatus(prevStatus, nextStatus, id);
  }

  return (
    <div className="card" id={id} ref={drag}>
      <h2 className="title">{name}</h2>
      <p className="description">{description}</p>
      <p className="status">{status.split('-').join(' ')}</p>
      <div className="btn-wrapper">
        <div className="btn">
          <button onClick={e => {
            e.preventDefault();
            removeHandler(status, id);
          }}>Delete</button>
        </div>
      </div>
      <div className="select-wrapper">
        <select onChange={e => changeStatusHandler(status, e.target.value, id)}>
          <option value="" hidden>Change status</option>
          {
            statusArray &&
            statusArray.map((element: string, index: number) => {
              return (
                <option
                  value={element}
                  key={`${element}-${index}`}
                  disabled={status === element}
                >{element.split('-').join(' ')}</option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}

export default Card;
