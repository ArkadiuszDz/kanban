
import React, { FunctionComponent, useEffect } from 'react';
import { BoardsProps, BoardsDispatch } from '../containers/Boards';
import { DeepReadonly } from 'ts-essentials';
import { Link } from 'react-router-dom';
import { BoardElement } from '../logic/Boards/store';


interface ComponentProps
  extends
    BoardsProps,
    BoardsDispatch,     
    DeepReadonly<{}> {}

const Boards: FunctionComponent<ComponentProps> = ({ getBoards, boards }) => {

  useEffect(() => getBoards(), []);

  return (
    <div>
      {
        boards &&
        boards.map((board: BoardElement, index: number) => {
          return (
            <div className="link-wrapper" key={`${board.name}-${index}`}>
              <Link to={`/boards/${board.name}`}>
                {board.name}
              </Link>
            </div>
          );
        })
      }
    </div>
  )
}

export default Boards;