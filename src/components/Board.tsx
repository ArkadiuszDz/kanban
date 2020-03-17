import React, { FunctionComponent, useState } from 'react';
import { BoardProps, BoardDispatch } from '../containers/Board';
import { DeepReadonly } from 'ts-essentials';
import { CardData } from '../logic/Board/store';
import Card from './Card';
import Status from './Status';
import '../styles/board.scss';

interface ComponentProps
  extends
    BoardProps,
    BoardDispatch,     
    DeepReadonly<{}> {}


const Board: FunctionComponent<ComponentProps> = ({addTask, removeTask, changeStatus, board}) => {

  const statusArray = Object.keys(board).map((element: string) => {
    return element;
  });

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
    if (card.status !== '') {
      addTask(card);
      setCard({
        id: '',
        name: '',
        description: '',
        status: ''
      });
    }
  }

  return (
    <div className="main">
      <div className="board">
        {
          board && 
          Object.keys(board).map((element: string, index: number) => {
            return (
              <Status key={`${element}-${index}`} name={element} changeStatus={changeStatus}>
                {
                  // @ts-ignore
                  board[element].map((card: CardData, index: number) => {
                    return (
                      <Card
                        key={`card-${index}-${element}`}
                        id={card.id}
                        name={card.name}
                        description={card.description}
                        status={element}
                        statusArray={statusArray}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                      />
                    )
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
              board &&
              <select name="status" value={card.status} onChange={inputHandler}>
                <option value="" hidden>Status</option>
                {
                  Object.keys(board).map((key: string) => {
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