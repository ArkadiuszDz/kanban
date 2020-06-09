import React, { FunctionComponent } from 'react';
import { useDrag } from 'react-dnd';
import { Types } from '../constants/dnd';
import { Task } from '../logic/Board/store';
import '../styles/card.scss';

interface CardProps {
  // id: string;
  // name: string;
  // status: string;
  // description: string;
  statusArray: string[];
  task: Task;
  removeTask: (status: string, id: string) => void,
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => void
}


const Card: FunctionComponent<CardProps> = ({task, removeTask, changeStatus, statusArray}) => {

  const [{ isDragging }, drag] = useDrag({
    item: { 
      type: Types.CARD, 
      id: task._id, 
      status: task.status 
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  });

  const removeHandler = (status: string, id: string) => {
    removeTask(status, id);
  }

  const changeStatusHandler = (prevStatus: string, nextStatus: string, id: string) => {
    changeStatus(prevStatus, nextStatus, id);
  }

  return (
    <div className="card" id={task._id} ref={drag} style={{opacity: isDragging ? 0 : 1}}>
      <h2 className="title">{task.name}</h2>
      <p className="description">{task.description}</p>
      <p className="status">{task.status.split('-').join(' ')}</p>
      <div className="btn-wrapper">
        <div className="btn">
          <button onClick={e => {
            e.preventDefault();
            removeHandler(task.status, task._id);
          }}>Delete</button>
        </div>
      </div>
      <div className="select-wrapper">
        <select onChange={e => changeStatusHandler(task.status, e.target.value, task._id)}>
          <option value="" hidden>Change status</option>
          {
            statusArray &&
            statusArray.map((element: string, index: number) => {
              return (
                <option
                  value={element}
                  key={`${element}-${index}`}
                  disabled={task.status === element}
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
