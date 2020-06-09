import React, { FunctionComponent, useState, useEffect } from 'react';
import { BoardProps, BoardDispatch } from '../containers/Board';
import { RouteComponentProps } from 'react-router';
import { DeepReadonly } from 'ts-essentials';
import { Task, Column } from '../logic/Board/store';
import Card from './Card';
import Status from './Status';
import '../styles/board.scss';


interface ComponentProps
  extends
    BoardProps,
    BoardDispatch,
    RouteComponentProps<{ board: string }>,     
    DeepReadonly<{}> {}


const Board: FunctionComponent<ComponentProps> = ({addTask, removeTask, changeStatus, columns, tasks, getColumnsList, match}) => {

  const statusArray: string[] = [];

  columns.forEach((element: Column) => {
    statusArray.push(element.status);
  })
 
  useEffect(() => getColumnsList(match.params.board), []);

  const [card, setCard] = useState({
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
    if (card.status !== '') {
      addTask(match.params.board, card);
      setCard({
        name: '',
        description: '',
        status: ''
      });
    }
  }

  return (
    <div className="main">
      <h1>{match.params.board}</h1>
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
                            // id={task._id}
                            // name={task.name}
                            // description={task.description}
                            // status={task.status}
                            statusArray={statusArray}
                            removeTask={removeTask}
                            changeStatus={changeStatus}
                            task={task}
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
            <label htmlFor="name">
              Name
            </label>
            <input name="name" type="text" value={card.name} onChange={e => inputHandler(e)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="description">
              Description
            </label>
            <input name="description" type="text" value={card.description} onChange={e => inputHandler(e)}/>
          </div>
          <div className="input-wrapper">
            {
              columns &&
              <select name="status" value={card.status} onChange={e => inputHandler(e)}>
                <option value="" hidden>Status</option>
                {
                  columns.map((element: Column, index: number) => {
                    console.log(element);
                    return (
                      <option value={element._id} key={`${element.status}--${index}`}>{element.status}</option>
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