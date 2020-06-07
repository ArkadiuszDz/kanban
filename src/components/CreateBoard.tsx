import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface Column {
  status: string;
}

const CreateBoard: FunctionComponent = () => {
  
  const history = useHistory();
  // dodać pole order do obiektu status
  const _initArray: Array<Column> = [];

  const [statusName, setStatusName] = useState('');
  const [boardName, setBoardName] = useState('');
  const [statusArray, setStatusArray] = useState(_initArray);


  const inputHandler = (e: any) => {

    if (e.target.name === "status") {
      setStatusName(e.target.value);
    }

    if (e.target.name === "boardName") {
      setBoardName(e.target.value);
    }
  }

  const addButtonHandler = (e: any) => {
    e.preventDefault();

    setStatusArray(prevArray => [...prevArray, {status: statusName}]);
    setStatusName('');
  }

  const removeButtonHandler = (e: any, status: string) => {
    e.preventDefault();
    
    setStatusArray(prev => {
      return [...prev].filter(element => {
        return element.status !== status;
      })
    });
  }

  // change it to asynchronous action

  const saveButtonHandler = (e: any) => {
    e.preventDefault();

    axios.post(`http://localhost:3001/create-kanban/${boardName}`, 
      {
        columns: [...statusArray]
      }
    )
    .then(() => {
      history.push("/boards");
    })
    .catch(error => console.log(error));
    
  }

  return (
    <div>
      <form>
        <div className="inputs-wrapper">
          <div className="input-wrapper">
            <label htmlFor="boardName">
              Board name
            </label>
            <input type="text" name="boardName" value={boardName} onChange={e => inputHandler(e)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="status">
              Column name
            </label>
            <input type="text" name="status" value={statusName} onChange={e => inputHandler(e)}/>
          </div>
          <div className="btn-wrapper">
            <button onClick={e => addButtonHandler(e)}>
              Add
            </button>
          </div>
        </div>
      </form>
      <div>
        {
          statusArray &&
          statusArray.map((status: Column, index: number) => {
            return (
              <div className="input-wrapper status" key={`${status.status}-${index}`}>
                {status.status}
                <button onClick={e => removeButtonHandler(e, status.status)}>
                  Remove
                </button>
              </div>
            )
          })
        }
      </div>
      <div className="btn-wrapper">
        <button onClick={e => saveButtonHandler(e)}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateBoard;