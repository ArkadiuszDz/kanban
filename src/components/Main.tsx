import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';


const Main: FunctionComponent = () => {

  return (
    <div>
      <h1>Witaj w aplikacji Kanban.</h1>
      <div className="link-wrapper">
        <Link to="/boards">
          Zobacz istniejące tablice.
        </Link>
      </div>
      <div className="link-wrapper">
        <Link to="create-board">
          Stwórz własną tablicę.
        </Link>
      </div>
    </div>
  );

}

export default Main;