import React, { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import { Types } from '../constants/dnd';
import "../styles/status.scss";

interface StatusProps {
  name: string;
  children: React.ReactNode;
}

const Status: FunctionComponent<StatusProps> = ({ children, name }) => {

  const [collectedProps, drop] = useDrop({
    accept: Types.CARD
  })

  return (
    <div className="task-status" ref={drop}>
      <h2 className="title">{name}</h2>
      <div className="cards-container">
        {children}
      </div>
    </div>
  )
}

export default Status;