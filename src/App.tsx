import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './logic/configure-store';
import DnDContainer from './components/DnDContainer';
import Main from './components/Main';
import CreateBoard from './components/CreateBoard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BoardsContainer } from './containers/Boards';
import Modal from './components/Modal';
import "./styles/global.scss";


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
          <Switch>
            <Route path="/" component={Main} exact={true} />
            <Route path="/create-board" component={CreateBoard} />
            <Route path="/boards/:board/:task_id" component={Modal} exact={true} />
            <Route path="/boards" component={BoardsContainer} exact={true}/>
            <Route path="/boards/:board" component={DnDContainer}/>
          </Switch>
          <Route path="/boards/:board/:task_id" component={Modal} exact={true} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
