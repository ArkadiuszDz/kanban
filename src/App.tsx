import React from 'react';
import './App.css';
import  { Provider } from 'react-redux';
import { store } from './logic/configure-store';
import DnDContainer from './components/DnDContainer';
import Main from './components/Main';
import CreateBoard from './components/CreateBoard';
import { getTasksList } from './logic/Board/actions';
import { BrowserRouter, Route } from 'react-router-dom';
import { BoardsContainer } from './containers/Boards';
import { BoardContainer } from './containers/Board';


const board = {
  "board": {
    "to-do": [
      {
        "id": "1",
        "name": "Learn C#",
        "status": "to-do",
        "description": "I need to learn C# to get a better job"
      },
      {
        "id": "2",
        "name": "Learn MongoDB",
        "status": "to-do",
        "description": "I need to learn MongoDB"
      }
    ],
    "in-progress": [
      {
        "id": "3",
        "name": "Learn Redux-Thunk",
        "status": "in-progress",
        "description": "I need to learn Redux-Thunk"
      }
      ],
    "done": [
      {
        "id": "4",
        "name": "Learn Redux",
        "status": "done",
        "description": "I need to learn Redux"
      }
    ]
  }
}



function App() {

  // store.dispatch(getTasksList(board));
  // @ts-ignore
  //store.dispatch(getData());

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <header>

          </header>
          <Route path="/" component={Main} exact={true} />
          <Route path="/create-board" component={CreateBoard} />
          <Route path="/board" component={DnDContainer} />
          <Route path="/boards" component={BoardsContainer} exact={true}/>
          <Route path="/boards/development" component={DnDContainer}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
