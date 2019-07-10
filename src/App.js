import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
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
    

    // getTodos();
  }, []);

  const todoNewValue = "test";
  const todoNewDesc = "test";

  const valueInput = useRef(null);
  const descriptionInput = useRef(null);

  const getTodos = () => {
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
        })
      });
  };

  const editTodo = (id) => {

    const data = new FormData();
    const payload = {
      'value': todoNewValue,
      'description': todoNewDesc
  };
  data.append( "json", JSON.stringify( payload ) );
    fetch(`https://digitestapi.herokuapp.com/todos/${id}`, {
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
        body: data
      });
  };

  const addTodo = () => {

    valueInput.current.focus();
    descriptionInput.current.focus()

    console.log(valueInput.current.value)
    console.log(descriptionInput.current.value)

    const data = new FormData();
    const payload = {
      'value': todoNewValue,
      'description': todoNewDesc
  };
  data.append( "json", JSON.stringify( payload ) );

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
        body: data
      });
  }

  const deleteTodo = (id) => {
     

    fetch(`https://digitestapi.herokuapp.com/todos/${id}`, {
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
                <input ref={valueInput} type="text" placeholder="Value:"  />
                <input ref={descriptionInput} type="text" placeholder="Description:"  />
                <button onClick={()=> editTodo(selectedTodo.id) }> Save </button>
                <button onClick={()=> addTodo()}> Create </button>
                <button onClick={()=> deleteTodo(selectedTodo.id)}> Delete </button>
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
