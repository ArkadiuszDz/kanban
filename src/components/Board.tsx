import React, { FunctionComponent, useState, useEffect } from 'react';
import { BoardProps, BoardDispatch } from '../containers/Board';
import { RouteComponentProps } from 'react-router';
import { DeepReadonly } from 'ts-essentials';
import { Task, Column } from '../logic/Board/store';
import { Link } from 'react-router-dom';
import { CardContainer } from '../containers/Card';
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

  // eslint-disable-next-line
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
                          <Link  
                            key={`task-${i}-${element.status}`} 
                            to={{ 
                              pathname: `/boards/${match.params.board}/${task._id}`,
                              state: { modal: true }
                            }}
                          >
                            <CardContainer
                              boardName={match.params.board}
                              columns={columns}
                              task={task}
                            />
                          </Link>
                        )
                      } else {
                        return false;
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