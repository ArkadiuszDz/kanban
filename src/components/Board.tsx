import React, { FunctionComponent, useState, useEffect } from 'react';
import { BoardProps, BoardDispatch } from '../containers/Board';
import { DeepReadonly } from 'ts-essentials';
import { Task, Column } from '../logic/Board/store';
import Card from './Card';
import Status from './Status';
import '../styles/board.scss';

interface ComponentProps
  extends
    BoardProps,
    BoardDispatch,     
    DeepReadonly<{}> {}


const Board: FunctionComponent<ComponentProps> = ({addTask, removeTask, changeStatus, columns, tasks, getColumnsList}) => {

  const statusArray: string[] = [];

  columns.forEach((element: Column) => {
    statusArray.push(element.status);
  })
 
  useEffect(() => getColumnsList("development"), []);

  const [card, setCard] = useState({
    id: '',
    name: '',
    description: '',
    status: ''
  });

  const inputHandler = (e: any) => {
    e.preventDefault();
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  }

  const saveTask = (e: any) => {
    e.preventDefault();
    // if (card.status !== '') {
    //   addTask(card);
    //   setCard({
    //     id: '',
    //     name: '',
    //     description: '',
    //     status: ''
    //   });
    // }
  }

  return (
    <div className="main">
      <div className="board">
        {
          columns && 
          columns.map((element: Column, index: number) => {
            return (
              <Status key={`${element.status}-${index}`} name={element.status} changeStatus={changeStatus}>
                {         
                  tasks &&
                  Object.keys(tasks).map((key: string) => {

                    return tasks[key].map((task: Task, i: number) => {
                      if (element.status === key) {
                        return (
                          <Card
                            key={`task-${i}-${element.status}`}
                            id={task._id}
                            name={task.name}
                            description={task.description}
                            status={task.status}
                            statusArray={statusArray}
                            removeTask={removeTask}
                            changeStatus={changeStatus}
                        />
                        )
                      }
                    })
                  })
                }
              </Status>
            )
          })

        }
      </div>
      <form>
        <fieldset>
          <div className="input-wrapper">
            <input name="id" type="text" value={card.id} onChange={inputHandler}/>
          </div>
          <div className="input-wrapper">
            <input name="name" type="text" value={card.name} onChange={inputHandler}/>
          </div>
          <div className="input-wrapper">
            <input name="description" type="text" value={card.description} onChange={inputHandler}/>
          </div>
          <div className="input-wrapper">
            {
              columns &&
              <select name="status" value={card.status} onChange={inputHandler}>
                <option value="" hidden>Status</option>
                {
                  Object.keys(columns).map((key: string) => {
                    return (
                      <option value={key} key={key}>{key}</option>
                    )
                  })
                }
              </select>
            }
          </div>
          <div className="btn-wrapper">
            <div className="btn">
              <button onClick={saveTask}>
                ADD
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Board;