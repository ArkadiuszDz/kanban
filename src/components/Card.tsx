import React, { FunctionComponent } from 'react';
import { useDrag } from 'react-dnd';
import { Types } from '../constants/dnd';
import { CardProps, CardDispatch } from '../containers/Card';
import { DeepReadonly } from 'ts-essentials';
import { Task, Column } from '../logic/Board/store';
import '../styles/card.scss';

interface CardItemProps
  extends
    CardProps,
    CardDispatch,   
    DeepReadonly<{}> {
      task: Task;
      columns: Column[];
      boardName: string;
    }


const Card: FunctionComponent<CardItemProps> = ({task, columns, removeTask, editTask, boardName}) => {

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
    //removeTask(status, id);
  }

  const editTaskHandler = (boardName: string, task: Task) => {
    editTask(boardName, {
      ...task
    });
  }

  return (
    <div className="card" id={task._id} ref={drag} style={{opacity: isDragging ? 0 : 1}}>
      <h2 className="title">{task.name}</h2>
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
        <select onChange={e => editTaskHandler(boardName,{
              ...task,
              status_id: e.target.value
            }
          )}>
          <option value="" hidden>Change status</option>
          {
            columns &&
            columns.map((element: Column, index: number) => {
              return (
                <option
                  value={element._id}
                  key={`${element.status}-${index}`}
                  disabled={task.status === element.status}
                >{element.status.split('-').join(' ')}</option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}

export default Card;
