import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Modal from "./Modal";
import OutsideAlerter from "./OutsideAlerter";

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [todoCounter, setTodoCounter] = useState(todos.length);

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
    setTodos(response);
    setTodoCounter(response.length);

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
      fakeEditTodo(id);

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
    fakeAddTodo();
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

    fakeDeleteTodo(id);
    closeModal();
  };

  const fakeEditTodo = id => {
    if (valueInput.current !== null && !descriptionInput.current !== null) {
      valueInput.current.focus();
      descriptionInput.current.focus();

      let newTodo = {
        id,
        value: valueInput.current.value,
        description: descriptionInput.current.value
      };
      let newTodos = todos.filter(todo => todo.id !== id);

      function sortById(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      }
      let newer = [...newTodos, newTodo];
      newer.sort(sortById);
      setTodos(newer);
    }
  };
  const fakeAddTodo = id => {
    if (valueInput.current !== null && !descriptionInput.current !== null) {
      valueInput.current.focus();
      descriptionInput.current.focus();

      let newTodo = {
        id: todoCounter + 1,
        value: valueInput.current.value,
        description: descriptionInput.current.value
      };
      setTodoCounter(todoCounter + 1);
      setTodos([...todos, newTodo]);
    }
  };
  const fakeDeleteTodo = id => {
    let newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
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
                        <div>
                          <p onClick={() => setEditMode(true)}>
                            {selectedTodo.value}
                          </p>
                          <p onClick={() => setEditMode(true)}>
                            {selectedTodo.description}
                          </p>
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
                  </OutsideAlerter>
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
