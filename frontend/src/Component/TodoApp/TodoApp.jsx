import React from "react";
import "./TodoApp.css";
import { useState, useEffect } from "react";
function TodoApp() {
  const [todo, setTodo] = useState("");
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "",
  });

  function handleAdd() {
    if (!todo.trim()) {
      return;
    }
    let data = { name: todo };
    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => setResponseMessage(res))
      .catch((err) => setResponseMessage(err));
  }

  useEffect(() => {
    if (responseMessage.type === "Success") {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [responseMessage.message]);

  // console.log(todo);

  return (
    <div>
      <div className="response">
        {responseMessage.message && (
          <p
            style={{
              color: responseMessage.type === "Success" ? "green" : "red",
            }}
          >
            {responseMessage.message}
          </p>
        )}
      </div>
      <div className="todo">
        <h1>Todo App</h1>
      </div>
      <div className="todoinput">
        <label>Todo:</label>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}
export default TodoApp;
