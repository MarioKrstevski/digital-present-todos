import React, { useEffect, useState } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      // const response = await fetch("https://digitestapi.herokuapp.com/todos", {
      //   method: "GET",
      //   mode: "cors",
      //   credentials: "include",
      //   headers:new Headers({
      //     'Authorization': 'Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=',
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': true,
      //     'Access-Control-Allow-Credentials':true,
      //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
      //     'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
      //   }),
      //   // body: JSON.stringify(data)
      // });
      const response = [
        {
          id: 0,
          value: "Get shit done",
          description: "Coding test do some shit"
        },
        {
          id: 1,
          value: "Do some shit",
          description: "Coding test do some shit"
        }
      ];
      console.log({ response });
      setTodos(response);
    };

    fetchTodos();
  }, []);

  const todoNewValue = "test";
  const todoNewDesc = "test";
  const editTodo = () => {
    fetch(`https://digitestapi.herokuapp.com/todos/${selectedTodo.id}`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers:new Headers({
          'Authorization': 'Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
        }),
        body: JSON.stringify({
          "value": todoNewValue,
          "description" : todoNewDesc
        })
      });
  };

  const addTodo = () => {
    fetch(`https://digitestapi.herokuapp.com/todos`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers:new Headers({
          'Authorization': 'Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
        }),
        body: JSON.stringify({
          "value": todoNewValue,
          "description" : todoNewDesc
        })
      });
  }

  const deleteTodo = () => {
    fetch(`https://digitestapi.herokuapp.com/todos/${selectedTodo.id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers:new Headers({
          'Authorization': 'Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
        }),
        body: null,
      });
  }

  const switchModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const setCurrentTodo = id => {
    var currentTodo = todos.find(todo => todo.id === id);
    console.log(currentTodo);
    setSelectedTodo(currentTodo);
  };

  const onClickHandler = id => {
    switchModal();
    setCurrentTodo(id);
    console.log("Switched", id);
  };

  const ListItem = ({ value, desc, id }) => (
    <li onClick={() => onClickHandler(id)}>
      {value} 
    </li>
  );
  const todoList = todos.map(({ id, value, description }) => (
    <ListItem key={id} id={id} value={value} desc={description} />
  ));

  return (
    <div className="App">
      <h2>Hello Digital Present</h2>
      <ul>{todoList}</ul>

      <Modal>
        {isModalOpen ? (
          <div className="modal-container">
            {null ? null : <div className="todo">
                <p>Value:  {selectedTodo.value} </p>
                <p>Description:  {selectedTodo.description} </p>
                <button> Save </button>
             </div>}
          </div>
        ) : (
           null
        )}
      </Modal>
    </div>
  );
}

export default App;
