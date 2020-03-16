import React, { FunctionComponent } from 'react';
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BoardContainer } from '../containers/Board';


const DnDContainer: FunctionComponent = () => {
  return (
    <DndProvider backend={Backend}>
      <BoardContainer />
    </DndProvider>
  )
}

export default DnDContainer;