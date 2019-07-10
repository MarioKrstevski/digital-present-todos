import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Modal from "./Modal";
import OutsideAlerter from "./OutsideAlerter";

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  const valueInput = useRef(null);
  const descriptionInput = useRef(null);

  const getTodos = () => {
    fetch(`https://digitestapi.herokuapp.com/todos`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: new Headers({
        Authorization: "Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers":
          "origin, content-type, accept, authorization"
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        setTodos(myJson);
      });
  };

  const editTodo = id => {
    if (valueInput.current !== null && !descriptionInput.current !== null) {
      console.log('Value input',valueInput.current)
      console.log('Desc input',descriptionInput.current)
    valueInput.current.focus();
    descriptionInput.current.focus();

      const data = new FormData();
      const payload = {
        value: valueInput.current.value,
        description: descriptionInput.current.value
      };
      data.append("json", JSON.stringify(payload));
      fetch(`https://digitestapi.herokuapp.com/todos/${id}`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: new Headers({
          Authorization:
            "Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, OPTIONS, HEAD",
          "Access-Control-Allow-Headers":
            "origin, content-type, accept, authorization"
        }),
        body: data
      });

      valueInput.current.value = "";
      descriptionInput.current.value = "";
      closeModal();
    }
  };

  const addTodo = () => {
    if (valueInput.current !== null && !descriptionInput.current !== null) {
    valueInput.current.focus();
    descriptionInput.current.focus();
      const data = new FormData();
      const payload = {
        value: valueInput.current.value,
        description: descriptionInput.current.value
      };
      data.append("json", JSON.stringify(payload));

      fetch(`https://digitestapi.herokuapp.com/todos`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: new Headers({
          Authorization:
            "Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, OPTIONS, HEAD",
          "Access-Control-Allow-Headers":
            "origin, content-type, accept, authorization"
        }),
        body: data
      });
      closeModal();
    }
  };

  const deleteTodo = id => {
    fetch(`https://digitestapi.herokuapp.com/todos/${id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: new Headers({
        Authorization: "Basic ZGlnaXRhbHByZXNlbnQ6bWFyaW9rcnN0ZXZza2khIzIwMTk=",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers":
          "origin, content-type, accept, authorization"
      }),
      body: null
    });

    closeModal();
  };

  const switchModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const setCurrentTodo = id => {
    var currentTodo = todos.find(todo => todo.id === id);
    console.log(currentTodo);
    setSelectedTodo(currentTodo);
  };

  const onClickHandler = id => {
    openModal();
    setCurrentTodo(id);
    console.log("Switched", id);
  };

  const ListItem = ({ value, desc, id }) => (
    <li onClick={() => onClickHandler(id)}>{value}</li>
  );
  const todoList = todos.map(({ id, value, description }) => (
    <ListItem key={id} id={id} value={value} desc={description} />
  ));

  return (
    <div className="App">
      <h2>Hello Digital Present</h2>
      <ul>{todoList}</ul>
      <Modal>
        <OutsideAlerter close={closeModal}>
          {isModalOpen ? (
            <div className="modal-container">
              {null ? null : (
                <div className="todo">
                  <OutsideAlerter close={closeEditMode}>
                    <div>
                      {!editMode ? (
                        <div onClick={() => setEditMode(true)}>
                          <p>{selectedTodo.value}</p>
                          <p>{selectedTodo.description}</p>
                        </div>
                      ) : (
                        <div>
                          <input
                            ref={valueInput}
                            type="text"
                            defaultValue={selectedTodo.value}
                            placeholder="Value:"
                          />
                          <input
                            ref={descriptionInput}
                            type="text"
                            defaultValue={selectedTodo.description}
                            placeholder="Description:"
                          />
                        </div>
                      )}
                    </div>
                  </OutsideAlerter>
                  <div className="buttons">
                    <button onClick={() => editTodo(selectedTodo.id)}>
                      Save
                    </button>
                    <button onClick={() => addTodo()}> Create </button>
                    <button onClick={() => deleteTodo(selectedTodo.id)}>
                      Delete
                    </button>
                    <button onClick={() => setEditMode(false)}>
                      Exit Edit Mode
                    </button>
                    <button onClick={() => closeModal()}>Close Modal</button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </OutsideAlerter>
      </Modal>
    </div>
  );
}

export default App;
