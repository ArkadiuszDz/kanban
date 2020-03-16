import React from 'react';
import './App.css';
import  { Provider } from 'react-redux';
import { store } from './logic/configure-store';
import DnDContainer from './components/DnDContainer';
import { getTasksList } from './logic/Board/actions';

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

  store.dispatch(getTasksList(board));

  return (
    <Provider store={store}>
      <div className="App">
        <header>

        </header>
        <DnDContainer/>
      </div>
    </Provider>
  );
}

export default App;
