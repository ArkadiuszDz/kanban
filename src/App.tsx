import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './logic/configure-store';
import DnDContainer from './components/DnDContainer';
import Main from './components/Main';
import CreateBoard from './components/CreateBoard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BoardsContainer } from './containers/Boards';
import "./styles/global.scss";


function App() {

  // store.dispatch(getTasksList(board));
  // @ts-ignore
  //store.dispatch(getData());
  // location={{key: 'ss', pathname: '/', hash: "", search: "", state: {}}}

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <header>

          </header>
          <Switch>
            <Route path="/" component={Main} exact={true} />
            <Route path="/create-board" component={CreateBoard} />    
            <Route path="/boards" component={BoardsContainer} exact={true}/>
            <Route path="/boards/:board" component={DnDContainer}/> 
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
