import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import { Types } from '../constants/dnd';
import "../styles/status.scss";

interface StatusProps {
  name: string;
  children: React.ReactNode;
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => void
}

const Status: FunctionComponent<StatusProps> = ({ children, name, changeStatus }) => {

  const [{ isOver }, drop] = useDrop({
    accept: Types.CARD,
    drop: (item, monitor) => {
      if (monitor.getItem().status !== name) {
        changeStatus(monitor.getItem().status, name, monitor.getItem().id)
      }
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      } 
    }
  })

  return (
    <div id={name} className="task-status" ref={drop} style={{backgroundColor: isOver ? '#c8c8c8' : ''}}>
      <h2 className="title">{name.split('-').join(' ')}</h2>
      <div className="cards-container">
        {children}
      </div>
    </div>
  )
}

export default Status;